import { Box, Flex, Img, Text } from "@chakra-ui/react";
import { Type } from "@dojoengine/recs";
import { useEffect } from "react";
import { beep } from "../constants/sfx";
import { useGame } from "../dojo/queries/useGame";
import { useAudio } from "../hooks/useAudio";
import { useGameContext } from "../providers/GameProvider";
import { LS_GREEN } from "../theme/colors";

interface RewardCardProps {
  index: number;
  type: string;
  description: string;
  onSelect: () => void;
}

const HIGHLIGHT_STYLE = {
  transform: "scale(1.02)",
  borderColor: "lsGreen",
  boxShadow: `0px 0px 5px 1px ${LS_GREEN}, inset 0px 0px 5px 1px ${LS_GREEN}`,
};

const RewardCard = ({
  index,
  type,
  description,
  onSelect,
}: RewardCardProps) => {
  const icons = [
    "",
    "/logos/potion.png",
    "/logos/book.png",
    "/logos/special.png",
  ];

  return (
    <Flex _hover={HIGHLIGHT_STYLE} p={5} border={`1px solid transparent`}>
      <Box
        position="relative"
        width="250px"
        height="200px"
        borderRadius="20px"
        opacity={0.7}
        cursor={"pointer"}
        onClick={onSelect}
        transition="all 0.2s"
        backgroundColor="black"
      >
        <Box
          position="absolute"
          inset="0"
          borderRadius="md"
          pointerEvents="none"
        />

        <Flex
          direction="column"
          align="center"
          justify="space-between"
          height="100%"
          p={4}
        >
          <Text
            fontFamily="Jersey"
            fontSize={"2rem"}
            textTransform="uppercase"
            mb={2}
            textAlign="center"
          >
            {type}
          </Text>
          <Img width={"100px"} height={"auto"} src={icons[index]} alt="book" />

          <Text
            fontFamily="Jersey"
            fontSize={"1.2rem"}
            textAlign="center"
            color="gray.300"
          >
            {description}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

const RewardsSection = () => {
  const { redirectBasedOnGameState, rewardsIds, refetchRewardsId, game } =
    useGameContext();
  const { createNewReward } = useGameContext();
  const { play: beepSound } = useAudio(beep);

  if (game?.substate.type != "CREATE_REWARD") {
    redirectBasedOnGameState();
  }

  useEffect(() => {
    if (!rewardsIds || rewardsIds.length === 0) {
      refetchRewardsId();
    }
  }, [rewardsIds]);

  const rewards = [
    {
      id: 1,
      type: "potion",
      description: " \n Recovers between 25 - 50 HP",
    },
    {
      id: 2,
      type: "pack",
      description: "Open a pack of cards that can contain Jokers and modifiers",
    },
    {
      id: 3,
      type: "special",
      description: "Select 1 from a total of 3 available",
    },
  ];

  const filteredRewards: { id: number; type: string; description: string }[] =
    [];
  rewardsIds?.forEach((objectId) => {
    let idNumber = 0;

    if (typeof objectId === "object")
      idNumber = objectId ? Number(objectId.id?.valueOf()) : 0;
    else idNumber = objectId;

    const match = rewards.find(
      (reward) => (reward.id as Type.Number) == (idNumber as number)
    );
    if (match) {
      filteredRewards.push(match);
    }
  });

  return (
    <Flex gap={4} justify="center" align="center" wrap="wrap">
      {filteredRewards.map((reward, index) => (
        <RewardCard
          key={reward.type}
          {...reward}
          index={reward.id}
          onSelect={() => {
            beepSound();
            console.log(reward.id);
            createNewReward(index, reward.type);
          }}
        />
      ))}
    </Flex>
  );
};

export default RewardsSection;
