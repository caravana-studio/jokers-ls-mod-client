import { Box, Heading } from "@chakra-ui/react";
import { Background } from "../components/Background";

export const ErrorScreen = () => {
  return (
    <Background type="home">
      <Box
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Heading size="lg">error loading game</Heading>
      </Box>
    </Background>
  );
};
