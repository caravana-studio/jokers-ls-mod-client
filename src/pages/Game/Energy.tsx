import { Flex } from "@chakra-ui/react";
import { LS_GREEN } from "../../theme/colors";
import { SkullIcon } from "./Skullcon";

export const Energy = () => {
  const maxEnergy = 3;
  const usedEnergy = 1;
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
