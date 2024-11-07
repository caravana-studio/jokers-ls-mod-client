import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Background } from "../components/Background";
import { PositionedDiscordLink } from "../components/DiscordLink";
import { PositionedGameMenu } from "../components/GameMenu";
import { TopSection } from "./Game/TopSection";
import RewardsSection from "./RewardsSection";
import SpriteAnimation from "./SpriteAnimation";
import { useGame } from "../dojo/queries/useGame";
import { useGameContext } from "../providers/GameProvider";
import { useGameState } from "../state/useGameState";
import { LS_GREEN } from "../theme/colors";

export const notificationAnimations = [
  { name: "idle", startFrame: 0, frameCount: 4 },
  { name: "run", startFrame: 9, frameCount: 5 },
  { name: "jump", startFrame: 11, frameCount: 7 },
  { name: "attack1", startFrame: 42, frameCount: 5 },
  { name: "attack2", startFrame: 47, frameCount: 6 },
  { name: "attack3", startFrame: 53, frameCount: 8 },
  { name: "damage", startFrame: 59, frameCount: 4 },
  { name: "die", startFrame: 64, frameCount: 9 },
  { name: "drawSword", startFrame: 70, frameCount: 5 },
  { name: "discoverItem", startFrame: 85, frameCount: 6 },
  { name: "slide", startFrame: 24, frameCount: 5 },
];

export const RewardsPage = () => {
  const game = useGame();
  const { skipFailedObstacle } = useGameContext();
  const { obstacletAttack, setObstacleAttack } = useGameState();
  const obstacleFailed = game?.substate.type === "UNPASSED_OBSTACLE";

  if (obstacleFailed && obstacletAttack === 0) {
    setObstacleAttack(5 * game.level.valueOf());
  }

  return (
    <Background type="skulls" dark bgDecoration>
      <PositionedGameMenu decoratedPage />
      <Flex
        height={"100%"}
        justifyContent={"space-around"}
        direction={"column"}
      >
        <TopSection inRewardsPag obstacleFailed={obstacleFailed} />
        {!obstacleFailed ? (
          <Box mt={5}>
            <RewardsSection />
            <Flex
              width={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <SpriteAnimation
                frameWidth={308}
                frameHeight={200}
                columns={5}
                rows={1}
                frameRate={4}
                animations={notificationAnimations}
                className="level-up-sprite"
                adjustment={0}
              />
            </Flex>
          </Box>
        ) : (
          <Flex alignItems={"center"} direction={"column"}>
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
