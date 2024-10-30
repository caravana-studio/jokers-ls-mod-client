import { isMobile } from "react-device-detect";

export const CARD_WIDTH = 115;
export const CARD_WIDTH_PX = `${CARD_WIDTH}px`;
export const CARD_HEIGHT = CARD_WIDTH * 1.52;
export const CARD_HEIGHT_PX = `${CARD_HEIGHT}px`;
export const MODIFIERS_OFFSET = isMobile? 17 : 27;
export const TILT_OPTIONS = {
  reverse: true, // reverse the tilt direction
  max: 30, // max tilt rotation (degrees)
  perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1.05, // 2 = 200%, 1.5 = 150%, etc..
  speed: 800, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
};