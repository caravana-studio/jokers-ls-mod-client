import { Box, Flex, Text } from "@chakra-ui/react";
import { ProgressBar } from "./CompactRoundData/ProgressBar";

export const HealthBar = () => {
  return (
    <Flex
      width="100%"
      direction="column"
      alignItems="flex-end"
      position="absolute"
      right="0"
      top="0"
      pr={4}
    >
      <Box width="100%" maxWidth="600px">
        <ProgressBar progress={90} />
      </Box>

      <Flex width="100%" justifyContent="space-between" mb={2}>
        <Text color="white" fontWeight="bold" fontSize={"1.5rem"}>
          My life
        </Text>
        <Text color="white" fontWeight="bold" fontSize={"1.5rem"}>
          {500}
        </Text>
      </Flex>
    </Flex>
  );
};
