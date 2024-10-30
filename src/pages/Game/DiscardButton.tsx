import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useGameContext } from "../../providers/GameProvider";
import { useResponsiveValues } from "../../theme/responsiveSettings";
import { ButtonContainer } from "./ButtonContainer";
import { SkullIcon } from "./Skullcon";

interface DiscardButtonProps {
  highlight?: boolean;
}

export const DiscardButton = ({ highlight = false }: DiscardButtonProps) => {
  const { preSelectedCards, discard, preSelectionLocked } = useGameContext();

  //   const cantDiscard =
  //     !highlight &&
  //     (preSelectionLocked ||
  //       preSelectedCards?.length === 0 ||
  //       !discards ||
  //       discards === 0);

  const cantDiscard = false;
  const discards = 3;

  const { t } = useTranslation(["game"]);
  const { isSmallScreen } = useResponsiveValues();

  return (
    <ButtonContainer>
      <Button
        width={["48%", "48%", "180px"]}
        onClick={() => {
          discard();
        }}
        variant={cantDiscard ? "defaultOutlineLoot" : "defaultOutlineGlowLoot"}
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
          // t(
          //   "game.preselected-cards-section.discard-btn-lbl.discard"
          // ).toUpperCase()
          <Text fontFamily="Jersey" fontSize={"1.5rem"}>
            DISCARD
          </Text>
        )}
      </Button>
      {!isSmallScreen && (
        <Flex direction="row" align="center" gap={8}>
          {Array.from({ length: discards }).map((_, index) => (
            <SkullIcon key={index} />
          ))}
        </Flex>
      )}
    </ButtonContainer>
  );
};
