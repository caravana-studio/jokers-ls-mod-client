import { Flex } from "@chakra-ui/react";
import { Background } from "../components/Background";
import { PositionedDiscordLink } from "../components/DiscordLink";
import { PositionedGameMenu } from "../components/GameMenu";
import { TopSection } from "./Game/TopSection";
import RewardsSection from "./RewardsSection";
import SpriteAnimation from "./SpriteAnimation";

export const notificationAnimations = [
  { name: "idle", startFrame: 0, frameCount: 4 },
  { name: "run", startFrame: 9, frameCount: 5 },
  { name: "jump", startFrame: 11, frameCount: 7 },
  { name: "attack1", startFrame: 42, frameCount: 5 },
  { name: "attack2", startFrame: 47, frameCount: 6 },
  { name: "attack3", startFrame: 53, frameCount: 8 },
  { name: "damage", startFrame: 59, frameCount: 4 },
  { name: "die", startFrame: 64, frameCount: 9 },
  { name: "drawSword", startFrame: 70, frameCount: 5 },
  { name: "discoverItem", startFrame: 85, frameCount: 6 },
  { name: "slide", startFrame: 24, frameCount: 5 },
];

export const RewardsPage = () => {
  return (
    <Background type="skulls" dark bgDecoration>
      <PositionedGameMenu decoratedPage />
      <Flex
        height={"100%"}
        justifyContent={"space-between"}
        direction={"column"}
      >
        <TopSection inRewardsPag />
        <RewardsSection />
        <Flex width={"100%"} justifyContent={"center"} alignItems={"center"}>
          <SpriteAnimation
            frameWidth={308}
            frameHeight={200}
            columns={5}
            rows={1}
            frameRate={4}
            animations={notificationAnimations}
            className="level-up-sprite"
            adjustment={0}
          />
        </Flex>

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
