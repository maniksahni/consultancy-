export const EASE_LUXURY = [0.22, 1, 0.36, 1] as const;

export const MOTION_DURATIONS = {
  fast: 0.28,      // 0.25-0.35s UI interactions
  medium: 0.65,    // 0.55-0.75s cards/images
  slow: 0.95,      // 0.85-1.1s major reveals
  ambient: 10,     // 8-14s subtle atmospheric drift
} as const;

export const GLOW_PRESETS = {
  micro: "rgba(194, 91, 26, 0.20)",
  section: "rgba(194, 91, 26, 0.25)",
  focus: "rgba(194, 91, 26, 0.38)",
} as const;

/**
 * Standard masked line reveal variant for headlines.
 * Parent container must have `overflow-hidden`.
 */
export const maskedLineVariants = {
  hidden: {
    y: "110%",
    opacity: 0,
  },
  visible: (customDelay: number = 0) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: MOTION_DURATIONS.slow,
      delay: customDelay,
      ease: EASE_LUXURY,
    },
  }),
};

/**
 * Editorial fade & tracking settle for eyebrow labels.
 */
export const eyebrowVariants = {
  hidden: {
    opacity: 0,
    letterSpacing: "0.32em",
    y: 8,
  },
  visible: {
    opacity: 1,
    letterSpacing: "0.25em",
    y: 0,
    transition: {
      duration: MOTION_DURATIONS.medium,
      ease: EASE_LUXURY,
    },
  },
};

/**
 * Vertical mask reveal for architectural imagery.
 */
export const verticalMaskVariants = {
  hidden: {
    clipPath: "inset(100% 0 0 0)",
    scale: 1.03,
  },
  visible: (customDelay: number = 0) => ({
    clipPath: "inset(0% 0 0 0)",
    scale: 1,
    transition: {
      duration: 1.0,
      delay: customDelay,
      ease: EASE_LUXURY,
    },
  }),
};

/**
 * Terracotta accent bloom & settle glow animation.
 */
export const terracottaBloomVariants = {
  hidden: {
    opacity: 0,
    y: "110%",
    textShadow: "0 0 0px rgba(194,91,26,0)",
  },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    y: "0%",
    textShadow: [
      "0 0 0px rgba(194,91,26,0)",
      "0 0 35px rgba(194,91,26,0.55)",
      "0 0 16px rgba(194,91,26,0.22)",
    ],
    transition: {
      y: { duration: 1.0, delay: customDelay, ease: EASE_LUXURY },
      opacity: { duration: 0.9, delay: customDelay, ease: EASE_LUXURY },
      textShadow: { duration: 1.6, delay: customDelay + 0.15, times: [0, 0.45, 1], ease: "easeOut" },
    },
  }),
};
