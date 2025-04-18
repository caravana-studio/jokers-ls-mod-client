import { Button, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Background } from "../components/Background";
import { PositionedDiscordLink } from "../components/DiscordLink";
import { PositionedGameMenu } from "../components/GameMenu";
import { Loading } from "../components/Loading";
import { BEAST_IS_MINTABLE_LS } from "../constants/localStorage";
import { useGameContext } from "../providers/GameProvider";
import { useGameState } from "../state/useGameState";
import { LS_GREEN } from "../theme/colors";
import { TopSection } from "./Game/TopSection";
import RewardsSection from "./RewardsSection";
import SpriteAnimation from "./SpriteAnimation";

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
  const { skipFailedObstacle, game, fetchGame } = useGameContext();
  const { obstacletAttack, setObstacleAttack } = useGameState();
  const obstacleFailed = game?.substate.type === "UNPASSED_OBSTACLE";
  const [disableBtn, setDisableBtn] = useState(false);

  if (obstacleFailed && obstacletAttack === 0) {
    setObstacleAttack(5 * game?.level.valueOf());
  }

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.localStorage.removeItem(BEAST_IS_MINTABLE_LS);
    fetchGame().finally(() => setIsLoading(false));
  }, []);

  return (
    <Background type="skulls" dark bgDecoration>
      <PositionedGameMenu decoratedPage />
      <Flex
        height={"100%"}
        justifyContent={"space-around"}
        direction={"column"}
      >
        <TopSection inRewardsPag obstacleFailed={obstacleFailed} />
        {isLoading ? (
          <Loading />
        ) : !obstacleFailed ? (
          <Flex
            flexDir="column"
            justifyContent={"space-around"}
            h="100%"
            mt={5}
          >
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
          </Flex>
        ) : (
          <Flex
            alignItems={"center"}
            h="100%"
            justifyContent={"center"}
            direction={"column"}
          >
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
            </Text>
            <Button
              isDisabled={disableBtn}
              width={"30%"}
              mt={8}
              alignSelf={"center"}
              onClick={() => {
                setDisableBtn(true);
                skipFailedObstacle().finally(() => setDisableBtn(false));
              }}
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
