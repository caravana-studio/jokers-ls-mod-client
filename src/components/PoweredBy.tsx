import { Box, Text } from "@chakra-ui/react";

export const PoweredBy = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "60px",
        zIndex: 1000,
        opacity: 0.7,
      }}
    >
      <Text size='xl' >powered by Dojo and Starknet</Text>
    </Box>
  );
};
