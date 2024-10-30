import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";
import { isMobile } from "react-device-detect";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  overlay: {
    bg: "blackAlpha.500",
  },
  dialog: {
    borderRadius: "0",
    color: "white",
    bg: `#031c24`,
    marginTop: isMobile ? "5vh" : "20vh",
    width: "70%",
    maxWidth: "1100px",
  },
});

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
});
