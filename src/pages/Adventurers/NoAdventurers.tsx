import { Box, Button, Flex, HStack, Heading, Text } from "@chakra-ui/react";
import { useGameContext } from "../../providers/GameProvider";
import { useGameActions } from "../../dojo/useGameActions";

export const NoAdventurers = () => {
  const { gameId, createNewLevel } = useGameContext();
  const { skipAdventurer } = useGameActions();

  return (
    <>
      <Flex
        w="100%"
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Heading size={"xxl"} textAlign={"center"} variant="neonGreen">
          - Dead adventurers -
        </Heading>
        <Text
          size={"l"}
          width={"80%"}
          margin={"0 auto"}
          textAlign={"center"}
          lineHeight={1}
          my={16}
        >
          Completed Loot Survivor games can give you a small boost in your
          current game, such as extra health points and card selection options.
          <br />
          The higher level your fallen adventurer has, the more selection
          options you'll get.
        </Text>
        <Heading color={"white"} size={"l"}>
          We couldn't find any completed Loot Survivor games in your account.
        </Heading>
        <HStack gap={12}>
          <Heading my={14} color={"white"} size={"l"}>
            Do you want to play to die?
          </Heading>
          <Button variant="secondarySolid">Play Loot Survivor</Button>
        </HStack>
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
      </Flex>
    </>
  );
};
