export const inputTheme = {
  baseStyle: {
    fontFamily: "VT323",
  },
  field: {
    color: "#555",
    fontSize: 30,
    borderRadius: 0,
    py: 7,
    px: 7,
  },
  variants: {
    "neon-white": {
      field: {
        fontFamily: "VT323",
        letterSpacing: ".15rem",
        borderRadius: 0,
        bg: "transparent",
        color: "white",
        padding: 0,
        _placeholder: {
          fontFamily: "VT323",
          color: "rgba(255, 255, 255, 0.8)",
          letterSpacing: ".15rem",
        },
      },
    },
  },
}