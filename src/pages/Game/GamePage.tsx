import { useEffect } from "react";
import { RemoveScroll } from "react-remove-scroll";
import { useLocation, useNavigate } from "react-router-dom";
import { Background } from "../../components/Background";
import { PositionedDiscordLink } from "../../components/DiscordLink";
import { LOGGED_USER } from "../../constants/localStorage";
import { useGame } from "../../dojo/queries/useGame";
import { useRageCards, useRageRound } from "../../dojo/queries/useRageRound";
import { useDojo } from "../../dojo/useDojo";
import { CardHighlightProvider } from "../../providers/CardHighlightProvider";
import { useGameContext } from "../../providers/GameProvider";
import { useResponsiveValues } from "../../theme/responsiveSettings";
import { MobileGameContent } from "./GameContent.mobile";
import { RageRoundAnimation } from "./RageRoundAnimation";
import { GameContent } from "./GameContent";

export const GamePage = () => {
  //   const {
  //     setup: { masterAccount },
  //     account: { account },
  //   } = useDojo();
  //   const username = localStorage.getItem(LOGGED_USER);
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
  //   const rageRound = useRageRound();
  //   const rageCards = useRageCards();
  //   const navigate = useNavigate();
  //   const game = useGame();
  //   const { state } = useLocation();

  //   const skipRageAnimation = state?.skipRageAnimation;
  //   const { isSmallScreen } = useResponsiveValues();

  //   useEffect(() => {
  //     if (account !== masterAccount && username) {
  //       checkOrCreateGame();
  //     }
  //   }, [account, username]);

  //   useEffect(() => {
  //     setLockedCash(undefined);
  //     setIsRageRound(rageRound?.is_active ?? false);
  //     setRageCards(rageCards);
  //   }, []);

  //   if (!username) navigate("/");

  //   useEffect(() => {
  //     // if roundRewards is true, we don't want to redirect user
  //     if (!roundRewards && !lockRedirection) {
  //       if (game?.state === "FINISHED") {
  //         navigate(`/gameover/${gameId}`);
  //       }
  //     }
  //   }, [game?.state, roundRewards]);

  const isRageRound = false;
  const isSmallScreen = false;
  const skipRageAnimation = false;

  return (
    <Background type={isRageRound ? "rage" : "cave"}>
      {!skipRageAnimation && <RageRoundAnimation />}
      {isSmallScreen ? (
        <CardHighlightProvider>
          <MobileGameContent />
        </CardHighlightProvider>
      ) : (
        <GameContent />
      )}
      <RemoveScroll>
        <></>
      </RemoveScroll>
      {!isSmallScreen && <PositionedDiscordLink />}
    </Background>
  );
};
