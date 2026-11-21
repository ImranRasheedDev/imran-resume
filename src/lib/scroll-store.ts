/**
 * Shared, mutable scroll state. Written by <ScrollEngine/> every frame and read
 * inside the R3F render loop, so the 3D scene follows the page without React re-renders.
 */
export const heroScroll = {
  /** 0 at the top of the hero, 1 once its scroll length is used up. Smoothed. */
  p: 0,
  /** true when the visitor prefers reduced motion: the scene stays put. */
  reduced: false,
  /** Bottom of the hero copy as a fraction of the viewport (portrait layouts put the devices below it). */
  copyBottom: 0.62,
};
