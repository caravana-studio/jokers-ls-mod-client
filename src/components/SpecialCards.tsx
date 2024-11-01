import { Box, Button, Flex, Text, useTheme } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useGame } from "../dojo/queries/useGame";
import { useGameContext } from "../providers/GameProvider.tsx";
import { Card } from "../types/Card.ts";
import { ConfirmationModal } from "./ConfirmationModal.tsx";
import { useResponsiveValues } from "../theme/responsiveSettings.tsx";
import { SpecialCardsRow } from "./SpecialCardsRow.tsx";
import { LS_GREEN } from "../theme/colors.tsx";

interface SpecialCardsProps {
  inStore?: boolean;
}

export const SpecialCards = ({ inStore = false }: SpecialCardsProps) => {
  const { colors } = useTheme();
  const game = useGame();
  const maxLength = game?.len_max_current_special_cards ?? 5;
  const { t } = useTranslation(["game"]);

  const { discardSpecialCard, specialCards, isRageRound, rageCards } =
    useGameContext();
  const [discardedCards, setDiscardedCards] = useState<Card[]>([]);
  const [preselectedCard, setPreselectedCard] = useState<Card | undefined>();
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const { cardScale } = useResponsiveValues();

  return (
    <Box className="special-cards-step-3">
      <Flex justifyContent="space-around" flexDir={"column"}>
        <SpecialCardsRow cards={specialCards} />
        <Box mt={2}>
          {!inStore && (
            <Text fontSize={"1.3rem"}>
              Special cards (0/5)
              {/* {t("game.special-cards.special-cards-label")} */}
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
                  setDiscardedCards((prev) => [...prev, preselectedCard]);
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
