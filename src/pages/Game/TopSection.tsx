import { Box, Flex, Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import CachedImage from "../../components/CachedImage.tsx";
import { HealthBar } from "../../components/HealthBar.tsx";
import { SpecialCards } from "../../components/SpecialCards.tsx";
import { Energy } from "./Energy.tsx";
import { useGame } from "../../dojo/queries/useGame.tsx";

export const TopSection = () => {
  const { mode } = useParams();

  return (
    <Flex
      height="100%"
      width="100%"
      justifyContent={"space-between"}
      alignItems={"flex-start"}
      px={"70px"}
    >
      <Box position="absolute" top="70px" left="0" width="100%" zIndex={1000}>
        <Heading
          textTransform="uppercase"
          variant="neonGreen"
          fontSize="70px"
          textAlign="center"
          textShadow="0 0 10px black"
        >
          {mode}
        </Heading>
      </Box>
      <Flex flexDirection="column" gap={4}>
        <CachedImage
          src="/logos/logo-variant-ls.png"
          alt="logo"
          width="280px"
        />
        <HealthBar />
        {mode === "beast" && <Energy />}
      </Flex>

      <SpecialCards />
    </Flex>
  );
};
