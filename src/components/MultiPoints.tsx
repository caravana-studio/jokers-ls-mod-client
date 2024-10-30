import { Box, Heading, useTheme } from "@chakra-ui/react";
import { isMobile } from "react-device-detect";
import { useGameContext } from "../providers/GameProvider";
import { RollingNumber } from "./RollingNumber";
import { useTranslation } from "react-i18next";

export const MultiPoints = () => {
  const { points, multi } = useGameContext();
  const { t } = useTranslation(["game"]);
  
  return (
    <Box
      gap={{ base: 1, md: 1.5 }}
      sx={{ display: "flex", alignItems: "center" }}
      className="game-tutorial-step-6"
    >
      <PointBox type="points">
        <Heading size={{ base: "xs", md: "s" }}>{t('game.multi-points.points')}</Heading>
        <Heading size={{ base: "s", md: "m" }}>
          <RollingNumber n={points} />
        </Heading>
      </PointBox>
      {!isMobile && <Heading size="s">x</Heading>}
      <PointBox type="multi">
        <Heading size={{ base: "xs", md: "s" }}>{t('game.multi-points.multi')}</Heading>
        <Heading size={{ base: "s", md: "m" }}>
          <RollingNumber n={multi} />
        </Heading>
      </PointBox>
    </Box>
  );
};

interface PointBoxProps {
  children: JSX.Element[];
  type: "points" | "multi" | "level";
}

export const PointBox = ({ children, type }: PointBoxProps) => {
  const { colors } = useTheme();
  const colorMap = {
    points: colors.neonGreen,
    multi: colors.neonPink,
    level: "#FFF",
  };

  const color = colorMap[type];
  return (
    <Box
      height={{ base: 43, sm: 53, md: 81 }}
      minWidth={{ base: 70, md: 120 }}
      p={{ base: 1, md: 2 }}
      sx={{
        border: `2px solid ${color}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textShadow: `0 0 5px ${color}`,
      }}

      boxShadow={{base: `0px 0px 10px 4px ${color} `, sm: `0px 0px 17px 7px ${color}`}}
      borderRadius={{ base: 15, md: 20 }}
    >
      {children}
    </Box>
  );
};
