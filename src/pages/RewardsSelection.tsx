import { Box, Button, Center, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Background } from "../components/Background";
import { PositionedDiscordLink } from "../components/DiscordLink";
import { PositionedGameMenu } from "../components/GameMenu";
import { useGameContext } from "../providers/GameProvider";
import { runConfettiAnimation } from "../utils/runConfettiAnimation";
import { TopSection } from "./Game/TopSection";
import { FullScreenCardContainer } from "./FullScreenCardContainer";
import RewardsSection from "./RewardsSection";
import { useBlisterPackResult } from "../dojo/queries/useBlisterPackResult";
import { Card } from "../types/Card";
import { getCardUniqueId } from "../utils/getCardUniqueId";
import { useResponsiveValues } from "../theme/responsiveSettings";
import { LS_GREEN } from "../theme/colors";
import { TiltCard } from "../components/TiltCard";

export const RewardsSelection = () => {
  const { mode } = useParams();
  const [cards, setCards] = useState<Card[]>();
  const [cardsToKeep, setCardsToKeep] = useState<Card[]>([]);
  const { selectNewRewards } = useGameContext();
  const [isLoading, setIsLoading] = useState(false);
  const blisterPackResult = useBlisterPackResult();
  console.log(blisterPackResult);

  const { isSmallScreen, cardScale } = useResponsiveValues();
  const adjustedCardScale = cardScale * 1.5;
  const maxCards = mode === "specials" ? 1 : 3;

  useEffect(() => {
    if (blisterPackResult?.cardsPicked) {
      setCards([]);
    } else {
      if (blisterPackResult.cards.length > 0)
        setCards(blisterPackResult?.cards);
    }
  }, [blisterPackResult]);

  useEffect(() => {
    runConfettiAnimation();
  }, []);

  const confirmSelectCards = () => {
    setIsLoading(true);
    selectNewRewards(cardsToKeep.map((c) => c.idx)).finally(() => {
      setIsLoading(false);
    });
    setCards([]);
  };

  // if (!roundRewards) {
  //   navigate("/redirect/store");
  // }

  return (
    <Background type="skulls" dark bgDecoration>
      <PositionedGameMenu decoratedPage />
      <Flex direction={"column"}>
        <FullScreenCardContainer>
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

        <Button
          width={"30%"}
          mt={8}
          alignSelf={"center"}
          onClick={confirmSelectCards}
        >
          Continue
        </Button>
        <PositionedDiscordLink />
      </Flex>
    </Background>
  );
};
