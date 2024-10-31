import { RemoveScroll } from "react-remove-scroll";
import { useParams } from "react-router-dom";
import { Background } from "../../components/Background";
import { PositionedDiscordLink } from "../../components/DiscordLink";
import { GameContent } from "./GameContent";

export const GamePage = () => {
  const { mode } = useParams();
  //   const {
  //     checkOrCreateGame,
  //     setLockedCash,
  //     isRageRound,
  //     setIsRageRound,
  //     setRageCards,
  //     roundRewards,
  //     gameId,
  //     lockRedirection,
  //   } = useGameContext();

  //   useEffect(() => {
  //     if (account !== masterAccount && username) {
  //       checkOrCreateGame();
  //     }
  //   }, [account, username]);

  //   if (!username) navigate("/");
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
