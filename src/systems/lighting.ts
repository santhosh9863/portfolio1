const lightSource = {
  direction: "upper-left",
  azimuth: 315,
  altitude: 45,
  description: "single consistent light source for all surfaces",
} as const;

const shadowOffset = {
  positive: { x: 6, y: 6, label: "shadow-dark — offset right + down" },
  negative: { x: -6, y: -6, label: "shadow-light — offset left + up" },
} as const;

const edgeHighlight = {
  chamfer: "border-t border-l",
  rim: "border border-white/5",
} as const;

export { lightSource, shadowOffset, edgeHighlight };
