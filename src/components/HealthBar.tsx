import { Box, Flex, Text } from "@chakra-ui/react";
import { ProgressBar } from "./CompactRoundData/ProgressBar";
import { LOGGED_USER } from "../constants/localStorage";
import { LS_GREEN } from "../theme/colors";

interface IHealthBarProps {
  progress: number;
  color?: string;
  borderColor?: string;
}

export const HealthBar = ({ progress }: IHealthBarProps) => {
  const username = localStorage.getItem(LOGGED_USER);
  return (
    <Flex width="100%" direction="column" alignItems="flex-end">
      <Flex width="100%" justifyContent="space-between">
        <Text color="white" fontWeight="bold" fontSize={"1.5rem"}>
          {username}
        </Text>
        <Text color="white" fontWeight="bold" fontSize={"1.5rem"}>
          {500}
        </Text>
      </Flex>
      <Box width="400px">
        <ProgressBar progress={progress} />
      </Box>
    </Flex>
  );
};
