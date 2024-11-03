import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGame } from "../dojo/queries/useGame";
import { useGameContext } from "../providers/GameProvider.tsx";
import { Card } from "../types/Card.ts";
import { ConfirmationModal } from "./ConfirmationModal.tsx";
import { SpecialCardsRow } from "./SpecialCardsRow.tsx";

interface SpecialCardsProps {
  inStore?: boolean;
}

export const SpecialCards = ({ inStore = false }: SpecialCardsProps) => {
  const game = useGame();
  const { t } = useTranslation(["game"]);

  const {
    discardSpecialCard,
    specialCards,
    refetchSpecialCards,
    removeSpecialCard,
  } = useGameContext();
  const [preselectedCard, setPreselectedCard] = useState<Card | undefined>();
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  useEffect(() => {
    if (
      game?.len_current_special_cards &&
      game?.len_current_special_cards > 0 &&
      specialCards.length === 0
    ) {
      refetchSpecialCards();
    }
  }, [game, specialCards]);

  return (
    <Box className="special-cards-step-3">
      <Flex justifyContent="space-around" flexDir={"column"}>
        <SpecialCardsRow cards={specialCards} />
        <Box mt={2}>
          {!inStore && (
            <Text fontSize={"1.3rem"}>
              Special cards ({specialCards.length}/5)
            </Text>
          )}
        </Box>
      </Flex>
      {confirmationModalOpen && (
        <ConfirmationModal
          close={() => setConfirmationModalOpen(false)}
          title={t("game.special-cards.confirmation-modal.title")}
          description={t("game.special-cards.confirmation-modal.description")}
          onConfirm={() => {
            setConfirmationModalOpen(false);
            preselectedCard &&
              discardSpecialCard(preselectedCard.idx).then((response) => {
                if (response) {
                  preselectedCard?.card_id &&
                    removeSpecialCard(preselectedCard.card_id);
                  setPreselectedCard(undefined);
                }
              });
          }}
        />
      )}
      {inStore && (
        <Flex mt={4} justifyContent="flex-end">
          <Button
            variant={preselectedCard === undefined ? "defaultOutline" : "solid"}
            isDisabled={preselectedCard === undefined}
            width={{ base: "100%", md: "30%" }}
            fontSize={12}
            onClick={() => {
              {
                setConfirmationModalOpen(true);
              }
            }}
          >
            {t("game.special-cards.remove-special-cards-label")}
          </Button>
        </Flex>
      )}
    </Box>
  );
};
