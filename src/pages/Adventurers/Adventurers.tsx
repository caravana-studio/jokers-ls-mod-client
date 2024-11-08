import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdventurers } from "../../api/useAdventurers";
import { Loading } from "../../components/Loading";
import { beep } from "../../constants/sfx";
import { getConsumedAdventurers } from "../../dojo/queries/getConsumedAdventurers";
import { useDojo } from "../../dojo/useDojo";
import { useGameActions } from "../../dojo/useGameActions";
import { useAudio } from "../../hooks/useAudio";
import { useGameContext } from "../../providers/GameProvider";
import { Adventurer } from "../../types/Adventurer";
import { AdventurerBox } from "./AdventurerBox";

export const Adventurers = () => {
  const { gameId, createNewLevel, setBlisterPackResult } = useGameContext();

  const {
    setup: { client },
  } = useDojo();
  const [selectedAdventurer, setSelectedAdventurer] = useState<
    Adventurer | undefined
  >();
  const { adventurers, isLoading } = useAdventurers();
  const { play: beepSound } = useAudio(beep);
  const [isSkipping, setIsSkipping] = useState(false);

  const toggleSelectedAdventurer = (adventurer: Adventurer) => {
    beepSound();
    setSelectedAdventurer((prev) =>
      prev === adventurer ? undefined : adventurer
    );
  };

  const [consumedAdventurers, setConsumedAdventurers] = useState<number[]>([]);

  const navigate = useNavigate();
  const { useAdventurer, skipAdventurer } = useGameActions();
  const ids = useMemo(() => {
    return adventurers?.map((adventurer) => adventurer.id);
  }, [adventurers]);

  useEffect(() => {
    if (ids?.length) {
      getConsumedAdventurers(client, ids).then((adventurers) => {
        setConsumedAdventurers(adventurers);
      });
    }
  }, [ids]);

  return (
    <>
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
          We've detected some completed Loot Survivor games on your account. You
          can use them to get a small boost in your current game. <br />
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
          adventurers
            .sort((a, b) => {
              const aConsumed = consumedAdventurers?.includes(a.id);
              const bConsumed = consumedAdventurers?.includes(b.id);

              if (aConsumed && !bConsumed) {
                return 1;
              } else if (!aConsumed && bConsumed) {
                return -1;
              }

              return b.id - a.id;
            })
            .map((adventurer) => {
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
          isDisabled={isLoading || isSkipping}
          width="300px"
          onClick={() => {
            setIsSkipping(true);
            beepSound();
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
          variant="secondarySolid"
        >
          Skip
        </Button>
        <Button
          width="300px"
          onClick={() => {
            setIsSkipping(true);
            beepSound();
            selectedAdventurer &&
              useAdventurer(gameId ?? 0, selectedAdventurer.id)
                .then((response) => {
                  if (response.length > 0) {
                    setBlisterPackResult(response);
                    navigate("/choose-adventurer-cards");
                  }
                })
                .catch(() => {
                  setIsSkipping(false);
                });
          }}
          isDisabled={selectedAdventurer === undefined}
        >
          Continue
        </Button>
      </Flex>
    </>
  );
};
