import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { Background } from "../components/Background";
import { DiscordLink } from "../components/DiscordLink";
import { PositionedGameMenu } from "../components/GameMenu";
import { Leaderboard } from "../components/Leaderboard";
import { GAME_ID } from "../constants/localStorage";
import { looseSfx } from "../constants/sfx";
import { useAudio } from "../hooks/useAudio";
import { useGameContext } from "../providers/GameProvider";
import { useGetLeaderboard } from "../queries/useGetLeaderboard";
import { runConfettiAnimation } from "../utils/runConfettiAnimation";

const GAME_URL = "https://jokersofneon.com";

export const GameOver = () => {
  const navigate = useNavigate();

  const params = useParams();

  const gameId = Number(params.gameId);

  const { restartGame, setIsRageRound } = useGameContext();

  const { play: looseSound, stop: stopLooseSound } = useAudio(looseSfx);
  const { data: fullLeaderboard } = useGetLeaderboard();
  const actualPlayer = fullLeaderboard?.find((player) => player.id === gameId);
  const { t } = useTranslation(["intermediate-screens"]);
  const currentLeader = fullLeaderboard?.find((leader) => leader.id === gameId);

  let congratulationsMsj = "";

  if (currentLeader?.position != undefined) {
    congratulationsMsj =
      actualPlayer?.position === 1
        ? t("game-over.table.gameOver-leader-msj")
        : currentLeader?.position > 1 && currentLeader?.position <= 5
          ? t("game-over.table.gameOver-top5-msj")
          : "";
  }

  const position = currentLeader?.position ?? 100;

  useEffect(() => {
    looseSound();
    localStorage.removeItem(GAME_ID);
    setIsRageRound(false);
  }, []);

  useEffect(() => {
    if (position <= 10) {
      runConfettiAnimation(position <= 3 ? 300 : 100);
    }
  }, [position]);

  return (
    <Background type="game" bgDecoration>
      <PositionedGameMenu decoratedPage />
      <Flex
        height="100%"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        gap={4}
      >
        <Flex flexDirection="column" width="100%">
          <Heading size="md" variant="italic" textAlign={"center"} mb={3}>
            {t("game-over.gameOver-msj")}
          </Heading>
          <Text size={"md"} textAlign={"center"} mb={10} mx={6}>
            {congratulationsMsj}
          </Text>
          <Leaderboard gameId={gameId} lines={4} />
          <Flex mt={16} justifyContent={"space-between"} gap={4}>
            <Button
              width={"50%"}
              variant="solid"
              onClick={() => {
                window.open(
                  `https://twitter.com/intent/tweet?text=%F0%9F%83%8F%20I%20just%20finished%20a%20game%20in%20Jokers%20of%20Neon%20%E2%80%94%20check%20out%20my%20results%3A%0A%F0%9F%8F%85%20Rank%3A%20${currentLeader?.position}%0A%F0%9F%94%A5%20Level%3A%20${currentLeader?.level}%0A%0AThink%20you%20can%20top%20that%3F%20The%20demo%20is%20live%20for%20a%20limited%20time!%20%E2%8F%B3%0A%0AGive%20it%20a%20try%20at%20${GAME_URL}%2F%20%F0%9F%83%8F%E2%9C%A8`,
                  "_blank"
                );
              }}
              data-size="large"
            >
              {t("game-over.btn.gameOver-share-btn")}
              <Flex sx={{ ml: 2.5 }}>
                <FontAwesomeIcon fontSize={22} icon={faXTwitter} />
              </Flex>
            </Button>
            <Button
              width={"50%"}
              variant="secondarySolid"
              onClick={() => {
                localStorage.removeItem(GAME_ID);
                restartGame();
                stopLooseSound();
                navigate("/demo");
              }}
            >
              {t("game-over.btn.gameOver-newGame-btn")}
            </Button>
          </Flex>
          <Flex mt={{ base: 4, sm: 10 }} justifyContent="center">
            <DiscordLink />
          </Flex>
        </Flex>
      </Flex>
    </Background>
  );
};
