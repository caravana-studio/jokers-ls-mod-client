import { Box, Button, Checkbox, Flex, Text, Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Background } from "../components/Background";
import { ConfirmationModal } from "../components/ConfirmationModal";
import { Loading } from "../components/Loading";
import { TiltCard } from "../components/TiltCard";
import { useStore } from "../providers/StoreProvider";
import { BLUE, BLUE_LIGHT } from "../theme/colors";
import { Card } from "../types/Card";
import { getCardUniqueId } from "../utils/getCardUniqueId";
import { useTranslation } from "react-i18next";
import { PositionedDiscordLink } from "../components/DiscordLink";
import { PositionedGameMenu } from "../components/GameMenu";
import { useBlisterPackResult } from "../dojo/queries/useBlisterPackResult";
import { useCurrentSpecialCards } from "../dojo/queries/useCurrentSpecialCards";
import { useGame } from "../dojo/queries/useGame";
import { useResponsiveValues } from "../theme/responsiveSettings";
import { FullScreenCardContainer } from "./FullScreenCardContainer";

/* const WhiteOverlay = styled.div<{ $visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  z-index: 9999;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transition: opacity 1s ease-out;
  pointer-events: none;
`; */

export const OpenPack = () => {
  /*   const [overlayVisible, setOverlayVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOverlayVisible(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []); */
  const navigate = useNavigate();

  const game = useGame();
  const maxSpecialCards = game?.len_max_current_special_cards ?? 0;

  const blisterPackResult = useBlisterPackResult();
  const [cards, setCards] = useState<Card[]>([]);
  const [cardsToKeep, setCardsToKeep] = useState<Card[]>([]);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const currentSpecialCards = useCurrentSpecialCards();
  const currentSpecialCardsLenght = currentSpecialCards?.length ?? 0;
  const specialCardsToKeep = cardsToKeep.filter((c) => c.isSpecial).length;
  const continueDisabled =
    specialCardsToKeep > maxSpecialCards - currentSpecialCardsLenght;
  const { t } = useTranslation(["store"]);
  const { isSmallScreen, cardScale } = useResponsiveValues();
  const adjustedCardScale = cardScale * 1.2;

  useEffect(() => {
    if (game?.state === "IN_STORE") {
      navigate("/redirect/store");
    }
  }, [game?.state]);

  useEffect(() => {
    if (blisterPackResult?.cardsPicked) {
      setCards([]);
    } else {
      setCards(blisterPackResult?.cards ?? []);
      setCardsToKeep(blisterPackResult?.cards ?? []);
    }
  }, [blisterPackResult]);

  const allSelected = cardsToKeep.length === cards.length;

  const { selectCardsFromPack } = useStore();

  const confirmSelectCards = () => {
    selectCardsFromPack(cardsToKeep.map((c) => c.idx));
    setCards([]);
    navigate("/redirect/store");
  };

  const continueButton = (
    <Button
      mx={{ base: 6, md: 0 }}
      fontSize={12}
      isDisabled={continueDisabled}
      variant={continueDisabled ? "defaultOutline" : "solid"}
      onClick={() => {
        if (cardsToKeep.length === 0) {
          setConfirmationModalOpen(true);
        } else {
          confirmSelectCards();
        }
      }}
    >
      {t("store.packs.continue-btn")}
    </Button>
  );

  return (
    <Background type="home" dark bgDecoration>
      <PositionedGameMenu decoratedPage />
      {/* <WhiteOverlay $visible={overlayVisible} /> */}
      {cards.length > 0 ? (
        <Flex
          height={"100%"}
          justifyContent="center"
          flexDirection="column"
          gap={4}
        >
          <Flex
            flexDirection={isSmallScreen ? "column" : "row"}
            justifyContent="space-between"
            alignItems="center"
            mx={2}
          >
            <Text size="lg">{t("store.packs.cards-select-lbl")}</Text>
            <Checkbox
              color="white"
              isChecked={!!allSelected}
              onChange={(e) => {
                !e.target.checked ? setCardsToKeep([]) : setCardsToKeep(cards);
              }}
            >
              {t("store.packs.select-all-lbl").toUpperCase()}
            </Checkbox>
          </Flex>
          <FullScreenCardContainer>
            {cards.map((card, index) => {
              return (
                <Flex
                  key={`${card.card_id ?? ""}-${index}`}
                  flexDirection="column"
                  gap={4}
                >
                  <Box
                    key={getCardUniqueId(card)}
                    m={1.5}
                    p={1}
                    sx={{
                      borderRadius: { base: "7px", sm: "12px", md: "15px" },
                      opacity:
                        cardsToKeep
                          .map((card) => card.idx)
                          .includes(card.idx) || cardsToKeep.length === 0
                          ? 1
                          : 0.5,
                      boxShadow: cardsToKeep
                        .map((card) => card.idx)
                        .includes(card.idx)
                        ? `0px 0px 15px 12px ${BLUE}`
                        : "none",
                      border: cardsToKeep
                        .map((card) => card.idx)
                        .includes(card.idx)
                        ? `2px solid ${BLUE_LIGHT}`
                        : "2px solid transparent",
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
                          setCardsToKeep([...cardsToKeep, card]);
                        }
                      }}
                    />
                  </Box>
                </Flex>
              );
            })}
          </FullScreenCardContainer>
          <Flex
            flexDirection={isSmallScreen ? "column" : "row"}
            justifyContent="space-between"
            mt={4}
            gap={4}
          >
            {currentSpecialCardsLenght > 0 ? (
              <Button
                variant="outline"
                fontSize={12}
                mx={{ base: 6, md: 0 }}
                onClick={() => {
                  navigate("/special-cards");
                }}
              >
                {t("store.packs.special-cards-btn")}
              </Button>
            ) : (
              <Box />
            )}
            {continueDisabled ? (
              <Tooltip label={t("store.packs.error-lbl")}>
                {continueButton}
              </Tooltip>
            ) : (
              continueButton
            )}
          </Flex>
        </Flex>
      ) : (
        <Loading />
      )}
      {confirmationModalOpen && (
        <ConfirmationModal
          close={() => setConfirmationModalOpen(false)}
          title={t("store.packs.confirmation-modal.head")}
          description={t("store.packs.confirmation-modal.description")}
          onConfirm={confirmSelectCards}
        />
      )}
      {!isSmallScreen && <PositionedDiscordLink />}
    </Background>
  );
};
