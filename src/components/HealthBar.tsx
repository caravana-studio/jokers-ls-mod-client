import { Box, Flex, Text } from "@chakra-ui/react";
import { ProgressBar } from "./CompactRoundData/ProgressBar";
import { LOGGED_USER } from "../constants/localStorage";
import { useGame } from "../dojo/queries/useGame";
import { useUsername } from "../dojo/utils/useUsername";

export const HealthBar = () => {
  const username = useUsername();

  const game = useGame();
  const maxHp = game?.player_hp ?? 0;
  const hp = game?.current_player_hp ?? 0;

  return (
    <Flex
      width="100%"
      direction="column"
      alignItems="flex-end"
      className="tutorial-beast-game-over"
    >
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
