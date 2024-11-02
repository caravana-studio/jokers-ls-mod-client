import React, { useState } from "react";
import { Box, Text, Flex, Button } from "@chakra-ui/react";
import { LS_GREEN } from "../theme/colors";

interface RewardCardProps {
  index: number;
  type: string;
  description: string;
  onSelect: () => void;
}

const HIGHLIGHT_STYLE = {
  transform: "scale(1.02)",
  borderColor: "lsGreen",
  boxShadow: `0px 0px 5px 1px ${LS_GREEN}, inset 0px 0px 5px 1px ${LS_GREEN}`,
};

const RewardCard = ({
  index,
  type,
  description,
  onSelect,
}: RewardCardProps) => {
  const icons = ["🧪", "🗝️", "📦"];

  return (
    <Flex _hover={HIGHLIGHT_STYLE} p={5} border={`1px solid transparent`}>
      <Box
        position="relative"
        width="250px"
        height="300px"
        borderRadius="md"
        cursor={"pointer"}
        onClick={onSelect}
        transition="all 0.2s"
      >
        <Box
          position="absolute"
          inset="0"
          borderRadius="md"
          pointerEvents="none"
        />

        <Flex
          direction="column"
          align="center"
          justify="space-between"
          height="100%"
          p={4}
        >
          <Text
            fontFamily="Jersey"
            fontSize={"2rem"}
            textTransform="uppercase"
            mb={2}
            textAlign="center"
          >
            {type}
          </Text>
          <Text fontSize="4xl" mb={4} bg="black">
            {icons[index]}
          </Text>

          <Text
            fontFamily="Jersey"
            fontSize={"1.2rem"}
            textAlign="center"
            color="gray.300"
          >
            {description}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

const RewardsSection = () => {
  const [selectedReward, setSelectedReward] = useState(null);

  const rewards = [
    {
      id: 0,
      type: "potion",
      description: "Recovers 50 HP",
    },
    {
      id: 1,
      type: "special",
      description: "Select 1 from a total of 5 available",
    },
    {
      id: 2,
      type: "pack",
      description: "Open a pack of cards that can contain Jokers and modifiers",
    },
  ];

  return (
    <Flex gap={4} justify="center" align="center" wrap="wrap">
      {rewards.map((reward, index) => (
        <RewardCard
          key={reward.type}
          {...reward}
          index={index}
          onSelect={() => {
            console.log("Selected");
          }}
        />
      ))}
    </Flex>
  );
};

export default RewardsSection;
