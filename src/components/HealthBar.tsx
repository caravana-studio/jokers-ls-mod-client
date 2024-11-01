import { Box, Flex, Text } from "@chakra-ui/react";
import { ProgressBar } from "./CompactRoundData/ProgressBar";
import { LOGGED_USER } from "../constants/localStorage";
import { useGame } from "../dojo/queries/useGame";

export const HealthBar = () => {
  const username = localStorage.getItem(LOGGED_USER);

  const game = useGame();
  const maxHp = game?.player_hp ?? 0;
  const hp = game?.current_player_hp ?? 0;

  console.log((hp.valueOf() / maxHp.valueOf()) * 100);

  return (
    <Flex width="100%" direction="column" alignItems="flex-end">
      <Flex width="100%" justifyContent="space-between">
        <Text color="white" fontWeight="bold" fontSize={"1.5rem"}>
          {username}
        </Text>
        <Text color="white" fontWeight="bold" fontSize={"1.5rem"}>
          {hp}
        </Text>
      </Flex>
      <Box width="400px">
        <ProgressBar progress={(hp.valueOf() / maxHp.valueOf()) * 100} />
      </Box>
    </Flex>
  );
};
