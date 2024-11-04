import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
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

const GAME_URL = "https://ls.jokersofneon.com/";

export const GameOver = () => {
  const navigate = useNavigate();

  const params = useParams();

  const gameId = Number(params.gameId);

  const { restartGame, setIsRageRound, executeCreateGame } = useGameContext();

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

  return (
    <Background type="home" bgDecoration>
      <PositionedGameMenu decoratedPage />
      <Flex
        height="100%"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        gap={4}
      >
        <Box>
          <Heading mb={"40px"} size="xxl" textAlign={"center"}>
            {t("game-over.gameOver-msj")}
          </Heading>
          <Text size={"md"} textAlign={"center"} mb={10} mx={6}>
            {t(
              "It seems that your adventure has come to an end. \nDarkness envelops you and, for an instant, your soul feels absolute peace, as if it will finally rest for eternity"
            )}
            <br></br>
            {t(
              "Is this the final rest, or is there another path, one that has not yet been revealed?"
            )}
            <br></br>

            <br></br>
            {congratulationsMsj}
          </Text>
          <Leaderboard gameId={gameId} lines={4} />
          <Flex mt={16} justifyContent={"space-between"} gap={12}>
            <Button
              width={"50%"}
              variant="solid"
              onClick={() => {
                window.open(
                  `https://twitter.com/intent/tweet?text=%F0%9F%83%8F%20I%20just%20battled%20through%20%40JokersOfNeon%20x%20%40LootSurvivor%20mod%20%E2%80%94%20here%20are%20my%20final%20results%3A%0A%F0%9F%8F%85%20Rank%3A%20${currentLeader?.position}%0A%F0%9F%94%A5%20Level%3A%20${currentLeader?.level}%0A%0AHow%20long%20can%20you%20hold%20out%2C%20warrior%3F%20The%20beasts%20are%20waiting%2C%20and%20the%20game%20is%20now%20live%20on%20mainnet!%20%F0%9F%8E%83%F0%9F%91%BB%0A%0A%E2%9A%94%EF%B8%8F%20Play%20to%20die%20now%3A%20${GAME_URL}%2F%20%F0%9F%95%B8%EF%B8%8F%F0%9F%83%8F%E2%9C%A8`,
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
                executeCreateGame();
              }}
            >
              {t("game-over.btn.gameOver-newGame-btn")}
            </Button>
          </Flex>
          <Flex mt={{ base: 4, sm: 10 }} justifyContent="center">
            <DiscordLink />
          </Flex>
        </Box>
      </Flex>
    </Background>
  );
};
