import { Button, Flex, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useGameContext } from "../../providers/GameProvider";
import { useResponsiveValues } from "../../theme/responsiveSettings";
import { ButtonContainer } from "./ButtonContainer";
import { SkullIcon } from "./Skullcon";
import { useChallengePlayer } from "../../dojo/queries/useChallenge";

interface DiscardButtonProps {
  highlight?: boolean;
}

export const DiscardButton = ({ highlight = false }: DiscardButtonProps) => {
  const { preSelectedCards, discard, preSelectionLocked } = useGameContext();

  const { mode } = useParams();

  const challengePlayer = useChallengePlayer();
  const discards = challengePlayer?.discards ?? 0;

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
            <SkullIcon />
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
