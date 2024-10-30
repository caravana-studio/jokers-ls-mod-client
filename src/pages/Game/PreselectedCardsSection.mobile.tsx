import { Box } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import { AnimatedCard } from "../../components/AnimatedCard.tsx";
import { CurrentPlay } from "../../components/CurrentPlay.tsx";
import { ModifiableCard } from "../../components/ModifiableCard.tsx";
import { TiltCard } from "../../components/TiltCard.tsx";
import { PRESELECTED_CARD_SECTION_ID } from "../../constants/general.ts";
import { CARD_HEIGHT, CARD_WIDTH } from "../../constants/visualProps.ts";
import { useGameContext } from "../../providers/GameProvider.tsx";
import { useResponsiveValues } from "../../theme/responsiveSettings.tsx";
import { Card } from "../../types/Card.ts";

export const MobilePreselectedCardsSection = () => {
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
  const cardWidth = CARD_WIDTH * cardScale;
  const cardHeight = CARD_HEIGHT * cardScale;

  return (
    <>
      <Box
        gap={1}
        py={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: `${cardHeight * 2 + 70}px`,
          width: "100%",
        }}
        ref={setNodeRef}
      >
        <Box
          sx={{
            maxWidth: `${cardWidth * 3 + 70}px`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            height: `${cardHeight * 2 + 30}px`,
          }}
        >
          {preSelectedCards.map((idx) => {
            const card = hand.find((c) => c.idx === idx);
            const modifiers = getModifiers(idx);
            const modifiedCard: Card = { ...card!, modifiers };
            return (
              card && (
                <Box key={card.id} mx={1.5} mb={1.5}>
                  <ModifiableCard id={card.id}>
                    <AnimatedCard
                      idx={card.idx}
                      discarded={discardAnimation}
                      played={playAnimation}
                    >
                      <TiltCard
                        cursor="pointer"
                        scale={cardScale}
                        card={modifiedCard}
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
        </Box>
        <CurrentPlay />
      </Box>
    </>
  );
};
