import { Box, Heading, Spinner, useTheme } from "@chakra-ui/react";

export const Loading = () => {
  const { colors } = useTheme();

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Heading
        variant="neonGreen"
        sx={{
          m: 10,
          fontSize: 60,
          textShadow: `0 0 20px ${colors.neonGreen}`,
        }}
      >
        <Spinner size="xl" />
      </Heading>
    </Box>
  );
};
