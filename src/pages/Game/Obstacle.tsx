import { Checkbox, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useChallenge } from "../../dojo/queries/useChallenge";
import { CHALLENGE } from "../../constants/challenge";

export const Obstacle: React.FC = () => {
  const challenge = useChallenge();

  //TODO: Cast the text
  const missions =
    (challenge?.active_ids as number[]).map((id) => ({
      description: id.toString().valueOf(),
      checked: false,
    })) ?? [];

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
