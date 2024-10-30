import { Box, Button, Heading } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { VIOLET, VIOLET_LIGHT } from "../theme/colors";

interface PinkBoxProps extends PropsWithChildren {
  title: string;
  button?: string;
  onClick?: () => void;
}

export const PinkBox = ({ children, title, button, onClick }: PinkBoxProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      w="80%"
      maxW="550px"
      fontFamily="Orbitron"
    >
      <Box
        w="100%"
        px={[1, 2, 4]}
        py={2}
        mt={8}
        border="2px solid #DAA1E8FF"
        boxShadow={`0px 0px 20px 15px ${VIOLET}`}
        filter="blur(0.5px)"
        backgroundColor="rgba(0, 0, 0, 1)"
        borderRadius="10px"
        display="grid"
        justifyItems="center"
      >
        <Heading size={{base: 'sm', sm:"l"}} variant="italic" color={VIOLET_LIGHT} mt={4}>
          {title}
        </Heading>
        {children}
      </Box>
      {button && <Button
        className="game-tutorial-step-4"
        mt={14}
        w="100%"
        size="md"
        variant="secondarySolid"
        onClick={onClick}
      >
        {button}
      </Button>}
    </Box>
  );
};
