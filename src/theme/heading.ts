import { LS_GREEN, NEON_GREEN, NEON_PINK } from "./colors";

export const headingTheme = {
  baseStyle: {
    fontFamily: "Jersey",
    color: "lsGreen",
    lineHeight: 1,
  },
  variants: {
    neonGreen: {
      color: "lsGreen",
      textShadow: `0 0 8px ${LS_GREEN}`,
    },
    neonWhite: {
      color: 'white',
    },
    neonPink: {
      color: NEON_PINK,
      textShadow: `0 0 20px ${NEON_PINK}`,
    },
  },
  sizes: {
    xxl: { fontSize: { base: 40, sm: 50, md: 65, lg: 80 } },
    xl: {
      fontSize: { base: 20, sm: 25, md: 35, lg: 40 },
    },
    l: { fontSize: { base: 20, sm: 25, md: 28, lg: 30 } },
    m: { fontSize: { base: 18, sm: 22, md: 22, lg: 22 } },
    s: { fontSize: { base: 15, sm: 15, md: 15, lg: 16 } },
    xs: { fontSize: { base: 8, sm: 12, md: 14, lg: 16 }},
    letterSpacing: '0.15em', 
  },
  defaultProps: {
    size: "m",
  },
};
