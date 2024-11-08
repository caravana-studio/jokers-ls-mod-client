import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Background } from "../components/Background";
import { DiscordLink } from "../components/DiscordLink";
import { PositionedGameMenu } from "../components/GameMenu";
import { Leaderboard } from "../components/Leaderboard";
import { GAME_ID } from "../constants/localStorage";
import { ending } from "../constants/lore";
import { looseSfx } from "../constants/sfx";
import { useDojo } from "../dojo/useDojo";
import { decodeString } from "../dojo/utils/decodeString";
import { useAudio } from "../hooks/useAudio";
import { useGameContext } from "../providers/GameProvider";
import Lore from "./LoreScreen/Lore";

const GAME_URL = "https://ls.jokersofneon.com/";

export const GameOver = () => {
  const {
    setup: { client },
  } = useDojo();
  const params = useParams();

  const gameId = Number(params.gameId);

  const { restartGame, setIsRageRound, executeCreateGame } = useGameContext();

  const { play: looseSound, stop: stopLooseSound } = useAudio(looseSfx);
  const { t } = useTranslation(["intermediate-screens"]);
  const [showEnding, setShowEnding] = useState(true);

  let congratulationsMsj = "";
  const [currentLeader, setCurrentLeader] = useState<{
    name: string;
    player_level: number;
    level: number;
  }>();

  const tweetText =
    encodeURIComponent(`🃏 I just battled through @JokersOfNeon x @LootSurvivor mod and reached Level ${currentLeader?.player_level} after ${currentLeader?.level} rounds!
    
    How long can you hold out, warrior? The beasts are waiting, and the game is now live on mainnet! 🎃👻
    
    ⚔️ Play to die now: ${GAME_URL} 🕹️🃏✨`);

  const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;

  useEffect(() => {
    looseSound();
    localStorage.removeItem(GAME_ID);
    setIsRageRound(false);

    gameId &&
      client.player_system
        .get_game({
          game_id: gameId,
        })
        .then((result: any) => {
          const currentLeader = {
            name: decodeString(result.player_name),
            player_level: parseInt(result.player_level),
            level: parseInt(result.level),
          };
          setCurrentLeader(currentLeader);
        });
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
        {showEnding ? (
          <Lore onComplete={() => setShowEnding(false)} sequence={ending} />
        ) : (
          <>
            <Box>
              <Heading mb={"40px"} size="xxl" textAlign={"center"}>
                {t("game-over.gameOver-msj")}
              </Heading>
              <Text size={"md"} textAlign={"center"} mb={10} mx={6}>
                {congratulationsMsj}
              </Text>
              <Leaderboard gameId={gameId} lines={4} />
              <Flex mt={16} justifyContent={"space-between"} gap={12}>
                <Button
                  width={"50%"}
                  variant="solid"
                  onClick={() => {
                    window.open(tweetUrl, "_blank");
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
          </>
        )}
      </Flex>
    </Background>
  );
};
