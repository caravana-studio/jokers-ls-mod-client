import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TiltCard } from "../../components/TiltCard";
import { useStore } from "../../providers/StoreProvider";
import { Card } from "../../types/Card";
import { getCardUniqueId } from "../../utils/getCardUniqueId";
import { preloadImages } from "../../utils/preloadImages";
import { useResponsiveValues } from "../../theme/responsiveSettings";

interface CardsRowProps {
  title: string;
  cards: Card[];
  button?: {
    onClick: () => void;
    label: string;
  };
}

export const StoreCardsRow = ({ title, cards, button }: CardsRowProps) => {
  const navigate = useNavigate();
  const { buyCard, isPurchased } = useStore();
  const imageUrls = useMemo(() => {
    return cards.map((card) => {
      return card.isSpecial || card.isModifier
        ? `Cards/${card.card_id}.png`
        : `Cards/big/${card.img}`;
    });
  }, [cards]);

  const { isSmallScreen, cardScale, isCardScaleCalculated } =
    useResponsiveValues();

  const adjustedScale = isSmallScreen
    ? cardScale
    : cardScale - (cardScale * 25) / 100;

  useEffect(() => {
    preloadImages(imageUrls)
      .then(() => {})
      .catch((error) => {
        console.error("Error preloading card images:", error);
      });
  }, [imageUrls]);

  if (!isCardScaleCalculated) {
    return null;
  }

  return (
    <>
      <Box mb={8}>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading
            size={{ base: "s", sm: "xs" }}
            mb={[1, 1, 1, 2, 2]}
            fontWeight={"400"}
          >
            {title}
          </Heading>
          {button && (
            <Button
              variant="outline"
              sx={{ width: 300 }}
              onClick={button.onClick}
            >
              {button.label}
            </Button>
          )}
        </Flex>

        <Flex
          flexDirection="row"
          justifyContent="flex-start"
          wrap={"wrap"}
          gap={[2, 4, 6]}
          rowGap={4}
        >
          {cards.map((card) => {
            const purchased = isPurchased(card);
            return (
              <Flex key={getCardUniqueId(card)} justifyContent="center">
                <TiltCard
                  cursor="pointer"
                  scale={adjustedScale}
                  card={{ ...card, purchased }}
                  onClick={() => {
                    if (!isPurchased(card)) {
                      navigate("/preview/card", {
                        state: { card: card },
                      });
                    }
                  }}
                />
              </Flex>
            );
          })}
        </Flex>
      </Box>
    </>
  );
};
