import { Box, Flex, Text } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import { useParams } from "react-router-dom";
import CachedImage from "../../components/CachedImage.tsx";
import { ProgressBar } from "../../components/CompactRoundData/ProgressBar.tsx";
import { MultiPoints } from "../../components/MultiPoints.tsx";
import { PRESELECTED_CARD_SECTION_ID } from "../../constants/general.ts";
import { useGameContext } from "../../providers/GameProvider.tsx";
import { BEAST_RED } from "../../theme/colors.tsx";
import { useResponsiveValues } from "../../theme/responsiveSettings.tsx";
import { DiscardButton } from "./DiscardButton.tsx";
import { Obstacle } from "./Obstacle.tsx";
import { PlayButton } from "./PlayButton.tsx";

interface MidSectionProps {
  isTutorialRunning?: boolean;
}

export const MidSection = ({ isTutorialRunning = false }: MidSectionProps) => {
  const {
    preSelectedCards,
    hand,
    getModifiers,
    togglePreselected,
    discardAnimation,
    playAnimation,
  } = useGameContext();

  const { setNodeRef } = useDroppable({
    id: PRESELECTED_CARD_SECTION_ID,
  });
  const { cardScale } = useResponsiveValues();

  const { mode } = useParams();

  const tier = 2;
  const level = 5;
  const name = "Nameless King";
  const lifeLeft = 899;

  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"space-around"}
      alignItems={"center"}
      width={"100%"}
      height={"100%"}
    >
      <Flex
        flexDirection={"row"}
        width={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box className="game-tutorial-step-3">
          <DiscardButton highlight={isTutorialRunning} />
        </Box>

        <Box
          ref={setNodeRef}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Flex
            justifyContent="center"
            alignItems={"center"}
            height="188px"
            width="90%"
          >
            {mode === "beast" && (
              <Flex
                flexDirection="column"
                width="80%"
                justifyContent={"flex-end"}
                pb="30px"
                height={"100%"}
                gap={2}
              >
                <Flex
                  position="relative"
                  mt={"-360px"}
                  justifyContent="center"
                  alignItems="center"
                  textAlign="center"
                >
                  <CachedImage
                    src="/beasts/berserker.png"
                    maxHeight="50vh"
                    zIndex={100}
                  />
                </Flex>
                <Flex
                  width="100%"
                  mt={"-140px"}
                  justifyContent="space-between"
                  alignItems="flex-end"
                >
                  <Box>
                    <Text lineHeight={1} size="l">
                      Tier {tier}
                    </Text>
                    <Text lineHeight={1} size="l">
                      Level {level}
                    </Text>
                    <Text lineHeight={1} size="l" color={BEAST_RED}>
                      {name}
                    </Text>
                  </Box>
                  <Text lineHeight={1} size="l">
                    {lifeLeft}
                  </Text>
                </Flex>
                <Box width="100%">
                  <ProgressBar
                    progress={80}
                    color={BEAST_RED}
                    borderColor={BEAST_RED}
                  />
                </Box>
              </Flex>
            )}
            {mode === "obstacle" && <Obstacle />}
          </Flex>
        </Box>
        <Box className="game-tutorial-step-4">
          <PlayButton highlight={isTutorialRunning} />
        </Box>
      </Flex>
      <Box zIndex={300}>
        <MultiPoints />
      </Box>
    </Flex>
  );
};
