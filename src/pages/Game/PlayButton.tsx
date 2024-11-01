import { Button, Flex, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useGameContext } from "../../providers/GameProvider";
import { LS_GREEN } from "../../theme/colors";
import { useResponsiveValues } from "../../theme/responsiveSettings";
import { ButtonContainer } from "./ButtonContainer";
import { SkullIcon } from "./Skullcon";
import { useChallengePlayer } from "../../dojo/queries/useChallenge";
import { useGame } from "../../dojo/queries/useGame";

interface PlayButtonProps {
  highlight?: boolean;
}

export const PlayButton = ({ highlight = false }: PlayButtonProps) => {
  const { preSelectedCards, play, preSelectionLocked } = useGameContext();
  const { mode } = useParams();
  const game = useGame();

  //TODO: draw all the skulls and make the skulls used darker
  //game?.max_hands;

  const challengePlayer = useChallengePlayer();
  const handsLeft = challengePlayer?.plays ?? 0;

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
        width={["48%", "48%", "180px"]}
        onClick={(e) => {
          e.stopPropagation();
          play();
        }}
        variant={cantPlay ? "defaultOutlineLoot" : "defaultGreenOutlineGlow"}
        isDisabled={cantPlay}
        className="game-tutorial-step-4"
      >
        {mode === "beast" ? (
          <Flex gap={3}>
            <Text fontFamily="Jersey" color={LS_GREEN} fontSize={"1.5rem"}>
              PLAY
            </Text>
            <SkullIcon color={LS_GREEN} />
            <SkullIcon color={LS_GREEN} />
          </Flex>
        ) : (
          <Text fontFamily="Jersey" color={LS_GREEN} fontSize={"1.5rem"}>
            PLAY
          </Text>
        )}
      </Button>
      {mode !== "beast" && (
        <Flex direction="row" align="center" gap={8}>
          {Array.from({ length: handsLeft }).map((_, index) => (
            <SkullIcon key={index} color={LS_GREEN} />
          ))}
        </Flex>
      )}
    </ButtonContainer>
  );
};
