import { Box } from "@chakra-ui/react";
import { LS_GREEN } from "../../theme/colors";

interface IProgressBarProps {
  progress: number;
  color?: string;
  borderColor?: string;
}
export const ProgressBar = ({ progress, color = LS_GREEN, borderColor = 'white' }: IProgressBarProps) => {
  return (
    <Box mt={1.5} position="relative">
      <Box
        h="16px"
        borderRadius="1"
        border={`2px solid ${borderColor}`}
        position="relative"
        zIndex={2}
      ></Box>

      <Box
        h="100%"
        bg={color}
        boxShadow={progress && `0px 0px 8px 3px ${color}`}
        width={`${progress > 100 ? 100 : progress}%`}
        borderRadius="1"
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        transition="width 1s ease"
      />
    </Box>
  );
};
