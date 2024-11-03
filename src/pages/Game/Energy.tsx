import { Flex } from "@chakra-ui/react";
import { LS_GREEN } from "../../theme/colors";
import { SkullIcon } from "./Skullcon";
import { useBeastPlayer, useGameModeBeast } from "../../dojo/queries/useBeast";

export const Energy = () => {
  const beastGameMode = useGameModeBeast();
  const playerBeast = useBeastPlayer();

  const maxEnergy = beastGameMode?.energy_max_player ?? 0;
  const usedEnergy = maxEnergy - (playerBeast?.energy ?? 0);

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
