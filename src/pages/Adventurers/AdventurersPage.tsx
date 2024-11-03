import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdventurers } from "../../api/useAdventurers";
import { Background } from "../../components/Background";
import { PositionedGameMenu } from "../../components/GameMenu";
import { Loading } from "../../components/Loading";
import { useConsumedAdventurers } from "../../dojo/queries/useConsumedAdventurers";
import { useGame } from "../../dojo/queries/useGame";
import { useDojo } from "../../dojo/useDojo";
import { useGameActions } from "../../dojo/useGameActions";
import { useGameContext } from "../../providers/GameProvider";
import { Adventurer } from "../../types/Adventurer";
import { Collab } from "../Game/Collab";
import { AdventurerBox } from "./AdventurerBox";

export const AdventurersPage = () => {
  const [selectedAdventurer, setSelectedAdventurer] = useState<
    Adventurer | undefined
  >();
  const { adventurers, isLoading } = useAdventurers();

  const toggleSelectedAdventurer = (adventurer: Adventurer) => {
    setSelectedAdventurer((prev) =>
      prev === adventurer ? undefined : adventurer
    );
  };
  const {
    setup: { masterAccount },
    account: { account },
  } = useDojo();

  const navigate = useNavigate();

  const {
    checkOrCreateGame,
    selectDeckType,
    gameLoading,
    error,
    gameId,
    redirectBasedOnGameState,
    lockRedirection,
    createNewLevel,
  } = useGameContext();

  const { useAdventurer, skipAdventurer } = useGameActions();

  const consumedAdventurers = useConsumedAdventurers();

  const game = useGame();

  useEffect(() => {
    if (account !== masterAccount) {
      checkOrCreateGame();
    }
  }, [account, masterAccount]);

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
        <Box w="100%">
          <Heading size={"xxl"} textAlign={"center"} variant="neonGreen">
            - Dead adventurers -
          </Heading>
          <Text
            size={"l"}
            width={"80%"}
            margin={"0 auto"}
            textAlign={"center"}
            lineHeight={1}
          >
            We've detected some completed Loot Survivor games on your account.
            You can use them to get a small boost in your current game. <br />
            <br />
            Dead adventurers grant you extra health points and card selection
            options. The higher level your fallen adventurer has, the more
            selection options you'll get. But choose carefully, as you can only
            use your adventurer once.
          </Text>
        </Box>
        <Heading size={"xl"} textAlign={"center"} variant="neonGreen" my={2}>
          Select the adventurer you want to use
        </Heading>
        <Flex
          flexGrow={1}
          backgroundColor={"black"}
          w="90%"
          justifyContent={"center"}
          flexWrap={"wrap"}
          overflowY={"auto"}
        >
          {isLoading ? (
            <Loading />
          ) : (
            adventurers.map((adventurer) => {
              return (
                <AdventurerBox
                  key={adventurer.id}
                  onClick={() => toggleSelectedAdventurer(adventurer)}
                  otherIsSelected={
                    selectedAdventurer &&
                    selectedAdventurer.id !== adventurer.id
                  }
                  isSelected={selectedAdventurer?.id === adventurer.id}
                  adventurer={adventurer}
                  consumed={consumedAdventurers?.includes(adventurer.id)}
                />
              );
            })
          )}
        </Flex>
        <Flex justifyContent={"center"} my={4} gap={12}>
          <Button
            width="300px"
            onClick={() => {
              skipAdventurer(gameId ?? 0).then((response) => {
                if (response) {
                  createNewLevel();
                }
              });
            }}
            variant="secondarySolid"
          >
            Skip
          </Button>
          <Button
            width="300px"
            onClick={() => {
              selectedAdventurer &&
                useAdventurer(gameId ?? 0, selectedAdventurer.id).then(
                  (response) => {
                    if (response) {
                      navigate("/choose-adventurer-cards");
                    }
                  }
                );
            }}
            isDisabled={selectedAdventurer === undefined}
          >
            Continue
          </Button>
        </Flex>
        <Box position={"fixed"} left={"80px"} top={12}>
          <Collab />
        </Box>
      </Flex>
    </Background>
  );
};
