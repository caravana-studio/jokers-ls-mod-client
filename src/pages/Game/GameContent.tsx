import { Box, Button, Flex, Heading, Image } from "@chakra-ui/react";
import { PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Joyride, { CallBackProps } from "react-joyride";
import { useParams } from "react-router-dom";
import { PositionedGameMenu } from "../../components/GameMenu.tsx";
import {
  GAME_TUTORIAL_STEPS,
  JOYRIDE_LOCALES,
  MODIFIERS_TUTORIAL_STEPS,
  SPECIAL_CARDS_TUTORIAL_STEPS,
  TUTORIAL_STYLE,
} from "../../constants/gameTutorial";
import {
  SKIP_TUTORIAL_GAME,
  SKIP_TUTORIAL_MODIFIERS,
  SKIP_TUTORIAL_SPECIAL_CARDS,
} from "../../constants/localStorage.ts";
import { useGame } from "../../dojo/queries/useGame.tsx";
import { useGameContext } from "../../providers/GameProvider.tsx";
import { HandSection } from "./HandSection.tsx";
import { MidSection } from "./MidSection.tsx";
import { TopSection } from "./TopSection.tsx";

export const GameContent = () => {
  const {
    hand,
    preSelectedCards,
    gameLoading,
    error,
    executeCreateGame,
    preSelectCard,
    unPreSelectCard,
  } = useGameContext();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const { mode } = useParams();

  const [run, setRun] = useState(false);
  const [runSpecial, setRunSpecial] = useState(false);
  const [runTutorialModifiers, setRunTutorialModifiers] = useState(false);
  const [specialTutorialCompleted, setSpecialTutorialCompleted] =
    useState(false);
  const { t } = useTranslation(["game"]);

  useEffect(() => {
    const showTutorial = !localStorage.getItem(SKIP_TUTORIAL_GAME);
    if (showTutorial) setRun(true);
  }, []);

  const handleJoyrideCallbackFactory = (
    storageKey: string,
    setRunCallback: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    return (data: CallBackProps) => {
      const { type } = data;

      if (type === "tour:end") {
        window.localStorage.setItem(storageKey, "true");
        setRunCallback(false);
        if (storageKey === SKIP_TUTORIAL_SPECIAL_CARDS) {
          setSpecialTutorialCompleted(true);
        }
      }
    };
  };

  const handleJoyrideCallback = handleJoyrideCallbackFactory(
    SKIP_TUTORIAL_GAME,
    setRun
  );
  const handleSpecialJoyrideCallback = handleJoyrideCallbackFactory(
    SKIP_TUTORIAL_SPECIAL_CARDS,
    setRunSpecial
  );
  const handleModifiersJoyrideCallback = handleJoyrideCallbackFactory(
    SKIP_TUTORIAL_MODIFIERS,
    setRunTutorialModifiers
  );

  const game = useGame();

  useEffect(() => {
    const showSpecialCardTutorial = !localStorage.getItem(
      SKIP_TUTORIAL_SPECIAL_CARDS
    );
    const showModifiersTutorial = !localStorage.getItem(
      SKIP_TUTORIAL_MODIFIERS
    );

    if (
      showSpecialCardTutorial &&
      game?.len_current_special_cards != undefined &&
      game?.len_current_special_cards > 0
    ) {
      setRunSpecial(true);
    } else if (specialTutorialCompleted || !showSpecialCardTutorial) {
      if (showModifiersTutorial) {
        const hasModifier = hand.some((card) => card.isModifier);
        if (hasModifier) {
          setRunTutorialModifiers(true);
        }
      }
    }
  }, [game, hand, specialTutorialCompleted]);

  if (error) {
    return (
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={8}
        sx={{ height: "100%" }}
      >
        <Heading size="xl" variant="neonGreen">
          {t("error.labels.error-msj")}
        </Heading>
        <Button
          variant="outline"
          sx={{ width: 300 }}
          onClick={(e) => {
            e.stopPropagation();
            executeCreateGame();
          }}
        >
          {t("error.labels.label-error-btn")}
        </Button>
      </Flex>
    );
  }

  //   if (gameLoading || !game) {
  //     return <Loading />;
  //   }

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: "100%",
        }}
      >
        <Joyride
          steps={GAME_TUTORIAL_STEPS}
          run={run}
          continuous
          showSkipButton
          showProgress
          callback={handleJoyrideCallback}
          styles={TUTORIAL_STYLE}
          locale={JOYRIDE_LOCALES}
        />

        <Joyride
          steps={SPECIAL_CARDS_TUTORIAL_STEPS}
          run={runSpecial}
          continuous
          showSkipButton
          showProgress
          callback={handleSpecialJoyrideCallback}
          styles={TUTORIAL_STYLE}
          locale={JOYRIDE_LOCALES}
        />

        <Joyride
          steps={MODIFIERS_TUTORIAL_STEPS}
          run={runTutorialModifiers}
          continuous
          showSkipButton
          showProgress
          callback={handleModifiersJoyrideCallback}
          styles={TUTORIAL_STYLE}
          locale={JOYRIDE_LOCALES}
        />

        <Box sx={{ width: "100%", height: "100%" }}>
          <Image
            src={`/borders/top${mode === "beast" ? "-rage" : ""}.png`}
            height="8%"
            width="100%"
            maxHeight="70px"
            position="fixed"
            top={0}
            zIndex={0}
          />
          <Box
            sx={{ height: "100%", width: "100%" }}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-around"}
          >
            <Box sx={{ width: "100%" }} mb={2}>
              <TopSection />
            </Box>
            <Box width={"100%"}>
              <Box
                mb={2}
                sx={{
                  width: "100%",
                  height: "50%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  px: "70px",
                }}
              >
                <MidSection isTutorialRunning={run} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  height: "auto",
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <HandSection />
              </Box>
            </Box>
          </Box>
          <Image
            src={`/borders/bottom${mode === "beast" ? "-rage" : ""}.png`}
            maxHeight="70px"
            height="8%"
            width="100%"
            position="fixed"
            bottom={0}
            sx={{ pointerEvents: "none" }}
          />
        </Box>

        <PositionedGameMenu
          decoratedPage
          bottomPositionDesktop={16}
          showTutorial={() => {
            setRun(true);
          }}
        />
      </Box>
    </Box>
  );
};
