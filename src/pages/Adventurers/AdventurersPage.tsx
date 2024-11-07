import { Box, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAdventurers } from "../../api/useAdventurers";
import { Background } from "../../components/Background";
import { PositionedGameMenu } from "../../components/GameMenu";
import { Loading } from "../../components/Loading";
import { useGameContext } from "../../providers/GameProvider";
import { Lsxjon } from "../Game/Lsxjon";
import { Adventurers } from "./Adventurers";
import { NoAdventurers } from "./NoAdventurers";

export const AdventurersPage = () => {
  const { redirectBasedOnGameState, lockRedirection, game } = useGameContext();
  const { adventurers, isLoading } = useAdventurers();

  useEffect(() => {
    redirectBasedOnGameState();
  }, [game?.state, lockRedirection]);

  return (
    <Background bgDecoration type="skulls">
      <Flex
        height="100%"
        width="100%"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
      >
        <PositionedGameMenu decoratedPage />
        {isLoading ? (
          <Loading />
        ) : adventurers.length > 0 ? (
          <Adventurers />
        ) : (
          <NoAdventurers />
        )}
        <Box position={"fixed"} left={"80px"} top={12}>
          <Lsxjon />
        </Box>
      </Flex>
    </Background>
  );
};
