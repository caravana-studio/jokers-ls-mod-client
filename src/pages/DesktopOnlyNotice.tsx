import { Box, Button, Flex, Heading, Img, Text } from "@chakra-ui/react";
import { Background } from "../components/Background";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { DiscordLink } from "../components/DiscordLink";
import { PoweredBy } from "../components/PoweredBy";
import { Leaderboard } from "../components/Leaderboard";
import AudioPlayer from "../components/AudioPlayer";
import { LS_GREEN } from "../theme/colors";
import { useTranslation } from "react-i18next";

export const DesktopOnlyNotice = () => {
  const navigate = useNavigate();
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const { t } = useTranslation(["home"]);

  useEffect(() => {
    if (!isMobile) {
      navigate("/");
    }
  }, [navigate, isMobile]);
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
        {leaderboardOpen ? (
          <Box>
            <Heading mb={"40px"} size="xl" textAlign={"center"}>
              LEADERBOARD
            </Heading>

            <Leaderboard />
            <Button
              mt={8}
              width="100%"
              onClick={() => {
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
            <Heading size="lg">
              Sorry, this game is available only on desktop. Please visit us on
              a desktop computer.
            </Heading>

            <Flex
              gap={14}
              flexWrap={{ base: "wrap", sm: "nowrap" }}
              justifyContent="center"
            >
              <Button
                variant="secondarySolid"
                onClick={() => {
                  setLeaderboardOpen(true);
                }}
                width="350px"
              >
                leaderboard
              </Button>
            </Flex>
          </Flex>
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
