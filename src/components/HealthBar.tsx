import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useUsername } from "../dojo/utils/useUsername";
import { useGameContext } from "../providers/GameProvider";
import { ProgressBar } from "./CompactRoundData/ProgressBar";

export const HealthBar = () => {
  const username = useUsername();

  const { game, attackAnimation, fetchGame } = useGameContext();

  const [maxHp, setMaxHp] = useState(game?.player_hp ?? 0);
  const [hp, setHp] = useState(game?.current_player_hp ?? 0);

  // hack to refetch player HP when attackAnimation changes
  useEffect(() => {
    if (attackAnimation) {
      fetchGame().then((game) => {
        if (game) {
          setMaxHp(game.player_hp);
          setHp(game.current_player_hp);
        }
      });
    }
  }, [attackAnimation]);

  useEffect(() => {
    if (game) {
      game.player_hp && setMaxHp(game.player_hp);
      game.current_player_hp && setHp(game.current_player_hp);
    }
  }, [game]);

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
          {hp.valueOf()} / {maxHp.valueOf()}
        </Text>
      </Flex>
      <Box width="400px">
        <ProgressBar progress={(hp.valueOf() / maxHp.valueOf()) * 100} />
      </Box>
    </Flex>
  );
};
