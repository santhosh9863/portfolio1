const zIndex = {
  base: 0,
  content: 10,
  navigation: 40,
  overlay: 40,
  dialog: 50,
  sidebar: 50,
} as const;

const depthLayer = {
  overlay: { z: zIndex.dialog, shadow: "xl", label: "layer +3: modals, sidebars" },
  floating: { z: zIndex.navigation, shadow: "lg", label: "layer +2: controls, floating panels" },
  raised: { z: zIndex.base, shadow: "md", label: "layer +1: buttons, cards, raised elements" },
  surface: { z: zIndex.base, shadow: "none", label: "layer 0: background surface" },
  inset: { z: zIndex.base, shadow: "pressed", label: "layer -1: pressed surfaces, wells" },
  recessed: { z: zIndex.base, shadow: "pressed-sm", label: "layer -2: locked, disabled, recessed" },
} as const;

const maxWidth = {
  content: "1024px",
} as const;

export { zIndex, depthLayer, maxWidth };
