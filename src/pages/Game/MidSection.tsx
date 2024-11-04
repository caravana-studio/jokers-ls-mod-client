import { Box, Flex, Text } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import { useParams } from "react-router-dom";
import { ProgressBar } from "../../components/CompactRoundData/ProgressBar.tsx";
import { CurrentPlay } from "../../components/CurrentPlay.tsx";
import { MultiPoints } from "../../components/MultiPoints.tsx";
import { PRESELECTED_CARD_SECTION_ID } from "../../constants/general.ts";
import { useGameContext } from "../../providers/GameProvider.tsx";
import { BEAST_RED } from "../../theme/colors.tsx";
import { useResponsiveValues } from "../../theme/responsiveSettings.tsx";
import { DiscardButton } from "./DiscardButton.tsx";
import { Obstacle } from "./Obstacle.tsx";
import { PlayButton } from "./PlayButton.tsx";
import { getNameBeast } from "../../utils/getNameBeast.ts";
import { useEffect, useRef, useState } from "react";
import AttackAnimation from "../../components/Animation/AttackAnimation.tsx";

interface MidSectionProps {
  isTutorialRunning?: boolean;
}

export const MidSection = ({ isTutorialRunning = false }: MidSectionProps) => {
  const {
    preSelectedCards,
    hand,
    togglePreselected,
    discardAnimation,
    playAnimation,
    beast,
    refetchBeast,
    attackAnimation,
    setAttackAnimation,
  } = useGameContext();

  useEffect(() => {
    if (!beast) {
      refetchBeast();
    }
  }, [beast]);

  const { setNodeRef } = useDroppable({
    id: PRESELECTED_CARD_SECTION_ID,
  });

  const { mode } = useParams();

  const tier = beast?.tier ?? 0;
  const level = beast?.level ?? 0;
  const beast_id = beast?.beast_id ?? 0;
  const name = getNameBeast(beast_id);
  const maxHealth = beast?.health ?? 0;
  const lifeLeft = beast?.current_health ?? 0;

  const attackAnimRef = useRef<{ runAnim: () => void }>(null);
  const [lifeLeftValue, setLifeLeftValue] = useState(lifeLeft);
  const [hpBarValue, setHpBarValue] = useState(
    (lifeLeft.valueOf() / maxHealth.valueOf()) * 100
  );

  useEffect(() => {
    if (!beast) {
      refetchBeast();
    }

    if (!hpBarValue) {
      setHpBarValue((lifeLeft.valueOf() / maxHealth.valueOf()) * 100);
      setLifeLeftValue(lifeLeft);
    }
  }, [beast]);

  useEffect(() => {
    if (attackAnimation > 0) {
      attackAnimRef.current?.runAnim();
    }
  }, [attackAnimation]);

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
            height="auto"
            width="90%"
          >
            {mode === "beast" && (
              <Flex
                flexDirection="column"
                width="80%"
                justifyContent={"flex-end"}
                height={"100%"}
                gap={2}
                className="tutorial-beast"
              >
                <Flex
                  position="relative"
                  mt={"-200px"}
                  justifyContent="center"
                  alignItems="center"
                  textAlign="center"
                >
                  <AttackAnimation
                    ref={attackAnimRef}
                    duration={400}
                    damagePoints={attackAnimation}
                    image={`/beasts/${beast_id}.png`}
                    onEnd={() => {
                      setHpBarValue(
                        (lifeLeft.valueOf() / maxHealth.valueOf()) * 100
                      );
                      setLifeLeftValue(lifeLeft);
                      setAttackAnimation(0);
                    }}
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
                      Tier {tier.toString()}
                    </Text>
                    <Text lineHeight={1} size="l">
                      Level {level.toString()}
                    </Text>
                    <Text lineHeight={1} size="l" color={BEAST_RED}>
                      {name}
                    </Text>
                  </Box>
                  <Text lineHeight={1} size="l">
                    {lifeLeftValue.toString()}
                  </Text>
                </Flex>
                <Box width="100%">
                  <ProgressBar
                    progress={hpBarValue}
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

      <Flex flexDirection="column" gap={1} mb={"-50px"} zIndex={300}>
        <MultiPoints />
        <CurrentPlay />
      </Flex>
    </Flex>
  );
};
