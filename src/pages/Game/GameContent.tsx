import { Box, Button, Flex, Heading, Image } from "@chakra-ui/react";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Joyride, { CallBackProps } from "react-joyride";
import { useNavigate, useParams } from "react-router-dom";
import { PositionedGameMenu } from "../../components/GameMenu.tsx";
import {
  GAME_TUTORIAL_STEPS,
  JOYRIDE_LOCALES,
  MODIFIERS_TUTORIAL_STEPS,
  SPECIAL_CARDS_TUTORIAL_STEPS,
  TUTORIAL_STYLE,
} from "../../constants/gameTutorial";
import {
  HAND_SECTION_ID,
  PRESELECTED_CARD_SECTION_ID,
} from "../../constants/general.ts";
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
    addModifier,
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
  const { isRageRound, createNewLevel } = useGameContext();
  const { t } = useTranslation(["game"]);
  const navigate = useNavigate();

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

  if (mode !== "beast" && mode !== "obstacle") {
    if (game?.substate == "BEAST") navigate("/game/beast");

    if (game?.substate == "OBSTACLE") navigate("/game/obstacle");
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const draggedCard = Number(event.active?.id);
    const isModifier = hand.find((c) => c.idx === draggedCard)?.isModifier;

    const modifiedCard = Number(event.over?.id);
    if (!isNaN(modifiedCard) && !isNaN(draggedCard) && isModifier) {
      const index = preSelectedCards.indexOf(modifiedCard);
      if (index !== -1) {
        addModifier(modifiedCard, draggedCard);
      }
    } else if (
      !isModifier &&
      (event.over?.id === PRESELECTED_CARD_SECTION_ID || !isNaN(modifiedCard))
    ) {
      preSelectCard(draggedCard);
    } else if (event.over?.id === HAND_SECTION_ID) {
      unPreSelectCard(draggedCard);
    }
  };

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

  useEffect(() => {
    if (!mode && game?.substate == "CREATE_LEVEL") {
      createNewLevel();
    }
  }, [game?.substate]);

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
          <Box sx={{ height: "100%", width: "100%" }}>
            <Box sx={{ height: "30%", width: "100%" }} mb={5}>
              <TopSection />
            </Box>
            <Box height={"70%"} width={"100%"}>
              <DndContext
                sensors={sensors}
                onDragEnd={handleDragEnd}
                autoScroll={false}
              >
                <Box
                  sx={{
                    height: "45%",
                    width: "100%",
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
                  pb={"60px"}
                  mr={{ base: 10, md: 20 }}
                  sx={{
                    display: "flex",
                    height: "55%",
                    alignItems: "flex-end",
                    justifyContent: "center",
                  }}
                >
                  <HandSection />
                </Box>
              </DndContext>
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
