import React from "react";
import { Box, Checkbox, Flex, Text } from "@chakra-ui/react";
import { LS_GREEN } from "../../theme/colors";

export const Obstacle: React.FC = () => {
  const missions = ["Play one straight hand.", "Do not use Jokers."];

  return (
    <Box width="30%">
      <Text
        fontFamily="Jersey"
        color={LS_GREEN}
        fontSize={"3.5rem"}
        textShadow={`5px 5px 40px ${LS_GREEN} `}
      >
        OBSTACLE
      </Text>
      <Flex direction="column" alignItems="start" gap={4}>
        {missions.map((mission, index) => (
          <Flex alignItems="center" key={index}>
            <Checkbox
              size="md"
              mr={2}
              sx={{
                ".chakra-checkbox__control": {
                  _checked: {
                    backgroundColor: "lsGreen !important",
                    borderColor: "lsGreen !important",
                  },
                },
              }}
            />
            <Text fontSize={"1.3rem"}>{mission}</Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};
