import { Box } from "@chakra-ui/react";
import { LS_GREEN } from "../../theme/colors";

interface IProgressBarProps {
  progress: number;
}
export const ProgressBar = ({ progress }: IProgressBarProps) => {
  return (
    <Box mt={1.5} position="relative">
      <Box
        h="16px"
        borderRadius="1"
        border="2px solid white"
        position="relative"
        zIndex={2}
      ></Box>

      <Box
        h="100%"
        bg={LS_GREEN}
        boxShadow={progress && `0px 0px 6px 2px ${LS_GREEN}`}
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
