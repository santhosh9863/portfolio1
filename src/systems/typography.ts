const fontFamily = {
  sans: ["var(--font-inter)", "system-ui", "sans-serif"],
  mono: ["var(--font-geist-mono)", "monospace"],
} as const;

const fontWeight = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  black: 900,
} as const;

const tracking = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0em",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em",
  "0.2em": "0.2em",
} as const;

const textRole = {
  "display-hero": { size: "8rem", lineHeight: "0.85", weight: fontWeight.black, tracking: tracking.widest },
  "display-xl": { size: "4.5rem", lineHeight: "1.1", weight: fontWeight.black, tracking: tracking.widest },
  "display-lg": { size: "3.75rem", lineHeight: "1.1", weight: fontWeight.black, tracking: tracking.widest },
  display: { size: "3rem", lineHeight: "1.15", weight: fontWeight.black, tracking: tracking.widest },
  "heading-xl": { size: "2.25rem", lineHeight: "1.2", weight: fontWeight.black, tracking: tracking.widest },
  "heading-lg": { size: "1.875rem", lineHeight: "1.25", weight: fontWeight.bold, tracking: tracking.wider },
  heading: { size: "1.5rem", lineHeight: "1.3", weight: fontWeight.bold, tracking: tracking.wider },
  "body-lg": { size: "1.125rem", lineHeight: "1.6", weight: fontWeight.regular, tracking: tracking.normal },
  body: { size: "1rem", lineHeight: "1.6", weight: fontWeight.regular, tracking: tracking.normal },
  "body-sm": { size: "0.875rem", lineHeight: "1.5", weight: fontWeight.regular, tracking: tracking.normal },
  label: { size: "0.75rem", lineHeight: "1.2", weight: fontWeight.bold, tracking: tracking.wider, transform: "uppercase" },
  caption: { size: "0.75rem", lineHeight: "1.4", weight: fontWeight.regular, tracking: tracking.normal },
  mono: { size: "0.875rem", lineHeight: "1.5", weight: fontWeight.black, tracking: tracking.normal, family: "mono" },
  "mono-sm": { size: "0.75rem", lineHeight: "1.4", weight: fontWeight.black, tracking: tracking.normal, family: "mono" },
} as const;

export { fontFamily, fontWeight, tracking, textRole };
