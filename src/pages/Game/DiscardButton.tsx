import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useGameContext } from "../../providers/GameProvider";
import { useResponsiveValues } from "../../theme/responsiveSettings";
import { ButtonContainer } from "./ButtonContainer";

interface DiscardButtonProps {
  highlight?: boolean;
}

export const DiscardButton = ({ highlight = false }: DiscardButtonProps) => {
  const { preSelectedCards, discard, preSelectionLocked, discards } =
    useGameContext();

  const cantDiscard =
    !highlight &&
    (preSelectionLocked ||
      preSelectedCards?.length === 0 ||
      !discards ||
      discards === 0);

  const { t } = useTranslation(["game"]);
  const { isSmallScreen } = useResponsiveValues();

  return (
    <ButtonContainer>
      <Button
        width={["48%", "48%", "150px"]}
        onClick={() => {
          discard();
        }}
        variant={cantDiscard ? "defaultOutline" : "solid"}
        isDisabled={cantDiscard}
        className="game-tutorial-step-3"
      >
        {isSmallScreen ? (
          <Box>
            <Text fontFamily="Jersey" fontSize={16} height={"16px"}>
              {t("game.preselected-cards-section.discard-btn-lbl.discard")}
            </Text>
            <Heading mt={1} fontSize={9}>
              {t("game.preselected-cards-section.discard-btn-lbl.left", {
                discards: discards,
              })}
            </Heading>
          </Box>
        ) : (
          t(
            "game.preselected-cards-section.discard-btn-lbl.discard"
          ).toUpperCase()
        )}
      </Button>
      {!isSmallScreen && (
        <Text size="l" textAlign={"center"}>
          {t("game.preselected-cards-section.discard-btn-lbl.left", {
            discards: discards,
          })}
        </Text>
      )}
    </ButtonContainer>
  );
};
