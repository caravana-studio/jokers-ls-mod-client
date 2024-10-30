import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useRound } from "../../dojo/queries/useRound";
import { useGameContext } from "../../providers/GameProvider";
import { BLUE_LIGHT, VIOLET } from "../../theme/colors";
import { RollingNumber } from "../RollingNumber";
import { LevelBox } from "./LevelBox";
import { NumberBox } from "./NumberBox";
import { ProgressBar } from "./ProgressBar";
export const CompactRoundData = () => {
  const { t } = useTranslation("game", {
    keyPrefix: "game.compact-round-data",
  });
  const { score, points, multi } = useGameContext();

  const round = useRound();
  const target = round?.level_score ?? 0;

  return (
    <Flex justifyContent="center">
      <Box px={4} mb={4} borderRadius="md" width="100%" maxW="600px">
        <LevelBox />
        <Flex justify="center" gap={1} align="center">
          <Box>
            <Text
              textAlign="right"
              fontSize="10px"
              textTransform="uppercase"
              fontWeight="500"
            >
              {t("my-score")}
            </Text>
            <Heading
              textAlign="right"
              fontSize="md"
              mr={0.5}
              mt={-1}
              variant="italic"
              width="50px"
            >
              <RollingNumber n={score} />
            </Heading>
          </Box>

          <Flex align="center">
            <NumberBox number={points} color={BLUE_LIGHT} />
            <Text fontSize="md" fontWeight="bold">
              x
            </Text>
            <NumberBox number={multi} color={VIOLET} spreadIncrease={5} />
          </Flex>

          <Box>
            <Text fontSize="10px" textTransform="uppercase" fontWeight="500">
              {t("target")}
            </Text>
            <Heading
              width="50px"
              fontSize="md"
              ml={0.5}
              mt={-1}
              variant="italic"
            >
              <RollingNumber n={target} />
            </Heading>
          </Box>
        </Flex>
        <ProgressBar progress={(score / target) * 100} />
      </Box>
    </Flex>
  );
};

export default CompactRoundData;
