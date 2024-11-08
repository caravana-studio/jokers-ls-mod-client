import { Box, Button, Flex, Heading, Img, Text } from "@chakra-ui/react";
import { useConnect } from "@starknet-react/core";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AudioPlayer from "../components/AudioPlayer";
import { Background } from "../components/Background";
import { DiscordLink } from "../components/DiscordLink";
import { Leaderboard } from "../components/Leaderboard";
import { PoweredBy } from "../components/PoweredBy";
import { useDojo } from "../dojo/useDojo";
import { useGameContext } from "../providers/GameProvider";
import { LS_GREEN } from "../theme/colors";
import { useAudio } from "../hooks/useAudio";
import { beep } from "../constants/sfx";
import { intro } from "../constants/lore";
import Lore from "./LoreScreen/Lore";

export const Home = () => {
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const { connect, connectors } = useConnect();
  const { account } = useDojo();
  const [playButtonClicked, setPlayButtonClicked] = useState(false);
  const { play: beepSound } = useAudio(beep);
  const { t } = useTranslation(["home"]);

  const { checkOrCreateGame } = useGameContext();

  useEffect(() => {
    if (account && playButtonClicked) {
      checkOrCreateGame();
    }
  }, [account, playButtonClicked]);

  const onPlayClick = () => {
    beepSound();
    setLoading(true);
    setPlayButtonClicked(true);
    connect({ connector: connectors[0] });
  };

  return (
    <Background bgDecoration type="home">
      <AudioPlayer />
      <Flex
        height="100%"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        gap={4}
      >
        {showIntro ? (
          <Lore onComplete={() => setShowIntro(false)} sequence={intro} />
        ) : (
          <>
            {leaderboardOpen ? (
              <Box>
                <Heading mb={"40px"} size="xxl" textAlign={"center"}>
                  LEADERBOARD
                </Heading>

                <Leaderboard />
                <Button
                  mt={8}
                  width="100%"
                  onClick={() => {
                    beepSound();
                    setLeaderboardOpen(false);
                  }}
                >
                  {t("leaderboard.btn.returnLeaderboard-btn")}
                </Button>
              </Box>
            ) : (
              <Flex flexDirection="column" alignItems="center">
                <Img
                  width={{ base: "85%", sm: "75%", md: "70%" }}
                  src="/logos/logo.png"
                  alt="logo"
                />
                <Text
                  fontSize="50px"
                  lineHeight="1"
                  mb="60px"
                  mt="-40px"
                  color="lsGreen"
                  textShadow={`0px 0px 10px ${LS_GREEN}`}
                >
                  LOOT SURVIVOR MOD
                </Text>

                <Flex
                  gap={14}
                  flexWrap={{ base: "wrap", sm: "nowrap" }}
                  justifyContent="center"
                >
                  <Button
                    variant="secondarySolid"
                    onClick={() => {
                      beepSound();
                      setLeaderboardOpen(true);
                    }}
                    width="350px"
                  >
                    leaderboard
                  </Button>
                  <Button
                    isDisabled={loading}
                    onClick={onPlayClick}
                    width="350px"
                  >
                    {loading ? "Loading..." : "Play"}
                  </Button>
                </Flex>
              </Flex>
            )}
          </>
        )}

        <PoweredBy />
      </Flex>
      <Box
        zIndex={999}
        position="absolute"
        right="30px"
        bottom="65px"
        cursor="pointer"
      >
        <DiscordLink />
      </Box>
    </Background>
  );
};
