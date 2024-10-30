import { tableAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { VIOLET_LIGHT } from "./colors.tsx";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tableAnatomy.keys);

const leaderboard = definePartsStyle({
  td: {
    color: "white",
    fontFamily: "Orbitron",
    textAlign: "center",
    fontSize: ["9px", "sm", "sm", "md"],
  },
  thead: {
    tr: {
      borderBottomWidth: 0,
    },
    td: {
      color: "white",
      borderBottomWidth: 0,
      px: [1, 2, 2, 4],
      py: [0,2,2,2]
    },
  },
  tbody: {
    tr: {
      "&:nth-of-type(odd)": {
        "th, td": {
          borderBottomWidth: 0,
        },
        td: {
          color: VIOLET_LIGHT,
          fontSize: ["10px", "sm", "sm", "md"],
          px: [1, 1, 4],
          py: [1, 2, 2, 2],
        },
      },
      "&:nth-of-type(even)": {
        "th, td": {
          borderBottomWidth: 0,
        },
        td: {
          color: VIOLET_LIGHT,
          fontSize: ["10px","sm", "sm", "md"],
          px: [1, 1, 4],
          py: [1, 2, 2, 2],
        },
      },
    },
  },
});

const store = definePartsStyle({
  td: {
    color: "white",
    fontFamily: "Orbitron",
    textAlign: "center",
    fontSize: [8, 10, 12, 14],
  },
  thead: {
    tr: {
      borderBottomWidth: 0,
    },
    td: {
      borderBottomWidth: 0,
      px: [2, 2, 4],
      py: 2,
    },
  },
  tbody: {
    tr: {
      fontSize: ["sm", "sm", "sm", "lg"],
      fontWeight: "bold",
      px: [1, 1, 4],
      borderBottomWidth: 0,
    },
    td: {
      py: [0],
    },
  },
});

const storeMobile = definePartsStyle({
  td: {
    color: "white",
    fontFamily: "Orbitron",
    textAlign: "center",
    fontSize: 11,
  },
  thead: {
    tr: {
      py: 0,
      borderBottomWidth: 0,
    },
    td: {
      borderBottomWidth: 0,
      py: 0,
      px: 1,
    },
  },
  tbody: {
    tr: {
      fontSize: "sm",
      fontWeight: "bold",
      p: 0,
      borderBottomWidth: 0,
    },
    td: {
      p: 0,
    },
  },
});

const baseStyle = definePartsStyle({
  table: {
    fontFamily: "Orbitron",
  },
});

export const tableTheme = defineMultiStyleConfig({
  baseStyle: baseStyle,
  variants: {
    leaderboard: leaderboard,
    store: store,
    "store-mobile": storeMobile,
  },
});
