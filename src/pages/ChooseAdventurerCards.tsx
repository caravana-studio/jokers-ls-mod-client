import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Background } from "../components/Background";
import { PositionedGameMenu } from "../components/GameMenu";
import { Loading } from "../components/Loading";
import { TiltCard } from "../components/TiltCard";
import { beep } from "../constants/sfx";
import { useAudio } from "../hooks/useAudio";
import { useGameContext } from "../providers/GameProvider";
import { LS_GREEN } from "../theme/colors";
import { useResponsiveValues } from "../theme/responsiveSettings";
import { Card } from "../types/Card";
import { getCardUniqueId } from "../utils/getCardUniqueId";
import { FullScreenCardContainer } from "./FullScreenCardContainer";
import { Lsxjon } from "./Game/Lsxjon";

export const ChooseAdventurerCards = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cardsToKeep, setCardsToKeep] = useState<Card[]>([]);
  const { isSmallScreen, cardScale } = useResponsiveValues();
  const adjustedCardScale = cardScale * 1.2;
  const maxCards = 2;
  const { play: beepSound } = useAudio(beep);

  const {
    selectAdventurerCards,
    redirectBasedOnGameState,
    lockRedirection,
    blisterPackResult,
    setBlisterPackResult,
    refetchBlisterPackResult,
    addSpecialCard,
  } = useGameContext();

  useEffect(() => {
    if (blisterPackResult.length === 0) {
      refetchBlisterPackResult();
    }
  }, []);

  const confirmSelectCards = () => {
    beepSound();
    setIsLoading(true);
    selectAdventurerCards(cardsToKeep.map((c) => c.idx))
      .then((response) => {
        if (response) {
          cardsToKeep.forEach((card) => {
            if (card.isSpecial) {
              addSpecialCard(card);
            }
          });
        }
      })
      .catch(() => {
        setIsLoading(false);
      })
      .finally(() => {
        setCardsToKeep([]);
      });
    setBlisterPackResult([]);
  };

  return (
    <Background bgDecoration type="skulls">
      <Flex
        height="100%"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
      >
        <PositionedGameMenu decoratedPage />
        <Box>
          <Heading size={"xxl"} textAlign={"center"} variant="neonGreen">
            - Select cards -
          </Heading>
          {/* <Text
        size={"l"}
        width={isSmallScreen ? "100%" : "70%"}
        margin={"0 auto"}
        textAlign={"center"}
        lineHeight={1}
      >
        Special cards are the most powerful cards in the game, providing unique
        special effects that help maximize your score. Once unlocked, these
        effects remain active throughout the game, enhancing your strategy as
        you progress.
      </Text> */}
        </Box>
        <Box width="100%">
          <Heading size={"xl"} textAlign={"center"} variant="neonGreen" my={4}>
            Choose up to 2
          </Heading>
          <FullScreenCardContainer
            sx={{ width: isSmallScreen ? "100%" : "80%", margin: "0 auto" }}
          >
            {!blisterPackResult || blisterPackResult.length === 0 ? (
              <Loading />
            ) : (
              blisterPackResult?.map((card, index) => {
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
                          cardsToKeep
                            .map((card) => card.idx)
                            .includes(card.idx) || cardsToKeep.length === 0
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
                            cardsToKeep
                              .map((card) => card.idx)
                              .includes(card.idx)
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
              })
            )}
          </FullScreenCardContainer>
        </Box>
        <Flex justifyContent={"center"} my={4}>
          <Button onClick={confirmSelectCards} isDisabled={isLoading}>
            Continue
          </Button>
        </Flex>
        {!isSmallScreen && (
          <Box position={"fixed"} left={"80px"} top={12}>
            <Lsxjon />
          </Box>
        )}
      </Flex>
    </Background>
  );
};
