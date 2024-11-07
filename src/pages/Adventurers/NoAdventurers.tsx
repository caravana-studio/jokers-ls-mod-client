import { Button, Flex, HStack, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useGameActions } from "../../dojo/useGameActions";
import { useGameContext } from "../../providers/GameProvider";
import { useState } from "react";
import { useAdventurers } from "../../api/useAdventurers";
import { useAudio } from "../../hooks/useAudio";
import { beep } from "../../constants/sfx";

export const NoAdventurers = () => {
  const { gameId, createNewLevel } = useGameContext();
  const { skipAdventurer } = useGameActions();
  const navigate = useNavigate();
  const { play: beepSound } = useAudio(beep);
  const [isSkipping, setIsSkipping] = useState(false);

  return (
    <Flex
      flexGrow={1}
      flexDirection={"column"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Flex flexDir={"column"} gap={8}>
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
          Completed Loot Survivor games can give you a small boost in your
          current game, such as extra health points and card selection options.
          <br />
          The higher level your fallen adventurer has, the more selection
          options you'll get.
        </Text>
      </Flex>
      <Flex flexDir={"column"} gap={8}>
        <Heading color={"white"} size={"l"}>
          We couldn't find any completed Loot Survivor games in your account.
        </Heading>
        <HStack gap={12}>
          <Heading my={14} color={"white"} size={"l"}>
            Do you want to play to die?
          </Heading>
          <Button
            variant="outlineWhiteGreenGlowLoot"
            onClick={() => window.open("https://lootsurvivor.io/", "_blank")}
          >
            Play Loot Survivor
          </Button>
        </HStack>
      </Flex>
      <Flex justifyContent={"center"} my={4} gap={12}>
        <Button
          isDisabled={isSkipping}
          width="300px"
          onClick={() => {
            beepSound();
            setIsSkipping(true);
            skipAdventurer(gameId ?? 0)
              .then((response) => {
                if (response) {
                  createNewLevel();
                }
              })
              .catch(() => {
                setIsSkipping(false);
              });
          }}
          variant="outlineWhiteGreenGlowLoot"
        >
          Skip
        </Button>
      </Flex>
    </Flex>
  );
};
