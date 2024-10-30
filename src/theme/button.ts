import { BLUE, LS_GREEN, NEON_GREEN, VIOLET } from "./colors";

import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const solid = defineStyle({
  backgroundColor: "transparent !important",
  color: "lsGreen",
  border: `4px solid ${LS_GREEN}`,
  borderRadius: 0,
  fontSize: "40px",
  px: "60px",
  py: "25px",
  boxShadow: {
    base: `0px 0px 10px 0px ${LS_GREEN}`,
    md: `0px 0px 15px 1px ${LS_GREEN}`,
  },
  _hover: {
    borderColor: "lsGreen",
    boxShadow: {
      base: `0px 0px 20px 2px ${LS_GREEN}`,
      md: `0px 0px 30px 2px ${LS_GREEN}`,
    },
  },
});

const secondarySolid = defineStyle({
  backgroundColor: "violet",
  boxShadow: {
    base: `0px 0px 10px 6px ${VIOLET}`,
    md: `0px 0px 20px 12px ${VIOLET}`,
  },
});

const discardSecondarySolid = defineStyle({
  backgroundColor: "violet",
  boxShadow: {
    base: `0px 0px 20px 3px ${VIOLET}`,
    md: `0px 0px 30px 6px ${VIOLET}`,
  },
  "&:hover": {
    borderColor: `white`,
  },
});

const outline = defineStyle({
  backgroundColor: "rgba(0,0,0,0.5)",
  border: `3px solid ${NEON_GREEN} !important`,
  color: "neonGreen",
  "&:hover": {
    backgroundColor: "black",
    border: `3px solid ${NEON_GREEN}`,
    boxShadow: `0px 0px 5px 0px ${NEON_GREEN}`,
  },
});

const defaultOutline = defineStyle({
  backgroundColor: "transparent",
  border: `1px solid rgb(255,255,255) !important`,
  color: "rgb(255,255,255)",
});

const outlinePrimaryGlow = defineStyle({
  backgroundColor: "transparent",
  border: "1px solid white",
  color: "white",
  boxShadow: `0px 0px 12px 0px white`,
  _hover: {
    backgroundColor: `${BLUE}`,
    color: "white",
    borderColor: "transparent",
    boxShadow: {
      base: `0px 0px 10px 6px ${BLUE}`,
      md: `0px 0px 20px 12px ${BLUE}`,
    },
  },
  _active: {
    backgroundColor: `${BLUE}`,
    border: "1px solid white",
    color: "white",
    boxShadow: {
      base: `0px 0px 10px 6px ${BLUE}`,
      md: `0px 0px 20px 12px ${BLUE}`,
    },
  },
  _disabled: {
    border: "1px solid white !important",
    boxShadow: "none !important",
  },
});

const outlineSecondaryGlow = defineStyle({
  backgroundColor: "transparent",
  border: "1px solid white",
  color: "white",
  boxShadow: `0px 0px 12px 0px white`,
  _hover: {
    backgroundColor: `${VIOLET}`,
    color: "white",
    borderColor: "transparent",
    boxShadow: {
      base: `0px 0px 10px 6px ${VIOLET}`,
      md: `0px 0px 20px 12px ${VIOLET}`,
    },
  },
  _active: {
    backgroundColor: `${VIOLET}`,
    border: "1px solid white",
    color: "white",
    boxShadow: {
      base: `0px 0px 10px 6px ${VIOLET}`,
      md: `0px 0px 20px 12px ${VIOLET}`,
    },
    _disabled: {
      border: "1px solid white !important",
      boxShadow: "none !important",
    },
  },
});

export const buttonTheme = defineStyleConfig({
  baseStyle: {
    fontFamily: "Jersey",
    borderRadius: 15,
    px: 7,
    py: 0,
    backgroundColor: "blue",
    color: "white",
    textTransform: "uppercase",
  },
  variants: {
    solid,
    outline,
    secondarySolid,
    defaultOutline,
    discardSecondarySolid,
    outlineSecondaryGlow,
    outlinePrimaryGlow,
  },
  sizes: {
    sm: {
      fontSize: { base: 8, md: 11 },
      px: { base: 3, md: 7 },
      borderRadius: 7,
    },
    md: {
      fontSize: { base: 12, md: 19 },
      px: { base: 3, md: 7 },
      py: { base: 0, md: "10px !important" },
      fontWeight: 500,
    },
    lg: {
      fontSize: "50px !important",
      px: 90,
      py: 2,
      borderRadius: 0,
      textShadow: `0 0 20px ${NEON_GREEN}`,
      boxShadow: `0px 0px 15px 0px ${NEON_GREEN} `,
    },
  },
});
