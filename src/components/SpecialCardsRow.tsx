import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MAX_SPECIAL_CARDS } from "../constants/config.ts";
import { CARD_HEIGHT, CARD_WIDTH } from "../constants/visualProps.ts";
import { useGame } from "../dojo/queries/useGame.tsx";
import { useCardHighlight } from "../providers/CardHighlightProvider.tsx";
import { useGameContext } from "../providers/GameProvider.tsx";
import { useResponsiveValues } from "../theme/responsiveSettings.tsx";
import { Card } from "../types/Card.ts";
import { AnimatedCard } from "./AnimatedCard.tsx";
import { ConfirmationModal } from "./ConfirmationModal.tsx";
import { LockedSlot } from "./LockedSlot.tsx";
import { TiltCard } from "./TiltCard.tsx";
import { FilledUnlockedSlot } from "./UnlockedSlot.tsx";
import { LS_GREEN_OPACTITY } from "../theme/colors.tsx";

interface SpecialCardsRowProps {
  cards: Card[];
}

export const SpecialCardsRow = ({ cards }: SpecialCardsRowProps) => {
  const [discardedCards, setDiscardedCards] = useState<string[]>([]);
  const { discardSpecialCard, roundRewards } = useGameContext();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);
  const [cardToDiscard, setCardToDiscard] = useState<number | null>(null);
  const { t } = useTranslation(["game"]);
  const { cardScale, isSmallScreen } = useResponsiveValues();
  const cardWidth = CARD_WIDTH * cardScale;
  const cardHeight = CARD_HEIGHT * cardScale;

  const { highlightCard } = useCardHighlight();

  const game = useGame();
  // const maxLength = game?.len_max_current_special_cards ?? 5;
  const maxLength = 5;

  useEffect(() => {
    if (roundRewards) {
      setDiscardedCards((prev) => [
        ...prev,
        ...cards
          .filter((card) => card.temporary && card.remaining === 1)
          .map((card) => card.id),
      ]);
    }
  }, [roundRewards, cards]);

  const handleDiscard = () => {
    const card = cards.find((c) => c.idx === cardToDiscard);
    if (card) {
      setHoveredButton(null);
      discardSpecialCard(cardToDiscard!).then((response) => {
        if (response) {
          setDiscardedCards((prev) => [...prev, card.id]);
        }
      });
      setCardToDiscard(null);
    }
  };

  return (
    <Flex
      height={`${cardHeight}px`}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      {cards.map((card) => {
        const isDiscarded = discardedCards.includes(card.id);
        return (
          <Flex
            className="special-cards-step-1"
            key={card.idx}
            justifyContent="center"
            width={`100%`}
            maxWidth={`${cardWidth + 7}px`}
            position="relative"
            zIndex={1}
            onMouseEnter={() => setHoveredCard(card.idx)}
            onMouseLeave={() => {
              setHoveredCard(null);
              setHoveredButton(null);
            }}
          >
            {!isDiscarded && (
              <AnimatedCard
                idx={card.idx}
                isSpecial={!!card.isSpecial}
                scale={cardScale - cardScale * 0.1}
              >
                <Box position="relative">
                  <Flex
                    position={"absolute"}
                    zIndex={7}
                    bottom="5px"
                    left="5px"
                    borderRadius={"10px"}
                    background={"violet"}
                  >
                    {hoveredCard === card.idx && (
                      <Button
                        height={8}
                        fontSize="8px"
                        px={"16px"}
                        size={isSmallScreen ? "xs" : "md"}
                        borderRadius={"10px"}
                        variant={"discardSecondarySolid"}
                        display="flex"
                        gap={4}
                        onMouseEnter={() => setHoveredButton(card.idx)}
                        onClick={() => {
                          console.log(card.idx);
                          setCardToDiscard(card.idx);
                        }}
                      >
                        <Text fontSize="10px">X</Text>
                        {hoveredButton === card.idx && (
                          <Text fontSize="10px">
                            {t("game.special-cards.remove-special-cards-label")}
                          </Text>
                        )}
                      </Button>
                    )}
                  </Flex>
                  <TiltCard
                    onClick={() => {
                      isSmallScreen && highlightCard(card);
                    }}
                    card={card}
                    scale={cardScale - cardScale * 0.1}
                  />
                </Box>
              </AnimatedCard>
            )}
          </Flex>
        );
      })}
      <Flex
        style={{
          boxShadow: `0px 0px 10px 3px ${LS_GREEN_OPACTITY}`,
          borderRadius: "10px",
        }}
        gap={2}
        p={2}
      >
        {Array.from({ length: maxLength }).map((_, index) => (
          <Flex key={`slot-${index}`} maxWidth={`100%`}>
            <Box
              width={`${CARD_WIDTH * cardScale - cardScale * 0.1}`}
              height={`${CARD_HEIGHT * cardScale - cardScale * 0.1}`}
              minWidth={`${CARD_WIDTH * cardScale - cardScale * 0.1}`}
              border={"1.5px solid white"}
              borderRadius={"5px"}
            ></Box>
          </Flex>
        ))}
      </Flex>
      {cardToDiscard !== null && (
        <ConfirmationModal
          close={() => setCardToDiscard(null)}
          title={t("game.special-cards.confirmation-modal.title")}
          description={t("game.special-cards.confirmation-modal.description")}
          onConfirm={handleDiscard}
        />
      )}
    </Flex>
  );
};
