import { Box, Flex, Heading, Text, useTheme } from "@chakra-ui/react";
import { isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";
import { useGameContext } from "../providers/GameProvider";
import { RollingNumber } from "./RollingNumber";

export const MultiPoints = () => {
  const { points, multi, levelScore } = useGameContext();
  const { t } = useTranslation(["game"]);
  return (
    <Flex flexDir="column" alignItems={"center"}>
      <Box
        gap={3}
        sx={{ display: "flex", alignItems: "center" }}
        className="game-tutorial-step-6"
      >
        <Box
          sx={{
            transform: `translateX(${levelScore ? 75 : 0}px)`,
            opacity: levelScore ? 0 : 1,
            transition: "all 0.3s ease",
          }}
        >
          <PointBox type="points">
            <Heading color="white" size={{ base: "s", md: "m" }}>
              <RollingNumber n={points} />
            </Heading>
          </PointBox>
        </Box>
        {!isMobile && !levelScore && <Text size="xl">x</Text>}
        <Box
          sx={{
            transform: `translateX(${levelScore ? -75 : 0}px)`,
            opacity: levelScore ? 0 : 1,
            transition: "all 0.3s ease",
          }}
        >
          <PointBox type="multi">
            <Heading color="white" size={{ base: "s", md: "m" }}>
              <RollingNumber n={multi} />
            </Heading>
          </PointBox>
        </Box>
      </Box>

      <Box
        sx={{ opacity: levelScore ? 1 : 0, transition: "opacity 0.3 ease" }}
        position="fixed"
        width={"180px"}
      >
        <PointBox type="points">
          <Heading color="white" size={{ base: "s", md: "m" }}>
            Hand score: <RollingNumber n={levelScore} />
          </Heading>
        </PointBox>
      </Box>
    </Flex>
  );
};

interface PointBoxProps {
  children: JSX.Element;
  type: "points" | "multi" | "level";
}

export const PointBox = ({ children, type }: PointBoxProps) => {
  const { colors } = useTheme();
  const colorMap = {
    points: "white",
    multi: colors.lsGreen,
    level: "#FFF",
  };

  const color = colorMap[type];
  return (
    <Box
      minWidth={{ base: 70, md: 120 }}
      p={{ base: 1, md: 2 }}
      sx={{
        border: `2px solid ${color}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textShadow: `0 0 5px ${color}`,
      }}
      backgroundColor="rgba(0,0,0,0.5)"
      boxShadow={`0px 0px 5px 2px ${color} `}
      borderRadius={{ base: 15, md: 20 }}
    >
      {children}
    </Box>
  );
};
