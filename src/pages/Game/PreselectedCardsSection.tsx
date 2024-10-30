import { Box, Flex } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import { AnimatedCard } from "../../components/AnimatedCard";
import { CurrentPlay } from "../../components/CurrentPlay.tsx";
import { ModifiableCard } from "../../components/ModifiableCard";
import { TiltCard } from "../../components/TiltCard";
import { PRESELECTED_CARD_SECTION_ID } from "../../constants/general.ts";
import { useGameContext } from "../../providers/GameProvider";
import { useResponsiveValues } from "../../theme/responsiveSettings.tsx";
import { Card } from "../../types/Card";
import { DiscardButton } from "./DiscardButton.tsx";
import { PlayButton } from "./PlayButton.tsx";

interface PreselectedCardsProps {
  isTutorialRunning?: boolean;
}

export const PreselectedCardsSection = ({
  isTutorialRunning = false,
}: PreselectedCardsProps) => {
  const {
    preSelectedCards,
    hand,
    getModifiers,
    togglePreselected,
    discardAnimation,
    playAnimation,
  } = useGameContext();

  const { setNodeRef } = useDroppable({
    id: PRESELECTED_CARD_SECTION_ID,
  });
  const { cardScale } = useResponsiveValues();

  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"space-around"}
      alignItems={"center"}
      width={"100%"}
      height={"100%"}
    >
      <Box height="60px"></Box>
      <Flex
        flexDirection={"row"}
        width={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box className="game-tutorial-step-3">
          <DiscardButton highlight={isTutorialRunning} />
        </Box>

        <Box
          ref={setNodeRef}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Flex
            justifyContent="center"
            alignItems={"center"}
            height="188px"
            background={"url(grid.png)"}
            width="90%"
          >
            {preSelectedCards.map((idx) => {
              const card = hand.find((c) => c.idx === idx);
              const modifiers = getModifiers(idx);
              const modifiedCard: Card = { ...card!, modifiers };
              return (
                card && (
                  <Box key={card.id} mx={{ base: 3, md: 6 }}>
                    <ModifiableCard id={card.id}>
                      <AnimatedCard
                        idx={card.idx}
                        discarded={discardAnimation}
                        played={playAnimation}
                      >
                        <TiltCard
                          cursor="pointer"
                          card={modifiedCard}
                          scale={cardScale}
                          onClick={() => {
                            togglePreselected(idx);
                          }}
                        />
                      </AnimatedCard>
                    </ModifiableCard>
                  </Box>
                )
              );
            })}
          </Flex>
        </Box>
        <Box className="game-tutorial-step-4">
          <PlayButton highlight={isTutorialRunning} />
        </Box>
      </Flex>
      <CurrentPlay />
    </Flex>
  );
};
