import { Box, Button, Flex, Heading } from "@chakra-ui/react";
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
import { PositionedGameMenu } from "../../components/GameMenu.tsx";
import { Loading } from "../../components/Loading.tsx";
import { MobileCardHighlight } from "../../components/MobileCardHighlight.tsx";
import { ShowPlays } from "../../components/ShowPlays.tsx";
import { SortBy } from "../../components/SortBy.tsx";
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
import { useCardHighlight } from "../../providers/CardHighlightProvider.tsx";
import { useGameContext } from "../../providers/GameProvider.tsx";
import { DiscardButton } from "./DiscardButton.tsx";
import { HandSection } from "./HandSection.tsx";
import { PlayButton } from "./PlayButton.tsx";
import { MobilePreselectedCardsSection } from "./PreselectedCardsSection.mobile.tsx";
import { MobileTopSection } from "./TopSection.mobile.tsx";

export const MobileGameContent = () => {
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

  const { highlightedCard } = useCardHighlight();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
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

  if (gameLoading) {
    return <Loading />;
  }

  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      {highlightedCard && <MobileCardHighlight card={highlightedCard} />}

      <Box
        sx={{
          position: "fixed",
          zIndex: 1000,
        }}
        right={[1, 4]}
        bottom={[1, 4]}
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

        <PositionedGameMenu
          showTutorial={() => {
            setRun(true);
          }}
        />
      </Box>

      <Box
        sx={{
          height: "100%",
          width: "100%",
        }}
      >
        <DndContext
          onDragEnd={handleDragEnd}
          autoScroll={false}
          sensors={sensors}
        >
          <Box
            paddingTop={4}
            sx={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ height: "205px", width: "100%" }}>
              <MobileTopSection />
            </Box>
            <Box
              sx={{
                width: "90%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "rgba(0,0,0,0.7)",
              }}
            >
              <MobilePreselectedCardsSection />
            </Box>
            <Flex width="90%" mt={2} mx={4} justifyContent={"space-between"}>
              <DiscardButton highlight={run} />
              <PlayButton highlight={run} />
            </Flex>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
              width={"100%"}
            >
              <Box width={"100%"}>
                <Box pb={2} display={"flex"} justifyContent={"center"}>
                  <HandSection />
                </Box>
                <Box
                  width="100%"
                  display={"flex"}
                  alignItems={"center"}
                  backgroundColor="rgba(0,0,0,0.5)"
                  px={18}
                  gap={4}
                >
                  <SortBy />
                  <ShowPlays />
                </Box>
              </Box>
            </Box>
          </Box>
        </DndContext>
      </Box>
    </Box>
  );
};
