import { Box, Flex, HStack, Heading, Text, Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CachedImage from "../../components/CachedImage.tsx";
import { HealthBar } from "../../components/HealthBar.tsx";
import { PointBox } from "../../components/MultiPoints.tsx";
import { RollingNumber } from "../../components/RollingNumber.tsx";
import { SpecialCards } from "../../components/SpecialCards.tsx";
import { BEAST_IS_MINTABLE_LS } from "../../constants/localStorage.ts";
import { useGameContext } from "../../providers/GameProvider.tsx";
import { LS_GREEN } from "../../theme/colors.tsx";
import { Energy } from "./Energy.tsx";

interface TopSectionProps {
  inRewardsPag?: boolean;
  obstacleFailed?: boolean;
}

export const TopSection = ({
  inRewardsPag = false,
  obstacleFailed = false,
}: TopSectionProps) => {
  const { mode } = useParams();
  const { game } = useGameContext();

  const level = game?.level.valueOf() ?? 0;

  const [isBeastMintable, setIsBeastMintable] = useState(false);

  useEffect(() => {
    setIsBeastMintable(
      window.localStorage.getItem(BEAST_IS_MINTABLE_LS) === "true"
    );
  }, []);

  return (
    <Flex
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
              {obstacleFailed ? "Obstacle failed" : "LEVEL COMPLETED!"}
            </Heading>
            <Text fontFamily="Jersey" fontSize={"2rem"}>
              {obstacleFailed ? "" : "Choose your rewards wisely"}
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
            className="game-tutorial-intro"
            color={isBeastMintable ? "yellow" : LS_GREEN}
            textShadow={
              isBeastMintable ? "0px 0px 20px yellow" : "0 0 10px black"
            }
          >
            {mode}
          </Heading>
          {isBeastMintable && (
            <Tooltip
              fontSize="17px"
              label="If you defeat this beast, you will collect it as an NFT"
            >
              <Heading
                color="yellow"
                textShadow="0px 0px 20px yellow"
                size="lg"
                textAlign="center"
              >
                - COLLECTIBLE -
              </Heading>
            </Tooltip>
          )}
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
