import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { Background } from "../components/Background";
import { PositionedDiscordLink } from "../components/DiscordLink";
import { PositionedGameMenu } from "../components/GameMenu";
import { runConfettiAnimation } from "../utils/runConfettiAnimation";
import { TopSection } from "./Game/TopSection";
import RewardsSection from "./RewardsSection";
import { useGame } from "../dojo/queries/useGame";
import { useGameContext } from "../providers/GameProvider";
import { useGameState } from "../state/useGameState";
import { LS_GREEN } from "../theme/colors";

export const RewardsPage = () => {
  useEffect(() => {
    runConfettiAnimation();
  }, []);

  const game = useGame();
  const { skipFailedObstacle } = useGameContext();
  const { obstacletAttack, setObstacleAttack } = useGameState();
  const obstacleFailed = game?.substate === "UNPASSED_OBSTACLE";

  if (obstacleFailed && obstacletAttack === 0) {
    setObstacleAttack(5 * game.level);
  }

  return (
    <Background type="skulls" dark bgDecoration>
      <PositionedGameMenu decoratedPage />
      <Flex direction={"column"}>
        <TopSection inRewardsPag obstacleFailed />
        {!obstacleFailed ? (
          <Box mt={16}>
            <RewardsSection />
          </Box>
        ) : (
          <Flex alignItems={"center"} direction={"column"} pt={20}>
            <Text fontFamily="Jersey" fontSize="2rem">
              You received{" "}
              <Text
                as="span"
                color={LS_GREEN}
                fontFamily="Jersey"
                fontSize="2rem"
              >
                {obstacletAttack} damage
              </Text>{" "}
              as punishment.
              <br />
              Click on the continue button to keep going.
            </Text>
            <Button
              width={"30%"}
              mt={8}
              alignSelf={"center"}
              onClick={() => skipFailedObstacle()}
            >
              Continue
            </Button>
          </Flex>
        )}

        <PositionedDiscordLink />
      </Flex>
    </Background>
  );
};
