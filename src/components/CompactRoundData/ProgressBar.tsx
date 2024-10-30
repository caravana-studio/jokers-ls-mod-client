import { Box } from "@chakra-ui/react";
import { BLUE_LIGHT } from "../../theme/colors";

interface IProgressBarProps {
  progress: number;
}
export const ProgressBar = ({ progress }: IProgressBarProps) => {
  return (
    <Box mt={1.5} position="relative">
      <Box
        h="14px"
        borderRadius="full"
        border="2px solid white"
        position="relative"
        zIndex={2}
      ></Box>

      <Box
        h="100%"
        bg={BLUE_LIGHT}
        boxShadow={progress && `0px 0px 6px 3px ${BLUE_LIGHT}`}
        width={`${progress > 100 ? 100 : progress}%`}
        borderRadius="full"
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        transition="width 1s ease"
      />
    </Box>
  );
};
