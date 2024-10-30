import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../../dojo/queries/useGame.tsx";
import { useGameContext } from "../../providers/GameProvider";
import { useStore } from "../../providers/StoreProvider";
import { Background } from "../../components/Background";
import { StoreContent } from "./StoreContent";
import { StoreContentMobile } from "./StoreContent.mobile";
import useStoreContent from "./UseStoreContent.ts";
import { Loading } from "../../components/Loading.tsx";

import {
  JOYRIDE_LOCALES,
  STORE_TUTORIAL_STEPS,
  TUTORIAL_STYLE,
} from "../../constants/gameTutorial.ts";
import Joyride, { CallBackProps } from "react-joyride";
import { SKIP_TUTORIAL_STORE } from "../../constants/localStorage.ts";

import { useResponsiveValues } from "../../theme/responsiveSettings.tsx";

export const Store = () => {
  const { loading, setRun, run } = useStoreContent();

  const { gameId, setIsRageRound } = useGameContext();
  const game = useGame();
  const state = game?.state;
  const { lockRedirection } = useStore();
  const { isSmallScreen } = useResponsiveValues();

  useEffect(() => {
    setIsRageRound(false);
  }, []);

  useEffect(() => {
    if (!lockRedirection) {
      if (game?.state === "FINISHED") {
        navigate(`/gameover/${gameId}`);
      } else if (game?.state === "IN_GAME") {
        navigate("/demo");
      } else if (game?.state === "OPEN_BLISTER_PACK") {
        navigate("/open-pack");
      }
    }
  }, [game?.state, lockRedirection]);

  const navigate = useNavigate();

  useEffect(() => {
    if (state === "FINISHED") {
      navigate(`/gameover/${gameId}`);
    } else if (state === "IN_GAME") {
      navigate("/demo");
    }
  }, [state]);

  useEffect(() => {
    if (!game) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const showTutorial = !localStorage.getItem(SKIP_TUTORIAL_STORE);
    if (showTutorial) setRun(true);
  }, []);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { type } = data;

    if (type === "tour:end") {
      window.localStorage.setItem(SKIP_TUTORIAL_STORE, "true");
      setRun(false);
    }
  };

  if (loading) {
    return (
      <Background type="game">
        <Loading />
      </Background>
    );
  }

  return (
    <Background type="store" scrollOnMobile>
      <Joyride
        steps={STORE_TUTORIAL_STEPS}
        run={run}
        continuous
        showSkipButton
        styles={TUTORIAL_STYLE}
        showProgress
        callback={handleJoyrideCallback}
        locale={JOYRIDE_LOCALES}
      />
      {isSmallScreen ? <StoreContentMobile /> : <StoreContent />}
    </Background>
  );
};
