import { Box, Flex } from "@chakra-ui/react";
import { LevelPoints } from "../../components/LevelPoints.tsx";
import { MultiPoints } from "../../components/MultiPoints.tsx";
import { RageCards } from "../../components/RageCards.tsx";
import { Score } from "../../components/Score.tsx";
import { SpecialCards } from "../../components/SpecialCards.tsx";
import { CARD_WIDTH } from "../../constants/visualProps.ts";
import { useGameContext } from "../../providers/GameProvider.tsx";
import CachedImage from "../../components/CachedImage.tsx";

export const TopSection = () => {
  const { isRageRound } = useGameContext();
  return (
    <Flex
      height="100%"
      width="100%"
      justifyContent={"space-between"}
      alignItems={"flex-start"}
    >
      <Box mr={4}>
        <CachedImage
          src="logos/logo-variant.svg"
          width={{ base: "110px", sm: "150px", md: "260px" }}
          alt="logo"
          mb="30px"
        />
        <LevelPoints />
      </Box>
      <Flex
        px={2}
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        mx={2}
        flexGrow={1}
        minWidth={{ base: "250px", md: "500px" }}
        maxWidth={`${(CARD_WIDTH + 20) * 5}px`}
        gap={2}
      >
        <SpecialCards />
        {isRageRound && <RageCards />}
      </Flex>
      <Flex
        flexDirection="column"
        ml={4}
        height="100%"
        justifyContent="flex-start"
      >
        <Score />
        <MultiPoints />
      </Flex>
    </Flex>
  );
};
