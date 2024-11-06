import { Box, Button, Flex, Heading, Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Background } from "../components/Background";
import { PositionedDiscordLink } from "../components/DiscordLink";
import { PositionedGameMenu } from "../components/GameMenu";
import { TiltCard } from "../components/TiltCard";
import { beep } from "../constants/sfx";
import { useAudio } from "../hooks/useAudio";
import { useGameContext } from "../providers/GameProvider";
import { LS_GREEN } from "../theme/colors";
import { useResponsiveValues } from "../theme/responsiveSettings";
import { Card } from "../types/Card";
import { getCardUniqueId } from "../utils/getCardUniqueId";
import { runConfettiAnimation } from "../utils/runConfettiAnimation";
import { FullScreenCardContainer } from "./FullScreenCardContainer";

export const RewardsSelection = () => {
  const { mode } = useParams();
  const [cardsToKeep, setCardsToKeep] = useState<Card[]>([]);

  const {
    selectNewRewards,
    blisterPackResult,
    setBlisterPackResult,
    refetchBlisterPackResult,
    addSpecialCard,
    specialCards,
  } = useGameContext();
  const [isLoading, setIsLoading] = useState(false);

  const { isSmallScreen, cardScale } = useResponsiveValues();
  const adjustedCardScale = cardScale * 1.5;
  const maxCards = mode === "special" ? 1 : 3;
  const isSpecialsFull = specialCards.length === 5;

  const { play: beepSound } = useAudio(beep);

  useEffect(() => {
    if (blisterPackResult.length === 0) {
      refetchBlisterPackResult();
    }
  }, [blisterPackResult]);

  useEffect(() => {
    runConfettiAnimation();
  }, []);

  const confirmSelectCards = () => {
    beepSound();
    setIsLoading(true);
    selectNewRewards(cardsToKeep.map((c) => c.idx))
      .then((response) => {
        if (response) {
          cardsToKeep.forEach((card) => {
            if (card.isSpecial) {
              addSpecialCard(card);
            }
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
    setBlisterPackResult([]);
  };

  const continueButtonDisabled =
    mode === "special" && isSpecialsFull && cardsToKeep.length > 0;

  const continueButton = (
    <Button
      isDisabled={continueButtonDisabled}
      width={"30%"}
      mt={8}
      alignSelf={"center"}
      onClick={confirmSelectCards}
    >
      Continue
    </Button>
  );

  return (
    <Background type="skulls" dark bgDecoration>
      <PositionedGameMenu decoratedPage />
      <Flex height="100%" justifyContent={"center"} direction={"column"}>
        <Heading size={"xxl"} mb={4} textAlign={"center"} variant="neonGreen">
          - Select your rewards -
        </Heading>
        <Heading size={"xl"} textAlign={"center"} variant="neonGreen" my={4}>
          {maxCards === 1 ? "Choose 1 card" : `Choose up to ${maxCards} cards`}
        </Heading>
        <FullScreenCardContainer>
          {blisterPackResult?.map((card, index) => {
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
                      beepSound();
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

        {continueButtonDisabled ? (
          <Tooltip label="You can't add more special cards">
            {continueButton}
          </Tooltip>
        ) : (
          continueButton
        )}

        <PositionedDiscordLink />
      </Flex>
    </Background>
  );
};
