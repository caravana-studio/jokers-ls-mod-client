import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useRound } from "../../dojo/queries/useRound";
import { useGameContext } from "../../providers/GameProvider";
import { ButtonContainer } from "./ButtonContainer";
import { useTranslation } from "react-i18next";
import { useResponsiveValues } from "../../theme/responsiveSettings";
import { SkullIcon } from "./Skullcon";
import { LS_GREEN } from "../../theme/colors";

interface PlayButtonProps {
  highlight?: boolean;
}

export const PlayButton = ({ highlight = false }: PlayButtonProps) => {
  const { preSelectedCards, play, preSelectionLocked } = useGameContext();

  const round = useRound();
  // const handsLeft = round?.hands ?? 0;

  // const cantPlay =
  //   !highlight &&
  //   (preSelectionLocked ||
  //     preSelectedCards?.length === 0 ||
  //     !handsLeft ||
  //     handsLeft === 0);
  const { t } = useTranslation(["game"]);
  const { isSmallScreen } = useResponsiveValues();
  const cantPlay = false;
  const handsLeft = 3;

  return (
    <ButtonContainer>
      <Button
        width={["48%", "48%", "180px"]}
        onClick={(e) => {
          e.stopPropagation();
          play();
        }}
        variant={cantPlay ? "defaultOutlineLoot" : "defaultGreenOutlineGlow"}
        isDisabled={cantPlay}
        className="game-tutorial-step-4"
      >
        {isSmallScreen ? (
          <Box>
            <Text fontFamily="Jersey" fontSize={16} height={"16px"}>
              {t("game.preselected-cards-section.play-btn-lbl.play-mobile")}
            </Text>
            <Heading mt={1} fontSize={9}>
              {t("game.preselected-cards-section.play-btn-lbl.left", {
                handsLeft: handsLeft,
              })}
            </Heading>
          </Box>
        ) : (
          <Text fontFamily="Jersey" color={LS_GREEN} fontSize={"1.5rem"}>
            PLAY
            {/* {t("game.preselected-cards-section.play-btn-lbl.play-mobile")} */}
          </Text>
        )}
      </Button>
      {!isSmallScreen && (
        <Flex direction="row" align="center" gap={8}>
          {Array.from({ length: handsLeft }).map((_, index) => (
            <SkullIcon key={index} color={LS_GREEN} />
          ))}
        </Flex>
      )}
    </ButtonContainer>
  );
};
