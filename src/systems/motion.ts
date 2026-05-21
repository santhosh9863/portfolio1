const duration = {
  tactile: 40,
  default: 150,
  themeTransition: 200,
  stateTransition: 300,
  completion: 500,
  retrySpin: 600,
} as const;

const easing = {
  mechanical: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  standard: [0.4, 0, 0.2, 1] as [number, number, number, number],
  easeOut: "ease-out" as const,
  easeInOut: "ease-in-out" as const,
  ease: "ease" as const,
} as const;

const spring = {
  ui: { stiffness: 300, damping: 25 },
  character: { stiffness: 300, damping: 20 },
  progress: { stiffness: 100, damping: 20 },
  badge: { stiffness: 200, damping: 15 },
  keyPress: { stiffness: 400, damping: 20 },
} as const;

const transition = {
  tactile: { duration: duration.tactile, easing: easing.easeOut },
  default: { duration: duration.default, easing: easing.easeInOut },
  state: { duration: duration.stateTransition, easing: easing.easeInOut },
} as const;

const shakeKeyframes = {
  duration: 400,
  keyframes: [
    { offset: 0, x: 0 },
    { offset: 0.1, x: -8 },
    { offset: 0.3, x: 8 },
    { offset: 0.5, x: -8 },
    { offset: 0.7, x: 8 },
    { offset: 0.85, x: -4 },
    { offset: 0.95, x: 4 },
    { offset: 1, x: 0 },
  ],
} as const;

export { duration, easing, spring, transition, shakeKeyframes };
