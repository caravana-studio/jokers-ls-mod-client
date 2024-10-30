import { Box } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { useResponsiveValues } from "../theme/responsiveSettings";
import CachedImage from "./CachedImage";

interface BackgroundProps extends PropsWithChildren {
  type?: "game" | "store" | "home" | "white" | "rage" | "skulls" | "cave" | "beast";
  dark?: boolean;
  scrollOnMobile?: boolean;
  bgDecoration?: boolean;
}

const getBackgroundColor = (type: string) => {
  switch (type) {
    case "white":
      return "white";
    case "rage":
      return "black";
    default:
      return "transparent";
  }
};

const getBackgroundImage = (type: string) => {
  switch (type) {
    case "white":
      return "none";
    case "rage":
      return "none";
    default:
      return `url(/bg/${type}-bg.jpg)`;
  }
};

export const Background = ({
  children,
  type = "game",
  dark = false,
  bgDecoration: bgDecoration = false,
  scrollOnMobile = false,
}: BackgroundProps) => {
  const { isSmallScreen } = useResponsiveValues();
  return (
    <Box
      sx={{
        backgroundColor: getBackgroundColor(type),
        backgroundImage: getBackgroundImage(type),
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100svh",
        width: "100vw",
        position: isSmallScreen ? "fixed" : "unset",
        bottom: isSmallScreen ? 0 : "unset",
        boxShadow: dark ? "inset 0 0 0 1000px rgba(0,0,0,.4)" : "none",
        overflow: scrollOnMobile && isSmallScreen ? "scroll" : "unset",
        py: '90px'
      }}
    >
      {bgDecoration ? (
        <BackgroundDecoration>{children}</BackgroundDecoration>
      ) : (
        children
      )}
    </Box>
  );
};

const BackgroundDecoration = ({ children }: PropsWithChildren) => {
  const { isSmallScreen } = useResponsiveValues();
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      {!isSmallScreen && (
        <CachedImage
          src="/borders/top.png"
          height="8%"
          width="100%"
          maxHeight="70px"
          position="fixed"
          top={0}
        />
      )}
        {children}
      {!isSmallScreen && (
        <>
          <CachedImage
            src="/borders/bottom.png"
            height="8%"
            width="100%"
            maxHeight="70px"
            position="fixed"
            bottom={0}
          />
        </>
      )}
    </Box>
  );
};
