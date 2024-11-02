import { Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { useContractRead } from "@starknet-react/core";
import CachedImage from "../../components/CachedImage";
import { Loading } from "../../components/Loading.tsx";
import { LS_GREEN } from "../../theme/colors";
import { Adventurer } from "../../types/Adventurer";
import { abi } from "./abi.ts";

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
  const { data, error, isLoading } = useContractRead({
    abi,
    functionName: "get_adventurer",
    address:
      "0x033150a5c88087a5944b887f6ece3bb0329d3d844ca632e44039ab9f1edb32a8",
    args: [adventurer.id],
  });

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading adventurer</div>;

  const level = Number((data as any)?.level ?? 1);

  const amountOfCardsToPick = Math.min(4, Math.max(1, Math.floor(level / 10)));
  const amountOfCardsToSelectFrom = Math.min(
    10,
    Math.max(2, Math.floor(level / 3))
  );
  return (
    <Flex
      onClick={onClick}
      width="30%"
      minWidth={'400px'}
      bg="black"
      borderRadius="30px"
      border="1px solid white"
      m={4}
      cursor={"pointer"}
      boxShadow={isSelected ? `0px 0px 15px 5px ${LS_GREEN}` : "none"}
      opacity={otherIsSelected ? 0.5 : 1}
    >
      <Flex width="65%" flexDirection="column" justifyContent="center" px={8}>
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
                LVL: {level}
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
        width="35%"
        direction="column"
        align="center"
        p={4}
        gap={4}
        justifyContent="center"
      >
        <Heading size="xl" color="white">
          +{level * 2} HP
        </Heading>
        <Heading size="m" color="white" textAlign="center">
          Select {amountOfCardsToPick} cards from a total of{" "}
          {amountOfCardsToSelectFrom} available
        </Heading>
      </Flex>
    </Flex>
  );
};
