import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useRound } from "../../dojo/queries/useRound";
import { useGameContext } from "../../providers/GameProvider";
import { ButtonContainer } from "./ButtonContainer";
import { useTranslation } from "react-i18next";
import { useResponsiveValues } from "../../theme/responsiveSettings";

interface PlayButtonProps {
  highlight?: boolean;
}

export const PlayButton = ({ highlight = false }: PlayButtonProps) => {
  const { preSelectedCards, play, preSelectionLocked } = useGameContext();

  const round = useRound();
  const handsLeft = round?.hands ?? 0;

  const cantPlay =
    !highlight &&
    (preSelectionLocked ||
      preSelectedCards?.length === 0 ||
      !handsLeft ||
      handsLeft === 0);
  const { t } = useTranslation(["game"]);
  const { isSmallScreen } = useResponsiveValues();

  return (
    <ButtonContainer>
      <Button
        width={["48%", "48%", "150px"]}
        onClick={(e) => {
          e.stopPropagation();
          play();
        }}
        variant={cantPlay ? "defaultOutline" : "secondarySolid"}
        isDisabled={cantPlay}
        className="game-tutorial-step-4"
      >
        {isSmallScreen ? (
          <Box>
            <Text fontFamily="Orbitron" fontSize={16} height={"16px"}>
              {t("game.preselected-cards-section.play-btn-lbl.play-mobile")}
            </Text>
            <Heading mt={1} fontSize={9}>
              {t("game.preselected-cards-section.play-btn-lbl.left", {
                handsLeft: handsLeft,
              })}
            </Heading>
          </Box>
        ) : (
          t("game.preselected-cards-section.play-btn-lbl.play")
        )}
      </Button>
      {!isSmallScreen && (
        <Text size="l" textAlign={"center"}>
          {t("game.preselected-cards-section.play-btn-lbl.left", {
            handsLeft: handsLeft,
          })}
        </Text>
      )}
    </ButtonContainer>
  );
};
