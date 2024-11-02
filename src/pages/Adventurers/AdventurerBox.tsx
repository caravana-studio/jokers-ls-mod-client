import { Divider, Flex, Heading, Text } from "@chakra-ui/react";
import CachedImage from "../../components/CachedImage";
import { LS_GREEN } from "../../theme/colors";
import { Adventurer } from "../../types/Adventurer";

interface AdventurerBoxProps {
  adventurer: Adventurer;
  onClick: () => void;
  isSelected: boolean;
  otherIsSelected?: boolean;
}

export const AdventurerBox = ({
  adventurer,
  onClick,
  isSelected,
  otherIsSelected,
}: AdventurerBoxProps) => {
  const amountOfCardsToPick = Math.max(1, Math.round(adventurer.level / 10));
  const amountOfCardsToSelectFrom = Math.max(
    2,
    Math.round(adventurer.level / 3)
  );
  return (
    <Flex
      onClick={onClick}
      width="30%"
      bg="black"
      borderRadius="30px"
      border="1px solid white"
      m={4}
      cursor={"pointer"}
      boxShadow={isSelected ? `0px 0px 15px 5px ${LS_GREEN}` : "none"}
      opacity={otherIsSelected ? 0.5 : 1}
    >
      <Flex width="60%" flexDirection="column" justifyContent='center' px={8}>
        <Flex gap={6} w="100%">
          <CachedImage
            src="/logos/skull.png"
            width="35px"
            height="55px"
            mt={2}
          />
          <Flex w="100%" flexDirection={"column"}>
            <Flex
              w="100%"
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Text color="lsGreen" fontSize="30px">
                #{adventurer.id}
              </Text>
              <Text color="lsGreen" fontSize="25px" fontWeight="bold">
                LVL: {adventurer.level}
              </Text>
            </Flex>
            <Text color="lsGreen" fontSize="lg" mb={4}>
              {adventurer.name.toUpperCase()}
            </Text>
          </Flex>
        </Flex>
        <Flex justifyContent={"space-between"}>
          <Flex flexDirection={"column"} gap={2}>
            <Text color="lsGreen">{adventurer.gold} GOLD</Text>
            <Text color="lsGreen">{adventurer.dex} DEX</Text>
          </Flex>
          <Flex flexDirection={"column"} gap={2}>
            <Text color="lsGreen">{adventurer.vit} VIT</Text>
            <Text color="lsGreen">{adventurer.cha} CHA</Text>
          </Flex>
          <Flex flexDirection={"column"} gap={2}>
            <Text color="lsGreen">{adventurer.str} STR</Text>
            <Text color="lsGreen">{adventurer.int} INT</Text>
          </Flex>
          <Flex flexDirection={"column"} gap={2}>
            <Text color="lsGreen">{adventurer.wis} WIS</Text>
            <Text color="lsGreen">{adventurer.luck} LUCK</Text>
          </Flex>
        </Flex>
      </Flex>
      <Divider borderColor="white" orientation="vertical" />
      <Flex
        width="40%"
        direction="column"
        align="center"
        p={4}
        gap={4}
        justifyContent="center"
      >
        <Heading size="xl" color="white">
          +{adventurer.vit * 5} HP
        </Heading>
        <Heading size="m" color="white" textAlign="center">
          Select {amountOfCardsToPick} cards from a total of{" "}
          {amountOfCardsToSelectFrom} available
        </Heading>
      </Flex>
    </Flex>
  );
};
