"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { heroScroll } from "@/lib/scroll-store";

export type Screen = { name: string; desktop: string; mobile: string };

type Props = {
  screens: Screen[];
  onIndexChange?: (i: number) => void;
};

const PERIOD = 4.2; // seconds each project stays on screen
const FADE = 0.7; // seconds of crossfade

/* ---------- geometry helpers ---------- */

function roundedRectShape(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

/** Rounded slab in the XY plane, thickness along Z, centred on the origin. */
function roundedBox(w: number, h: number, d: number, r: number, seg = 5) {
  const bevel = Math.min(r * 0.45, d * 0.45);
  const g = new THREE.ExtrudeGeometry(
    roundedRectShape(w - bevel * 2, h - bevel * 2, Math.max(r - bevel, 0.001)),
    {
      depth: Math.max(d - bevel * 2, 0.001),
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: seg,
      curveSegments: seg * 2,
    }
  );
  g.center();
  g.computeVertexNormals();
  return g;
}

/** Flat rounded plane with 0..1 UVs, so a texture maps across it cleanly. */
function roundedPlane(w: number, h: number, r: number) {
  const g = new THREE.ShapeGeometry(roundedRectShape(w, h, r), 12);
  const uv = g.attributes.uv as THREE.BufferAttribute;
  const pos = g.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < uv.count; i++) {
    uv.setXY(i, pos.getX(i) / w + 0.5, pos.getY(i) / h + 0.5);
  }
  uv.needsUpdate = true;
  return g;
}

function shadowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, "rgba(0,0,0,0.75)");
  g.addColorStop(0.45, "rgba(0,0,0,0.35)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(c);
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp01 = (t: number) => Math.min(Math.max(t, 0), 1);

/* ---------- scene pieces ---------- */

function Environment() {
  const get = useThree((s) => s.get);
  useEffect(() => {
    const { gl, scene } = get();
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    scene.environmentIntensity = 0.85;
    return () => {
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
    };
  }, [get]);
  return null;
}

const smoothstep = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

/**
 * Resting camera. Wide screens: devices sit in the right half, beside the copy.
 * Tall screens: devices sit in the space left under the copy.
 */
function restingPose(wide: boolean, aspect: number, halfTan: number, pos: THREE.Vector3, target: THREE.Vector3) {
  const W = 4.6; // world width of laptop + phone
  const H = 2.9;
  const cx = 0.3;
  const cy = 0.85;
  let d: number;
  if (wide) {
    d = Math.max(W / (aspect * 0.52 * 2 * halfTan), H / (0.72 * 2 * halfTan));
    target.set(cx - d * halfTan * aspect * 0.46, cy, 0);
  } else {
    const top = Math.min(0.8, heroScroll.copyBottom + 0.02);
    const room = Math.max(0.2, 0.97 - top);
    d = Math.max(W / (aspect * 0.94 * 2 * halfTan), H / (room * 0.92 * 2 * halfTan));
    const visH = 2 * d * halfTan;
    const fromTop = (top + 0.97) / 2;
    target.set(cx, cy + (fromTop - 0.5) * visH, 0);
  }
  pos.set(target.x, target.y + 0.45 + d * 0.08, d);
}

/** Two stacked screen planes that crossfade between textures. */
function cycleScreens(
  textures: THREE.Texture[] | null,
  a: React.RefObject<THREE.MeshBasicMaterial | null>,
  b: React.RefObject<THREE.MeshBasicMaterial | null>,
  t: number
) {
  if (!textures || !a.current || !b.current) return 0;
  const n = textures.length;
  const k = Math.floor(t / PERIOD);
  const local = t - k * PERIOD;
  const cur = k % n;
  const next = (k + 1) % n;
  for (const [m, tx] of [
    [a.current, textures[cur]],
    [b.current, textures[next]],
  ] as const) {
    if (m.map !== tx) {
      // the shader only gains a texture slot when recompiled
      if (!m.map) m.needsUpdate = true;
      m.map = tx;
    }
  }
  b.current.opacity = clamp01((local - (PERIOD - FADE)) / FADE);
  return cur;
}

function Devices({ screens, onIndexChange }: Props) {
  const root = useRef<THREE.Group>(null);
  const lid = useRef<THREE.Group>(null);
  const phone = useRef<THREE.Group>(null);
  const lapA = useRef<THREE.MeshBasicMaterial>(null);
  const lapB = useRef<THREE.MeshBasicMaterial>(null);
  const phA = useRef<THREE.MeshBasicMaterial>(null);
  const phB = useRef<THREE.MeshBasicMaterial>(null);
  const ink = useRef<THREE.MeshBasicMaterial>(null);
  const screenMesh = useRef<THREE.Mesh>(null);
  const screenClock = useRef(0);
  const tmp = useMemo(
    () => ({
      pos0: new THREE.Vector3(),
      tgt0: new THREE.Vector3(),
      pos1: new THREE.Vector3(),
      tgt1: new THREE.Vector3(),
      normal: new THREE.Vector3(),
      q: new THREE.Quaternion(),
      look: new THREE.Vector3(),
    }),
    []
  );
  const pointer = useRef({ x: 0, y: 0 });
  const lastIndex = useRef(-1);
  const start = useRef<number | null>(null);
  const [tex, setTex] = useState<{ d: THREE.Texture[]; m: THREE.Texture[] } | null>(null);
  const gl = useThree((s) => s.gl);

  const reduced = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  // load screenshots
  useEffect(() => {
    let alive = true;
    const loader = new THREE.TextureLoader();
    const prep = (t: THREE.Texture) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy());
      return t;
    };
    Promise.all([
      Promise.all(screens.map((s) => loader.loadAsync(s.desktop).then(prep))),
      Promise.all(screens.map((s) => loader.loadAsync(s.mobile).then(prep))),
    ])
      .then(([d, m]) => alive && setTex({ d, m }))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [screens, gl]);

  useEffect(
    () => () => {
      tex?.d.forEach((t) => t.dispose());
      tex?.m.forEach((t) => t.dispose());
    },
    [tex]
  );

  // track the pointer over the whole window, not just the canvas
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const geo = useMemo(() => {
    const key = roundedBox(0.15, 0.15, 0.035, 0.03, 2);
    key.rotateX(-Math.PI / 2);
    return {
      base: (() => {
        const g = roundedBox(3.3, 2.25, 0.1, 0.12);
        g.rotateX(-Math.PI / 2);
        return g;
      })(),
      lid: roundedBox(3.3, 2.15, 0.06, 0.12),
      bezel: roundedPlane(3.2, 2.05, 0.08),
      screen: roundedPlane(3.02, 1.89, 0.02),
      deck: roundedPlane(2.72, 1.12, 0.05),
      pad: roundedPlane(1.15, 0.62, 0.06),
      key,
      phone: roundedBox(0.84, 1.74, 0.08, 0.15),
      phoneGlass: roundedPlane(0.8, 1.7, 0.13),
      phoneScreen: roundedPlane(0.74, 1.6, 0.1),
      notch: roundedPlane(0.22, 0.06, 0.03),
      shadow: new THREE.PlaneGeometry(1, 1),
    };
  }, []);

  const mat = useMemo(
    () => ({
      alu: new THREE.MeshStandardMaterial({ color: "#3a3d44", metalness: 0.92, roughness: 0.32 }),
      aluDark: new THREE.MeshStandardMaterial({ color: "#1d1f24", metalness: 0.6, roughness: 0.55 }),
      key: new THREE.MeshStandardMaterial({ color: "#0d0e11", metalness: 0.2, roughness: 0.7 }),
      pad: new THREE.MeshStandardMaterial({ color: "#2c2f35", metalness: 0.7, roughness: 0.25 }),
      glass: new THREE.MeshStandardMaterial({ color: "#020203", metalness: 0.4, roughness: 0.08 }),
      phone: new THREE.MeshStandardMaterial({ color: "#2b2420", metalness: 0.95, roughness: 0.22 }),
      shadow: new THREE.MeshBasicMaterial({
        map: shadowTexture(),
        transparent: true,
        depthWrite: false,
        opacity: 0.9,
      }),
    }),
    []
  );

  useEffect(
    () => () => {
      Object.values(geo).forEach((g) => g.dispose());
      Object.values(mat).forEach((m) => {
        (m as THREE.MeshBasicMaterial).map?.dispose();
        m.dispose();
      });
    },
    [geo, mat]
  );

  const keys = useMemo(() => {
    const out: [number, number][] = [];
    const cols = 13;
    const rows = 5;
    const step = 0.19;
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        out.push([(c - (cols - 1) / 2) * step, -0.88 + r * step]);
    return out;
  }, []);

  const keyMesh = useRef<THREE.InstancedMesh>(null);
  useEffect(() => {
    const m = keyMesh.current;
    if (!m) return;
    const o = new THREE.Object3D();
    keys.forEach(([x, z], i) => {
      o.position.set(x, 0.118, z);
      o.updateMatrix();
      m.setMatrixAt(i, o.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
  }, [keys]);

  useFrame((state, dt) => {
    if (start.current === null) start.current = state.clock.elapsedTime;
    const t = state.clock.elapsedTime - start.current;
    const still = reduced || heroScroll.reduced;
    // scroll: 0 = resting, 1 = camera inside the laptop screen
    const z = still ? 0 : smoothstep(0.02, 0.6, heroScroll.p);

    // intro: lid opens
    const open = still ? 1 : easeOutCubic(clamp01((t - 0.25) / 1.6));
    if (lid.current) lid.current.rotation.x = THREE.MathUtils.lerp(Math.PI / 2 - 0.02, -0.24, open);

    if (root.current) {
      const p = pointer.current;
      const free = 1 - z;
      // while diving in, the laptop turns square to the camera and stops reacting to the pointer
      const targetY = (-0.42 + p.x * 0.28) * free;
      const targetX = (0.06 + p.y * 0.06) * free;
      const k = 1 - Math.exp(-dt * 3);
      root.current.rotation.y += (targetY - root.current.rotation.y) * k;
      root.current.rotation.x += (targetX - root.current.rotation.x) * k;
      root.current.position.y = still ? 0 : Math.sin(t * 0.8) * 0.045 * free;
    }
    if (phone.current) {
      const float = still ? 0 : 1;
      // the phone glides out of the way as the camera moves in
      phone.current.position.x = 2.05 + z * z * 2.6;
      phone.current.position.z = 0.75 + z * 0.8;
      phone.current.position.y = 0.95 + Math.sin(t * 1.1 + 1.2) * 0.07 * float;
      phone.current.rotation.y = -0.3 - z * 0.5;
      phone.current.rotation.z = 0.06 + Math.sin(t * 0.7) * 0.025 * float;
    }

    // camera: blend the resting pose with a pose square-on to the screen that overfills the view
    const cam = state.camera as THREE.PerspectiveCamera;
    const aspect = state.size.width / Math.max(1, state.size.height);
    const halfTan = Math.tan(THREE.MathUtils.degToRad(cam.fov / 2));
    restingPose(state.size.width >= 1024 && aspect >= 1, aspect, halfTan, tmp.pos0, tmp.tgt0);
    if (z > 0 && screenMesh.current && lid.current) {
      screenMesh.current.getWorldPosition(tmp.tgt1);
      lid.current.getWorldQuaternion(tmp.q);
      tmp.normal.set(0, 0, 1).applyQuaternion(tmp.q);
      // "cover" fit: the screen overfills the viewport in both directions, on wide and tall screens alike
      const d1 = Math.min(1.89 / (2 * halfTan), 3.02 / (2 * halfTan * aspect)) * 0.86;
      tmp.pos1.copy(tmp.tgt1).addScaledVector(tmp.normal, d1);
      cam.position.lerpVectors(tmp.pos0, tmp.pos1, z);
      tmp.look.lerpVectors(tmp.tgt0, tmp.tgt1, z);
    } else {
      cam.position.copy(tmp.pos0);
      tmp.look.copy(tmp.tgt0);
    }
    cam.lookAt(tmp.look);

    // once the screen fills the view it fades to the page colour, so the next section can rise out of it
    if (ink.current) ink.current.opacity = smoothstep(0.72, 1, z);

    // screens keep cycling only while the hero is at rest
    if (heroScroll.p < 0.02 && t > 1.2) screenClock.current += dt;
    const screenT = screenClock.current;
    const i = cycleScreens(tex?.d ?? null, lapA, lapB, screenT);
    cycleScreens(tex?.m ?? null, phA, phB, screenT);
    if (tex && i !== lastIndex.current) {
      lastIndex.current = i;
      onIndexChange?.(i);
    }
  });

  return (
    <group ref={root} rotation={[0.06, -0.42, 0]}>
      {/* soft contact shadow */}
      <mesh geometry={geo.shadow} material={mat.shadow} rotation-x={-Math.PI / 2} position={[0.25, -0.005, 0.1]} scale={[5.6, 3.4, 1]} />

      {/* base */}
      <mesh geometry={geo.base} material={mat.alu} position={[0, 0.05, 0]} />
      <mesh geometry={geo.deck} material={mat.aluDark} rotation-x={-Math.PI / 2} position={[0, 0.1005, -0.5]} />
      <instancedMesh ref={keyMesh} args={[geo.key, mat.key, keys.length]} />
      <mesh geometry={geo.pad} material={mat.pad} rotation-x={-Math.PI / 2} position={[0, 0.101, 0.55]} />

      {/* lid, hinged at the back edge */}
      <group ref={lid} position={[0, 0.1, -1.1]} rotation-x={Math.PI / 2 - 0.02}>
        <mesh geometry={geo.lid} material={mat.alu} position={[0, 1.075, -0.03]} />
        <mesh geometry={geo.bezel} material={mat.glass} position={[0, 1.075, 0.0005]} />
        <mesh ref={screenMesh} geometry={geo.screen} position={[0, 1.1, 0.002]}>
          <meshBasicMaterial ref={lapA} color={tex ? "#ffffff" : "#0b0c10"} toneMapped={false} />
        </mesh>
        <mesh geometry={geo.screen} position={[0, 1.1, 0.003]}>
          <meshBasicMaterial ref={lapB} transparent opacity={0} toneMapped={false} />
        </mesh>
        <mesh geometry={geo.bezel} position={[0, 1.075, 0.004]}>
          <meshBasicMaterial ref={ink} color="#08090b" transparent opacity={0} toneMapped={false} depthWrite={false} />
        </mesh>
      </group>

      {/* phone */}
      <group ref={phone} position={[2.05, 0.95, 0.75]} rotation={[0, -0.3, 0.06]}>
        <mesh geometry={geo.phone} material={mat.phone} />
        <mesh geometry={geo.phoneGlass} material={mat.glass} position={[0, 0, 0.0405]} />
        <mesh geometry={geo.phoneScreen} position={[0, 0, 0.0412]}>
          <meshBasicMaterial ref={phA} color={tex ? "#ffffff" : "#0b0c10"} toneMapped={false} />
        </mesh>
        <mesh geometry={geo.phoneScreen} position={[0, 0, 0.0418]}>
          <meshBasicMaterial ref={phB} transparent opacity={0} toneMapped={false} />
        </mesh>
        <mesh geometry={geo.notch} position={[0, 0.74, 0.0425]}>
          <meshBasicMaterial color="#000000" />
        </mesh>
      </group>
    </group>
  );
}

export default function DeviceScene({ screens, onIndexChange }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // stop rendering when the hero is scrolled out of view
  useEffect(() => {
    const el = wrap.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      rootMargin: "120px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="pointer-events-none absolute inset-0">
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, 1.75]}
        camera={{ fov: 32, near: 0.1, far: 50, position: [0, 1.6, 7] }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        aria-hidden
      >
        <Environment />
        <ambientLight intensity={0.25} />
        <directionalLight position={[4, 6, 5]} intensity={1.6} />
        <directionalLight position={[-5, 3, -4]} intensity={0.9} color="#ff8a5c" />
        <pointLight position={[0, 1.4, 1.6]} intensity={2.2} distance={5} color="#9fb4ff" />
        <Devices screens={screens} onIndexChange={onIndexChange} />
      </Canvas>
    </div>
  );
}
