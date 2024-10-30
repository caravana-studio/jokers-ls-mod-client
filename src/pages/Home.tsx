import { Box, Button, Flex, Heading, Img, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AudioPlayer from "../components/AudioPlayer";
import { Background } from "../components/Background";
import { DiscordLink } from "../components/DiscordLink";
import { Leaderboard } from "../components/Leaderboard";
import { PoweredBy } from "../components/PoweredBy";
import { LS_GREEN } from "../theme/colors";

export const Home = () => {
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation(["home"]);

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
            <Text fontSize="50px" lineHeight='1' mb='60px' mt='-40px' color="lsGreen" textShadow={`0px 0px 10px ${LS_GREEN}`}>
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
                  setLeaderboardOpen(true);
                }}
                width='350px'
              >
                leaderboard
              </Button>
              <Button
                onClick={() => {
                  navigate("/login");
                }}
                width='350px'
              >
                play
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
