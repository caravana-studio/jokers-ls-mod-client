import { Box, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { Background } from "../components/Background";
import { PositionedDiscordLink } from "../components/DiscordLink";
import { PositionedGameMenu } from "../components/GameMenu";
import { runConfettiAnimation } from "../utils/runConfettiAnimation";
import { TopSection } from "./Game/TopSection";
import RewardsSection from "./RewardsSection";

export const RewardsPage = () => {
  useEffect(() => {
    runConfettiAnimation();
  }, []);

  return (
    <Background type="skulls" dark bgDecoration>
      <PositionedGameMenu decoratedPage />
      <Flex direction={"column"}>
        <TopSection inRewardsPag />
          <Box mt={16}>

          <RewardsSection />
          </Box>
          
        {/* <Button
          width={"30%"}
          mt={8}
          alignSelf={"center"}
          onClick={() => createNewLevel()}
        >
          Continue
        </Button> */}
        <PositionedDiscordLink />
      </Flex>
    </Background>
  );
};
