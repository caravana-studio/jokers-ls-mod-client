import { Box, Heading } from "@chakra-ui/react";
import { Background } from "../components/Background";

export const DesktopOnlyNotice = () => {
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
        <Heading size="lg">
          Sorry, this game is available only on desktop. Please visit us on a
          desktop computer.
        </Heading>
      </Box>
    </Background>
  );
};
