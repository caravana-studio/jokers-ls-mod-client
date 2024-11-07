import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { Tilt } from "react-tilt";
import { Background } from "../components/Background";
import { HoloEffect } from "../components/HoloEffect";
import { TILT_OPTIONS } from "../constants/visualProps";

export const CollectedBeastPage = () => {
  const beastName = "Fallen Neon King";
  const token = "12345";
  const realmsURL = `https://market.realms.world/token/${token}?beast_origin=client`;
  const GAME_URL = "https://ls.jokersofneon.com";

  const tweetURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `🃏 Just defeated and collected the ${beastName} beast in @JokersOfNeon x @LootSurvivor MOD.`
  )}%0A%0A${encodeURIComponent(
    `Check it out! ${realmsURL}`
  )}%0A%0A${encodeURIComponent(`Collect your own at ${GAME_URL}/`)}%0A%0A${encodeURIComponent("Live on Starknet mainnet")}✨`;

  const navigate = useNavigate();

  return (
    <Background type="beast" bgDecoration>
      <Flex
        w="100%"
        h="100%"
        gap={6}
        alignItems="center"
        flexDirection="column"
      >
        <Heading textAlign="center" fontSize="100px">
          COLLECTED BEAST
        </Heading>
        <Flex h="100%" gap={16} justifyContent={"center"} alignItems={"center"}>
          <Flex boxShadow={`0px 0px 30px 10px white, inset 0px 0px 50px 15px white`} borderRadius="20px">
            <Tilt options={{ ...TILT_OPTIONS, max: 5, scale: 1 }}>
              <HoloEffect
                url={`/beasts/nft/105.png`}
                borderRadius={{ base: "20px", sm: "20px" }}
                width={"500px"}
                height={"500px"}
              />
            </Tilt>
          </Flex>
          <Flex flexDir={"column"} gap={4}>
            <Flex flexDir="column" mb={6}>
              <Heading size="xxl">{beastName}</Heading>
              <Text size="xl">Level: 5</Text>
              <Text size="xl">Tier: 3</Text>
            </Flex>
            <Button
              variant="solid"
              onClick={() => {
                window.open(tweetURL, "_blank");
              }}
              data-size="large"
            >
              Share on
              <Flex sx={{ ml: 2.5 }}>
                <FontAwesomeIcon fontSize={22} icon={faXTwitter} />
              </Flex>
            </Button>
            <Button
              onClick={() => {
                window.open(realmsURL, "_blank");
              }}
            >
              View on Realms market
            </Button>
            <Button onClick={() => navigate("/rewards/beast")}>Continue</Button>
          </Flex>
        </Flex>
      </Flex>
    </Background>
  );
};
