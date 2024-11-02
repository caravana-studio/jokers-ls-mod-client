import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Background } from "../components/Background";
import { PositionedGameMenu } from "../components/GameMenu";
import { TiltCard } from "../components/TiltCard";
import { useBlisterPackResult } from "../dojo/queries/useBlisterPackResult";
import { useGame } from "../dojo/queries/useGame";
import { useGameContext } from "../providers/GameProvider";
import { LS_GREEN } from "../theme/colors";
import { useResponsiveValues } from "../theme/responsiveSettings";
import { Card } from "../types/Card";
import { getCardUniqueId } from "../utils/getCardUniqueId";
import { FullScreenCardContainer } from "./FullScreenCardContainer";
import { Collab } from "./Game/collab.tsx";

export const ChooseModifiersPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState<Card[]>();
  const [cardsToKeep, setCardsToKeep] = useState<Card[]>([]);
  const { isSmallScreen, cardScale } = useResponsiveValues();
  const adjustedCardScale = cardScale * 0.75;
  const maxCards = 5;

  const { selectModifierCards, redirectBasedOnGameState, lockRedirection } =
    useGameContext();
  const game = useGame();
  const blisterPackResult = useBlisterPackResult();

  useEffect(() => {
    if (blisterPackResult?.cardsPicked) {
      setCards([]);
    } else {
      if (blisterPackResult.cards.length > 0)
        setCards(blisterPackResult?.cards);
    }
  }, [blisterPackResult]);

  const confirmSelectCards = () => {
    setIsLoading(true);
    selectModifierCards(cardsToKeep.map((c) => c.idx)).finally(() => {
      setIsLoading(false);
    });
    setCards([]);
  };

  return (
    <Background bgDecoration type="skulls">
      <Flex
        height="100%"
        width="100%"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
      >
        <PositionedGameMenu decoratedPage />
        <Box w="100%">
          <Heading size={"xxl"} textAlign={"center"} variant="neonGreen">
            - Modifier cards -
          </Heading>
          <Text
            size={"l"}
            width={isSmallScreen ? "100%" : "50%"}
            margin={"0 auto"}
            textAlign={"center"}
            lineHeight={1}
          >
            Modifier cards add unique effects to individual cards when played.
            Once added to your deck, they can be used whenever drawn, allowing
            for flexible and strategic play.
          </Text>
        </Box>
        <Heading size={"xl"} textAlign={"center"} variant="neonGreen" mt={2}>
          Choose up to 5
        </Heading>
        <FullScreenCardContainer
          sx={{ width: isSmallScreen ? "100%" : "60%", margin: "0 auto" }}
        >
          {cards?.map((card, index) => {
            return (
              <Flex
                key={`${card.card_id ?? ""}-${index}`}
                flexDirection="column"
                gap={2}
              >
                <Box
                  key={getCardUniqueId(card)}
                  m={1}
                  padding={"8px"}
                  sx={{
                    opacity:
                      cardsToKeep.map((card) => card.idx).includes(card.idx) ||
                      cardsToKeep.length === 0
                        ? 1
                        : 0.9,
                    boxShadow: cardsToKeep
                      .map((card) => card.idx)
                      .includes(card.idx)
                      ? `0px 0px 15px 1px ${LS_GREEN}, inset 0px 0px 15px 1px ${LS_GREEN}`
                      : "none",
                    border: cardsToKeep
                      .map((card) => card.idx)
                      .includes(card.idx)
                      ? `1px solid ${LS_GREEN}`
                      : "1px solid transparent",
                  }}
                >
                  <TiltCard
                    scale={adjustedCardScale}
                    card={card}
                    key={index}
                    onClick={() => {
                      if (
                        cardsToKeep.map((card) => card.idx).includes(card.idx)
                      ) {
                        setCardsToKeep(
                          cardsToKeep.filter((c) => c.idx !== card.idx)
                        );
                      } else {
                        if (cardsToKeep.length < maxCards)
                          setCardsToKeep([...cardsToKeep, card]);
                      }
                    }}
                  />
                </Box>
              </Flex>
            );
          })}
        </FullScreenCardContainer>
        <Flex justifyContent={"center"} my={4}>
          <Button onClick={confirmSelectCards} isDisabled={isLoading}>
            Continue
          </Button>
        </Flex>
        {!isSmallScreen && (
          <Box position={"fixed"} left={"80px"} top={12}>
            <Collab />
          </Box>
        )}
      </Flex>
    </Background>
  );
};
