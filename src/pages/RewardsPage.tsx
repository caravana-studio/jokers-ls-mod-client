import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Background } from "../components/Background";
import { PositionedDiscordLink } from "../components/DiscordLink";
import { PositionedGameMenu } from "../components/GameMenu";
import { RewardsDetail } from "../components/RewardsDetail";
import { useGameContext } from "../providers/GameProvider";
import { runConfettiAnimation } from "../utils/runConfettiAnimation";

export const RewardsPage = () => {
  const { roundRewards } = useGameContext();
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
      <RewardsDetail roundRewards={roundRewards} />
      <PositionedDiscordLink />
    </Background>
  );
};
