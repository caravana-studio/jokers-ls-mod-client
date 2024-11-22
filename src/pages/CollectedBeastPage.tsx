import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import { Tilt } from "react-tilt";
import { Background } from "../components/Background";
import { HoloEffect } from "../components/HoloEffect";
import { BEAST_IS_MINTABLE_LS } from "../constants/localStorage";
import { TILT_OPTIONS } from "../constants/visualProps";
import { getNameBeast } from "../utils/getNameBeast";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const COLLECTION_CONTRACT_ADDRESS = import.meta.env.VITE_NFT_COLLECTION_CONTRACT_ADDRESS || "0x07268fcf96383f8691b91ba758cc8fefe0844146f0557909345b841fb1de042f";

export const CollectedBeastPage = () => {
  const query = useQuery();
  const beast_id = query.get("beast_id");
  const tier = query.get("tier");
  const level = query.get("level");
  const token_id = query.get("token_id");
  const beastName = getNameBeast(Number(beast_id));
  const realmsURL = `https://market.realms.world/token/${COLLECTION_CONTRACT_ADDRESS}/${token_id}`;
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
        <Heading
          color="yellow"
          textShadow={`0px 0px 10px yellow`}
          textAlign="center"
          fontSize="100px"
        >
          COLLECTED BEAST
        </Heading>
        <Flex h="100%" gap={16} justifyContent={"center"} alignItems={"center"}>
          <Flex
            boxShadow={`0px 0px 30px 10px yellow, inset 0px 0px 50px 15px yellow`}
            borderRadius="20px"
          >
            <Tilt options={{ ...TILT_OPTIONS, max: 5, scale: 1 }}>
              <HoloEffect
                url={`/beasts/nft/${beast_id}.png`}
                borderRadius={{ base: "20px", sm: "20px" }}
                width={"500px"}
                height={"500px"}
              />
            </Tilt>
          </Flex>
          <Flex flexDir={"column"} gap={4}>
            <Flex flexDir="column" mb={6}>
              <Heading size="xxl">{beastName}</Heading>
              <Text size="xl">Level: {level}</Text>
              <Text size="xl">Tier: {tier}</Text>
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
            <Button
              onClick={() => {
                window.localStorage.removeItem(BEAST_IS_MINTABLE_LS);
                navigate("/rewards");
              }}
            >
              Continue
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Background>
  );
};
