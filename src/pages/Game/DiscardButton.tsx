import { Button, Flex, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useGameContext } from "../../providers/GameProvider";
import { ButtonContainer } from "./ButtonContainer";
import { SkullIcon } from "./Skullcon";

interface DiscardButtonProps {
  highlight?: boolean;
}

export const DiscardButton = ({ highlight = false }: DiscardButtonProps) => {
  const {
    preSelectedCards,
    discard,
    preSelectionLocked,
    executeEndTurn,
    specialCards,
    energyLeft,
    discardsLeft,
  } = useGameContext();

  const { mode } = useParams();

  const hasIncreasePlaysAndDiscardsSpecialCard = !!specialCards.find(
    (card) => card.card_id === 315
  );
  const maxDiscards = hasIncreasePlaysAndDiscardsSpecialCard ? 6 : 5;

  const discardCost = 1;

  const hasDiscards = mode === "beast" ? energyLeft > 0 : discardsLeft > 0;

  const cantDiscard =
    !highlight &&
    (preSelectionLocked || preSelectedCards?.length === 0 || !hasDiscards);

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
            {Array.from({ length: discardCost }).map((_, index) => (
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
            executeEndTurn();
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
          {Array.from({ length: maxDiscards }).map((_, index) => (
            <SkullIcon key={index} used={index >= discardsLeft} />
          ))}
        </Flex>
      )}
    </ButtonContainer>
  );
};
