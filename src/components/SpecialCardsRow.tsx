import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CARD_HEIGHT, CARD_WIDTH } from "../constants/visualProps.ts";
import { useGame } from "../dojo/queries/useGame.tsx";
import { useCardHighlight } from "../providers/CardHighlightProvider.tsx";
import { useGameContext } from "../providers/GameProvider.tsx";
import { LS_GREEN_OPACTITY } from "../theme/colors.tsx";
import { useResponsiveValues } from "../theme/responsiveSettings.tsx";
import { Card } from "../types/Card.ts";
import { AnimatedCard } from "./AnimatedCard.tsx";
import { ConfirmationModal } from "./ConfirmationModal.tsx";
import { TiltCard } from "./TiltCard.tsx";

interface SpecialCardsRowProps {
  cards: Card[];
}

export const SpecialCardsRow = ({ cards }: SpecialCardsRowProps) => {
  const { discardSpecialCard, removeSpecialCard } = useGameContext();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);
  const [cardToDiscard, setCardToDiscard] = useState<number | null>(null);
  const { t } = useTranslation(["game"]);
  const { isSmallScreen } = useResponsiveValues();
  const scale = 0.75;
  const cardWidth = CARD_WIDTH * scale;
  const cardHeight = CARD_HEIGHT * scale;

  const { highlightCard } = useCardHighlight();

  // const maxLength = game?.len_max_current_special_cards ?? 5;
  const maxLength = 5;
  const emptySlots = maxLength - cards.length;

  const handleDiscard = () => {
    const card = cards.find((c) => c.idx === cardToDiscard);
    if (card) {
      setHoveredButton(null);
      discardSpecialCard(cardToDiscard!).then((response) => {
        if (response) {
          card.card_id && removeSpecialCard(card.card_id);
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
      <Flex
        style={{
          boxShadow: `0px 0px 10px 3px ${LS_GREEN_OPACTITY}`,
          borderRadius: "10px",
        }}
        gap={2}
        p={2}
      >
        {cards.map((card) => {
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
              <AnimatedCard
                idx={card.idx}
                isSpecial={!!card.isSpecial}
                scale={scale}
              >
                <Box
                  position={"relative"}
                  width={`${cardWidth - cardWidth * 0.1}`}
                  height={"auto"}
                  minWidth={`${cardWidth - cardWidth * 0.1}`}
                  border={"1.5px solid white"}
                  borderRadius={"5px"}
                >
                  <Flex
                    position={"absolute"}
                    zIndex={7}
                    bottom="5px"
                    left="5px"
                    borderRadius={"10px"}
                  >
                    {hoveredCard === card.idx && (
                      <Button
                        height={8}
                        px={"8px"}
                        display="flex"
                        gap={4}
                        py={0}
                        backgroundColor="black"
                        border="1px solid white"
                        onMouseEnter={() => setHoveredButton(card.idx)}
                        onClick={() => {
                          setCardToDiscard(card.idx);
                        }}
                        sx={{
                          _hover: {
                            backgroundColor: "black",
                          },
                        }}
                      >
                        <Text fontSize="15px">X</Text>
                        {hoveredButton === card.idx && (
                          <Text fontSize="15px">
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
                    scale={scale}
                  />
                </Box>
              </AnimatedCard>
            </Flex>
          );
        })}
        {Array.from({ length: emptySlots }).map((_, index) => (
          <Flex
            key={`slot-${index}`}
            maxWidth={`100%`}
            justifyContent="center"
            alignItems={"center"}
          >
            <Box
              width={`${cardWidth - cardWidth * 0.1}`}
              height={`${cardHeight}`}
              minWidth={`${cardWidth - cardWidth * 0.1}`}
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
