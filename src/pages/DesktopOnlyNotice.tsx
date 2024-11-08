import { Box, Button, Flex, Heading, Img, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AudioPlayer from "../components/AudioPlayer";
import { Background } from "../components/Background";
import { DiscordLink } from "../components/DiscordLink";
import { Leaderboard } from "../components/Leaderboard";
import { PoweredBy } from "../components/PoweredBy";
import { LS_GREEN } from "../theme/colors";

export const DesktopOnlyNotice = () => {
  const navigate = useNavigate();
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const { t } = useTranslation(["home"]);

  useEffect(() => {
    if (window.innerWidth >= 1280) {
      navigate("/");
    }
  }, [navigate]);
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
          <Flex flexDirection={"column"} alignItems={"center"}>
            <Heading mb={"40px"} size="xl" textAlign={"center"}>
              LEADERBOARD
            </Heading>

            <Box w="100%">
              <Leaderboard />
            </Box>
            <Button
              mt={8}
              fontSize={"18px"}
              width={"200px"}
              border="1px solid white"
              py={1}
              px={2}
              onClick={() => {
                setLeaderboardOpen(false);
              }}
            >
              {t("leaderboard.btn.returnLeaderboard-btn")}
            </Button>
          </Flex>
        ) : (
          <Flex flexDirection="column" alignItems="center" px={4}>
            <Img
              width={{ base: "100%", sm: "75%", md: "70%" }}
              src="/logos/logo.png"
              alt="logo"
            />
            <Text
              fontSize={["24px", "50px"]}
              lineHeight="1"
              color="lsGreen"
              textShadow={`0px 0px 10px ${LS_GREEN}`}
            >
              LOOT SURVIVOR MOD
            </Text>
            <Heading size={["sm", "lg"]} py={4}>
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
                fontSize={"18px"}
                width={"200px"}
                border="1px solid white"
                py={1}
                px={2}
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
