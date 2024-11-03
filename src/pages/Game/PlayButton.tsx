import { Button, Flex, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useGameContext } from "../../providers/GameProvider";
import { LS_GREEN } from "../../theme/colors";
import { ButtonContainer } from "./ButtonContainer";
import { SkullIcon } from "./Skullcon";

interface PlayButtonProps {
  highlight?: boolean;
}

export const PlayButton = ({ highlight = false }: PlayButtonProps) => {
  const {
    preSelectedCards,
    play,
    preSelectionLocked,
    playsLeft,
    specialCards,
    energyLeft,
  } = useGameContext();
  const { mode } = useParams();

  const hasIncreasePlaysAndDiscardsSpecialCard = !!specialCards.find(
    (card) => card.card_id === 315
  );
  const maxPlays = hasIncreasePlaysAndDiscardsSpecialCard ? 6 : 5;

  const playCost = 2;

  const hasHands = mode === "beast" ? energyLeft >= 2 : playsLeft > 0;

  const cantPlay =
    !highlight &&
    (preSelectionLocked || preSelectedCards?.length === 0 || !hasHands);

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
            {Array.from({ length: playCost }).map((_, index) => (
              <SkullIcon key={index} color={LS_GREEN} />
            ))}
          </Flex>
        ) : (
          <Text fontFamily="Jersey" color={LS_GREEN} fontSize={"1.5rem"}>
            PLAY
          </Text>
        )}
      </Button>
      {mode !== "beast" && (
        <Flex direction="row" align="center" gap={8}>
          {Array.from({ length: maxPlays }).map((_, index) => (
            <SkullIcon key={index} color={LS_GREEN} used={index >= playsLeft} />
          ))}
        </Flex>
      )}
    </ButtonContainer>
  );
};
