import { Checkbox, Flex, Text } from "@chakra-ui/react";
import React from "react";

export const Obstacle: React.FC = () => {
  const missions = [
    { description: "Play one straight hand.", checked: true },
    { description: "Do not use Jokers.", checked: false },
  ];

  return (
    <Flex width="100%" justifyContent="center">
      <Flex direction="column" alignItems="start" gap={4}>
        {missions.map((mission, index) => (
          <Flex alignItems="center" key={index}>
            <Checkbox size="md" isChecked={mission.checked} mr={2} />
            <Text size='l' textDecoration={mission.checked ? "line-through" : "none"}>
              {mission.description}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
