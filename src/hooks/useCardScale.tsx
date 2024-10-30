import { useBreakpoint } from "@chakra-ui/react";
import { isMobile } from "react-device-detect";

export const useCardScale = () => {
  const breakpoint = useBreakpoint();

  if (isMobile) {
    return 0.85;
  }

  if (breakpoint == "base") {
    return 0.75;
  } else if (breakpoint == "md") {
    return 0.81;
  }
  return 1;
};
