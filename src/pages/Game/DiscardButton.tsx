import { Button, Flex, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useGameContext } from "../../providers/GameProvider";
import { useResponsiveValues } from "../../theme/responsiveSettings";
import { ButtonContainer } from "./ButtonContainer";
import { SkullIcon } from "./Skullcon";
import { useChallengePlayer } from "../../dojo/queries/useChallenge";
import { useGame } from "../../dojo/queries/useGame";
import { useBeastPlayer, useGameModeBeast } from "../../dojo/queries/useBeast";

interface DiscardButtonProps {
  highlight?: boolean;
}

export const DiscardButton = ({ highlight = false }: DiscardButtonProps) => {
  const { preSelectedCards, discard, preSelectionLocked } = useGameContext();

  const { mode } = useParams();

  const game = useGame();

  //TODO: draw all the skulls and make the skulls used darker
  //game?.max_hands;

  const challengePlayer = useChallengePlayer();
  const discards = challengePlayer?.discards ?? 0;

  const beastGameMode = useGameModeBeast();
  const cost_discard = beastGameMode?.cost_discard ?? 1;

  const beastPlayer = useBeastPlayer();
  const energyLeft = beastPlayer?.energy ?? 0;

  const hasDiscards = discards > 0 || energyLeft > 0;

  const cantDiscard =
    !highlight &&
    (preSelectionLocked || preSelectedCards?.length === 0 || !hasDiscards);

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
        {mode === "beast" ? (
          <Flex gap={3}>
            <Text fontFamily="Jersey" fontSize={"1.5rem"}>
              DISCARD
            </Text>
            {Array.from({ length: cost_discard }).map((_, index) => (
              <SkullIcon key={index} />
            ))}
          </Flex>
        ) : (
          <Text fontFamily="Jersey" fontSize={"1.5rem"}>
            DISCARD
          </Text>
        )}
      </Button>
      {mode === "beast" ? (
        <Button
          mt={2}
          width={["48%", "48%", "180px"]}
          onClick={() => {
            alert("not implemented yet");
          }}
          variant="defaultOutlineGlowLoot"
          boxShadow="none"
        >
          <Text fontFamily="Jersey" fontSize={"1.5rem"}>
            END TURN
          </Text>
        </Button>
      ) : (
        <Flex direction="row" align="center" gap={8}>
          {Array.from({ length: discards }).map((_, index) => (
            <SkullIcon key={index} />
          ))}
        </Flex>
      )}
    </ButtonContainer>
  );
};
