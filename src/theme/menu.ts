import { menuAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { BLUE} from "../theme/colors";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys)

const boxShadow = `0px 0px 8px 2px ${BLUE}`;
const boxShadowThick = `0px 0px 15px 7px ${BLUE}`;
const boxShadowMenuItem = `0px 0px 10px 2px ${BLUE}, inset 0px 0px 10px 2px ${BLUE}`;
const borderDisabled = `1px solid rgb(255,255,255)`;
const border = `3px solid ${BLUE}`;
const borderThin = `2px solid ${BLUE}`;

// define the base component styles
const baseStyle = definePartsStyle({
  // define the part you're going to style
  button: {
    // this will style the MenuButton component
    bg: "rgba(0,0,0,0.5)",
    color: "white",
    borderRadius: 'xl',
    border: borderDisabled,
    fontSize: [20, 20, 25],
    height: ["40px", "40px", "40px", "50px"],
    width: ["40px", "40px", "40px", "50px"],
    outline: "none",
    _hover: {
      bg: `${BLUE}`,
      border: border,
      boxShadow: boxShadowThick,
      outline: "none",
    },
    _focus: {
      bg: `${BLUE}`,
      border: border,
      boxShadow: boxShadowThick,
      outline: "none",
    },
    _active: {
      bg: `${BLUE}`,
      border: border,
      boxShadow: boxShadowThick,
    }
  },
  list: {
    borderRadius: '2xl',
    border: border,
    boxShadow: boxShadow,
    bg: 'black',
    p: 0,
  },
  item: {
    // this will style the MenuItem and MenuItemOption components
    color: "white",
    bg: "black",
    borderRadius: 'xl',
    border: '2px solid rgba(0,0,0,0)',
    _hover: {
      color: "white",
      border: borderThin,
      boxShadow: boxShadowMenuItem,
      outline: "none",
    },
    _focus: {
      color: "white",
      border: borderThin,
      boxShadow: boxShadowMenuItem,
      outline: "none",
    },
  },
})

export const menuTheme = defineMultiStyleConfig({ baseStyle })