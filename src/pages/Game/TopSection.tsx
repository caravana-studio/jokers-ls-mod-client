import { Box, Flex, HStack, Heading, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import CachedImage from "../../components/CachedImage.tsx";
import { HealthBar } from "../../components/HealthBar.tsx";
import { SpecialCards } from "../../components/SpecialCards.tsx";
import { Energy } from "./Energy.tsx";
import { useGame } from "../../dojo/queries/useGame.tsx";
import { PointBox } from "../../components/MultiPoints.tsx";
import { RollingNumber } from "../../components/RollingNumber.tsx";
import { useGameContext } from "../../providers/GameProvider.tsx";

interface TopSectionProps {
  inRewardsPag?: boolean;
}

export const TopSection = ({ inRewardsPag = false }: TopSectionProps) => {
  const { mode } = useParams();
  const game = useGame();
  const { points } = useGameContext();
  const level = game?.level ?? 0;

  return (
    <Flex
      height="100%"
      width="100%"
      justifyContent={"space-between"}
      alignItems={"flex-start"}
      px={"70px"}
    >
      {inRewardsPag ? (
        <Box position="absolute" top="70px" left="0" width="100%" zIndex={1000}>
          <Flex direction={"column"} alignItems={"center"}>
            <Heading
              textTransform="uppercase"
              variant="neonGreen"
              fontSize="70px"
              textAlign="center"
              textShadow="0 0 10px black"
            >
              LEVEL COMPLETED!
            </Heading>
            <Text fontFamily="Jersey" fontSize={"2rem"}>
              Choose your rewards wisely
            </Text>
          </Flex>
        </Box>
      ) : (
        <Box position="absolute" top="70px" left="0" width="100%" zIndex={1000}>
          <Heading
            textTransform="uppercase"
            variant="neonGreen"
            fontSize="70px"
            textAlign="center"
            textShadow="0 0 10px black"
            className="game-tutorial-intro"
          >
            {mode}
          </Heading>
        </Box>
      )}

      <Flex width={"100%"} justifyContent={"space-between"}>
        <Flex flexDirection="column" gap={4}>
          <CachedImage
            src="/logos/logo-variant-ls.png"
            alt="logo"
            width="280px"
          />
          <HealthBar />
          {mode === "obstacle" && (
            <Flex>
              <Box gap={3} sx={{ display: "flex", alignItems: "center" }}>
                <PointBox type="points">
                  <Heading color="white" size={{ base: "s", md: "m" }}>
                    Level <RollingNumber n={level} />
                  </Heading>
                </PointBox>
                <PointBox type="points">
                  <Heading color="white" size={{ base: "s", md: "m" }}>
                    Points: <RollingNumber n={points ?? 0} />
                  </Heading>
                </PointBox>
              </Box>
            </Flex>
          )}

          {mode === "beast" && (
            <HStack gap={4}>
              <PointBox type="points">
                <Heading color="white" size={{ base: "s", md: "m" }}>
                  Level <RollingNumber n={level} />
                </Heading>
              </PointBox>
              <Energy />
            </HStack>
          )}
        </Flex>

        <Flex>
          <SpecialCards />
        </Flex>
      </Flex>
    </Flex>
  );
};
