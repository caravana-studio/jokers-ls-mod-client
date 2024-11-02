import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Background } from "../../components/Background";
import { PositionedGameMenu } from "../../components/GameMenu";
import { Adventurer } from "../../types/Adventurer";
import { Collab } from "../Game/Collab";
import { AdventurerBox } from "./AdventurerBox";

export const adventurers: Adventurer[] = [
  {
    id: 1,
    name: "Thalrin the Brave",
    level: 3,
    gold: 50,
    dex: 4,
    vit: 6,
    cha: 2,
    str: 7,
    int: 3,
    wis: 2,
    luck: 5,
  },
  {
    id: 2,
    name: "Elara the Swift",
    level: 32,
    gold: 30,
    dex: 7,
    vit: 4,
    cha: 3,
    str: 5,
    int: 4,
    wis: 3,
    luck: 6,
  },
  {
    id: 3,
    name: "Gromm the Mighty",
    level: 5,
    gold: 75,
    dex: 3,
    vit: 8,
    cha: 1,
    str: 9,
    int: 2,
    wis: 2,
    luck: 4,
  },
  {
    id: 4,
    name: "Lirael the Wise",
    level: 4,
    gold: 60,
    dex: 2,
    vit: 5,
    cha: 4,
    str: 4,
    int: 8,
    wis: 7,
    luck: 3,
  },
  {
    id: 5,
    name: "Orin the Cunning",
    level: 40,
    gold: 45,
    dex: 6,
    vit: 50,
    cha: 5,
    str: 4,
    int: 7,
    wis: 4,
    luck: 6,
  },
  {
    id: 6,
    name: "Mira the Shadow",
    level: 40,
    gold: 25,
    dex: 8,
    vit: 20,
    cha: 3,
    str: 3,
    int: 5,
    wis: 3,
    luck: 7,
  },
  {
    id: 7,
    name: "Borak the Strong",
    level: 12,
    gold: 80,
    dex: 2,
    vit: 20,
    cha: 1,
    str: 10,
    int: 2,
    wis: 2,
    luck: 3,
  },
  {
    id: 8,
    name: "Selene the Mystic",
    level: 18,
    gold: 55,
    dex: 3,
    vit: 15,
    cha: 6,
    str: 3,
    int: 8,
    wis: 6,
    luck: 4,
  },
  {
    id: 9,
    name: "Darak the Fierce",
    level: 3,
    gold: 40,
    dex: 4,
    vit: 7,
    cha: 2,
    str: 6,
    int: 3,
    wis: 2,
    luck: 5,
  },
  {
    id: 10,
    name: "Nyssa the Silent",
    level: 2,
    gold: 20,
    dex: 9,
    vit: 2,
    cha: 3,
    str: 2,
    int: 5,
    wis: 3,
    luck: 6,
  },
  {
    id: 11,
    name: "Jarek the Just",
    level: 4,
    gold: 65,
    dex: 3,
    vit: 6,
    cha: 5,
    str: 5,
    int: 4,
    wis: 7,
    luck: 4,
  },
  {
    id: 12,
    name: "Fina the Flame",
    level: 3,
    gold: 35,
    dex: 5,
    vit: 5,
    cha: 4,
    str: 6,
    int: 3,
    wis: 5,
    luck: 5,
  },
  {
    id: 13,
    name: "Rurik the Bold",
    level: 5,
    gold: 90,
    dex: 2,
    vit: 8,
    cha: 2,
    str: 9,
    int: 2,
    wis: 3,
    luck: 4,
  },
  {
    id: 14,
    name: "Kaela the Keen",
    level: 2,
    gold: 30,
    dex: 7,
    vit: 3,
    cha: 4,
    str: 4,
    int: 6,
    wis: 4,
    luck: 6,
  },
];

export const AdventurersPage = () => {
  const [selectedAdventurer, setSelectedAdventurer] = useState<
    Adventurer | undefined
  >();
  const toggleSelectedAdventurer = (adventurer: Adventurer) => {
    setSelectedAdventurer((prev) =>
      prev === adventurer ? undefined : adventurer
    );
  };
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
          {adventurers.map((adventurer) => {
            return (
              <AdventurerBox
                onClick={() => toggleSelectedAdventurer(adventurer)}
                otherIsSelected={
                  selectedAdventurer && selectedAdventurer.id !== adventurer.id
                }
                isSelected={selectedAdventurer?.id === adventurer.id}
                adventurer={adventurer}
              />
            );
          })}
        </Flex>
        <Flex justifyContent={"center"} my={4} gap={12}>
          <Button width="300px" onClick={() => {}} variant="secondarySolid">
            Skip
          </Button>
          <Button width="300px" onClick={() => {}} isDisabled={true}>
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
