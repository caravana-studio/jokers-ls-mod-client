import { Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Background } from "../components/Background";
import { PositionedDiscordLink } from "../components/DiscordLink";
import { PositionedGameMenu } from "../components/GameMenu";
import { useGameContext } from "../providers/GameProvider";
import { runConfettiAnimation } from "../utils/runConfettiAnimation";

export const RewardsPage = () => {
  const { roundRewards, createNewLevel } = useGameContext();
  const navigate = useNavigate();

  useEffect(() => {
    runConfettiAnimation();
  }, []);

  if (!roundRewards) {
    navigate("/redirect/store");
  }

  return (
    <Background type="game" dark bgDecoration>
      <PositionedGameMenu decoratedPage />
      {/* <RewardsDetail roundRewards={roundRewards} /> */}
      <Button onClick={() => createNewLevel()}>Continue</Button>
      <PositionedDiscordLink />
    </Background>
  );
};
