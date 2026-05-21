const shadowVars = {
  light: "var(--typro-shadow-light)",
  dark: "var(--typro-shadow-dark)",
  accent: "var(--typro-accent)",
  accentSecondary: "var(--typro-accent-secondary)",
  glow: "var(--typro-glow)",
} as const;

const neumorphism = {
  raised: {
    sm: `3px 3px 6px ${shadowVars.dark}, -3px -3px 6px ${shadowVars.light}`,
    md: `6px 6px 12px ${shadowVars.dark}, -6px -6px 12px ${shadowVars.light}`,
    lg: `8px 8px 16px ${shadowVars.dark}, -8px -8px 16px ${shadowVars.light}`,
    xl: `12px 12px 24px ${shadowVars.dark}, -12px -12px 24px ${shadowVars.light}`,
  },
  pressed: {
    sm: `inset 2px 2px 4px ${shadowVars.dark}, inset -2px -2px 4px ${shadowVars.light}`,
    md: `inset 4px 4px 8px ${shadowVars.dark}, inset -4px -4px 8px ${shadowVars.light}`,
    lg: `inset 6px 6px 12px ${shadowVars.dark}, inset -6px -6px 12px ${shadowVars.light}`,
  },
  glow: {
    predictive: `0 0 6px ${shadowVars.accentSecondary}, 0 0 12px ${shadowVars.glow}`,
    cursor: `0 0 8px ${shadowVars.glow}`,
    progress: `0 0 12px ${shadowVars.glow}, 0 0 4px ${shadowVars.accent}`,
    ring: `0 0 0 3px ${shadowVars.accent}`,
    badge: `0 0 16px ${shadowVars.accent}80, 0 0 6px ${shadowVars.accent}40`,
  },
} as const;

const shadowDepth = {
  "+3": { label: "heaviest", shadow: neumorphism.raised.xl, component: "hero objects, result modals" },
  "+2": { label: "heavy", shadow: neumorphism.raised.lg, component: "modals, overlays" },
  "+1.5": { label: "medium-heavy", shadow: neumorphism.raised.md, component: "controls, floating panels" },
  "+1": { label: "medium", shadow: neumorphism.raised.md, component: "buttons, cards" },
  "+0.5": { label: "light-medium", shadow: neumorphism.raised.sm, component: "small elements, badges" },
  "0": { label: "surface", shadow: "none", component: "background" },
  "-0.5": { label: "slight inset", shadow: neumorphism.pressed.sm, component: "disabled, locked" },
  "-1": { label: "medium inset", shadow: neumorphism.pressed.md, component: "pressed buttons, wells" },
  "-1.5": { label: "deep inset", shadow: neumorphism.pressed.md, component: "content wells, input areas" },
} as const;

const elevation = {
  neutral: "0 0 0 0 transparent",
} as const;

export { neumorphism, shadowDepth, shadowVars, elevation };
