import { Checkbox, Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { OBSTACLES } from "../../data/obstacles";
import { useGameContext } from "../../providers/GameProvider";

export const Obstacle: React.FC = () => {
  const { obstacles, refetchObstacles } = useGameContext();

  const missions =
    obstacles?.map((obstacle) => ({
      description: OBSTACLES[obstacle.id]?.description ?? "Not found",
      checked: obstacle.completed,
    })) ?? [];

  useEffect(() => {
    if (missions.length === 0) {
      console.log("refetching obstacle ids");
      refetchObstacles();
    }
  }, [missions]);

  return (
    <Flex width="100%" justifyContent="center">
      <Flex direction="column" alignItems="start" gap={4}>
        {missions.map((mission, index) => (
          <Flex alignItems="center" key={index}>
            <Checkbox size="md" isChecked={mission.checked} mr={2} />
            <Text
              size="l"
              textDecoration={mission.checked ? "line-through" : "none"}
            >
              {mission.description}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
