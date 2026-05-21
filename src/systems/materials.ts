const surfaceState = {
  matte: {
    background: "var(--typro-bg)",
    description: "single flat color, no gradient, no texture",
  },
  inset: {
    background: "var(--typro-bg-secondary)",
    description: "one step darker than bg, used for pressed wells",
  },
  raised: {
    background: "var(--typro-bg)",
    description: "same as bg, rendered raised solely through shadow geometry",
  },
} as const;

const metalGradient = {
  key: {
    direction: "bg-gradient-to-br",
    from: "var(--typro-key-from)",
    to: "var(--typro-key-to)",
    description: "top-left to bottom-right, matching light source",
  },
} as const;

const opacityLadder = {
  full: 1,
  overlay: 0.8,
  header: 0.7,
  secondary: 0.6,
  locked: 0.5,
  completed: 0.4,
  pending: 0.3,
  backdrop: 0.2,
  errorTint: 0.1,
  border: 0.05,
} as const;

const chamferHighlight = {
  top: "border-t",
  left: "border-l",
  color: "var(--typro-border)",
} as const;

export { surfaceState, metalGradient, opacityLadder, chamferHighlight };
