import { useEffect } from "react";
import { RemoveScroll } from "react-remove-scroll";
import { useParams } from "react-router-dom";
import { Background } from "../../components/Background";
import { PositionedDiscordLink } from "../../components/DiscordLink";
import { useGameContext } from "../../providers/GameProvider";
import { GameContent } from "./GameContent";

export const GamePage = () => {
  const { mode } = useParams();

  const { fetchGame } = useGameContext();

  useEffect(() => {
    fetchGame();
  }, []);

  return (
    <Background type={mode === "obstacle" ? "cave" : "beast"}>
      <GameContent />
      <RemoveScroll>
        <></>
      </RemoveScroll>
      <PositionedDiscordLink />
    </Background>
  );
};
