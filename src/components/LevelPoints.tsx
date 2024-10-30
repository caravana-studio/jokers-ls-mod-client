import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useGame } from "../dojo/queries/useGame";
import { useRound } from "../dojo/queries/useRound";
import { PointBox } from "./MultiPoints";
import { Score } from "./Score";
import { useTranslation } from 'react-i18next';

export const LevelPoints = () => {
  const game = useGame();
  const round = useRound();
  const level = game?.level ?? 0;
  const levelScore = round?.level_score ?? 0;
  const { t } = useTranslation(["game"]);

  return (
    <Box className="game-tutorial-step-1">
      <Flex gap={6}>
        <PointBox type="level">
          <Heading  size={{ base: "xs", md: "s" }}>{t('game.level-points.level')}</Heading>
          <Heading  size={{ base: "s", md: "m" }} sx={{ color: "white" }}>
            {level}
          </Heading>
        </PointBox>
        <PointBox type="points">
          <Heading size={{ base: "xs", md: "s" }}>{t('game.level-points.target-score')}</Heading>
          <Heading size={{ base: "s", md: "m" }} px={2}>
            {levelScore}
          </Heading>
        </PointBox>
      </Flex>
      <Text size="s" mt={{ base: 3, md: 5 }} textAlign="center">
        {t('game.level-points.score', {score: levelScore, level: level })}
      </Text>
    </Box>
  );
};

export const MobileLevelPoints = () => {
  const game = useGame();
  const round = useRound();
  const level = game?.level ?? 0;
  const levelScore = round?.level_score ?? 0;
  const { t } = useTranslation(["game"]);
  
  return (
    <Flex gap={2.5} alignItems="center" className="game-tutorial-step-1">
      <Flex
        border="1px solid white"
        borderRadius={10}
        px={1.5}
        height={10}
        alignItems="center"
      >
        <Heading fontSize={21}>{level}</Heading>
      </Flex>
      <Flex flexDirection="column" gap={1} justifyContent={"center"}>
        <Text size="m" lineHeight={1} mt={2}>
          {t('game.level-points.score', {score: levelScore, level: level })}
        </Text>
        <Score />
      </Flex>
    </Flex>
  );
};
