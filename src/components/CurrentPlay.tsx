import { Flex, Text } from "@chakra-ui/react";
import { PLAYS } from "../constants/plays";
import { Plays } from "../enums/plays";
import { useGameContext } from "../providers/GameProvider";
import { useTranslation } from "react-i18next";

export const CurrentPlay = () => {
  const { preSelectedPlay, playIsNeon } = useGameContext();
  const { t } = useTranslation(["game"]);

  return (
    <Flex gap={{base: 2, md: 4}} alignItems={"center"} justifyContent={"flex-start"}
    >
      <Text size="l">
        {preSelectedPlay === Plays.NONE
          ? t('game.preselected-cards-section.current-play-lbl.default')
          : t('game.preselected-cards-section.current-play-lbl.current-play') + `${playIsNeon ? t('game.preselected-cards-section.current-play-lbl.neon-play') : ""} ${PLAYS[preSelectedPlay]}`}
      </Text>
    </Flex>
  );
};
