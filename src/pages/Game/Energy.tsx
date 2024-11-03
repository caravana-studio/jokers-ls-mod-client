import { Flex } from "@chakra-ui/react";
import { useGameContext } from "../../providers/GameProvider";
import { LS_GREEN } from "../../theme/colors";
import { SkullIcon } from "./Skullcon";

export const Energy = () => {
  const { energyLeft, specialCards } = useGameContext();
  const hasIncreasePlaysAndDiscardsSpecialCard = !!specialCards.find(
    (card) => card.card_id === 315
  );
  const maxEnergy = hasIncreasePlaysAndDiscardsSpecialCard ? 4 : 3;
  const usedEnergy = maxEnergy - energyLeft;

  return (
    <Flex
      direction="row"
      align="center"
      gap={8}
      px={8}
      py={4}
      border="1px solid white"
      borderRadius="15px"
      width="max-content"
      mt={3}
      className="tutorial-beast-energy"
    >
      {Array.from({ length: maxEnergy }).map((_, index) => (
        <SkullIcon
          key={index}
          color={LS_GREEN}
          size="20px"
          used={index >= maxEnergy - usedEnergy}
        />
      ))}
    </Flex>
  );
};
