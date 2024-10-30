import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

import CachedImage from "../../components/CachedImage.tsx";

import { useLocation, useNavigate } from "react-router-dom";
import { Background } from "../../components/Background.tsx";
import { CARD_WIDTH } from "../../constants/visualProps.ts";
import { useGame } from "../../dojo/queries/useGame.tsx";
import { useStore } from "../../providers/StoreProvider.tsx";
import theme from "../../theme/theme.ts";
import { getCardData } from "../../utils/getCardData.ts";
import { getTemporalCardText } from "../../utils/getTemporalCardText.ts";
import { Coins } from "../store/Coins.tsx";
import { PositionedDiscordLink } from "../../components/DiscordLink.tsx";

import { useTranslation } from "react-i18next";
import { PositionedGameMenu } from "../../components/GameMenu.tsx";

const SIZE_MULTIPLIER = 2;
const { white, neonGreen } = theme.colors;

const PreviewCardLayout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { card, isPack, pack } = state || {};

  const [buyDisabled, setBuyDisabled] = useState(false);
  const { t } = useTranslation(["store"]);
  /*   const [isOpenAnimationRunning, setIsOpenAnimationRunning] =
    useState<boolean>(false); */

  /*   const handleAnimationEnd = () => {
    setIsOpenAnimationRunning(false);
    setLockRedirection(false);
    close();
    navigate("/redirect/open-pack");
  }; */

  if (!card) {
    return <p>Card not found.</p>;
  }

  const game = useGame();
  const { buyCard, buyPack, locked, setLockRedirection } = useStore();
  const cash = game?.cash ?? 0;
  const { name, description, details } = getCardData(card, isPack);
  const specialMaxLength = game?.len_max_current_special_cards ?? 0;
  const specialLength = game?.len_current_special_cards ?? 0;

  const notEnoughCash = !card.price || cash < card.price;
  const noSpaceForSpecialCards =
    card.isSpecial && specialLength >= specialMaxLength;

  const fontTitleSize = ["s", "s", "l"];
  const fontSize = ["md", "md", "xl"];
  const layoutWidth = ["95%", "90%", "70%"];

  const buyButton = (
    <Button
      onClick={() => {
        if (isPack) {
          setBuyDisabled(true);
          buyPack(pack)
            .then((response) => {
              if (response) {
                navigate("/redirect/open-pack");
              } else {
                setBuyDisabled(false);
              }
            })
            .catch(() => {
              setBuyDisabled(false);
            });
          // setIsOpenAnimationRunning(true);
          // setLockRedirection(true);
        } else {
          buyCard(card);
          navigate(-1);
        }
      }}
      isDisabled={
        notEnoughCash || noSpaceForSpecialCards || locked || buyDisabled
      }
      variant="outlinePrimaryGlow"
      height={"100%"}
    >
      {t("store.preview-card.labels.buy")}
    </Button>
  );

  return (
    <Background type="home" dark>
      <PositionedGameMenu />
      <Flex flexDirection={"column"} justifyContent={"center"} height={"100vh"}>
        <Flex
          flexDirection={"column"}
          justifyContent={"center"}
          width={layoutWidth}
          margin={"0 auto"}
          bg="rgba(0, 0, 0, 0.6)"
          borderRadius="25px"
          p={6}
          boxShadow={`0px 0px 10px 1px ${white}`}
        >
          <Flex>
            <Box
              width={`${CARD_WIDTH * SIZE_MULTIPLIER + 30}px`}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
            >
              {/*               <OpenAnimation
                startAnimation={isOpenAnimationRunning}
                onAnimationEnd={() => handleAnimationEnd()}
              > */}
              <CachedImage
                src={
                  isPack
                    ? `Cards/${card.img}.png`
                    : `Cards/${card.isSpecial || card.isModifier ? `big/${card?.card_id}.png` : `big/${card?.img}`}`
                }
                alt={`Card: ${card.name}`} // Make sure to provide an appropriate alt text
                borderRadius="10px"
              />
              {/* </OpenAnimation> */}
            </Box>

            <Flex flexDirection={"column"} ml={"30px"} flex="1">
              <Flex justifyContent="space-between" alignItems="center">
                <Heading size={["md", "md", "l"]} variant="italic" mb={4}>
                  {name}
                </Heading>
                <CachedImage
                  src={`/logos/jn-logo.png`}
                  alt={"JN logo"}
                  width="120px"
                  display={["none", "none", "flex"]}
                />
              </Flex>

              <VStack align="stretch" spacing={8} flex={1}>
                {!isPack && (
                  <Box mt={"20px"}>
                    <Text
                      color="white"
                      fontSize={fontTitleSize}
                      mb={2}
                      sx={{
                        position: "relative",
                        _before: {
                          content: '""',
                          position: "absolute",
                          bottom: 0,
                          width: "95%",
                          height: "2px",
                          backgroundColor: "white",
                          boxShadow:
                            "0px 0px 12px rgba(255, 255, 255, 0.8), 0px 6px 20px rgba(255, 255, 255, 0.5)",
                        },
                      }}
                    >
                      {t("store.preview-card.title.card-type")}
                    </Text>
                    <Text color={neonGreen} fontSize={fontSize}>
                      {card.isSpecial
                        ? t("store.preview-card.labels.special")
                        : card.isModifier
                          ? t("store.preview-card.labels.modifier")
                          : t("store.preview-card.labels.traditional")}
                      {card.temporary &&
                        " (" + t("store.preview-card.labels.temporary") + ")"}
                    </Text>
                  </Box>
                )}
                <Box>
                  <Text
                    color="white"
                    fontSize={fontTitleSize}
                    mb={2}
                    sx={{
                      position: "relative",
                      _before: {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        width: "95%",
                        height: "2px",
                        backgroundColor: "white",
                        boxShadow:
                          "0px 0px 12px rgba(255, 255, 255, 0.8), 0px 6px 20px rgba(255, 255, 255, 0.5)",
                      },
                    }}
                  >
                    {t("store.preview-card.title.description")}
                  </Text>
                  <Text color={neonGreen} fontSize={fontSize}>
                    {description}
                  </Text>
                  {card.temporary && (
                    <Text variant="neonGreen" size="l" pt={2}>
                      {getTemporalCardText(card.remaining)}
                    </Text>
                  )}
                </Box>

                {isPack && (
                  <Box>
                    <Text
                      color="white"
                      fontSize={fontTitleSize}
                      mb={2}
                      sx={{
                        position: "relative",
                        _before: {
                          content: '""',
                          position: "absolute",
                          bottom: 0,
                          width: "95%",
                          height: "2px",
                          backgroundColor: "white",
                          boxShadow:
                            "0px 0px 12px rgba(255, 255, 255, 0.8), 0px 6px 20px rgba(255, 255, 255, 0.5)",
                        },
                      }}
                    >
                      {t("store.preview-card.title.details")}
                    </Text>
                    <Text color={neonGreen} fontSize={fontSize}>
                      {details?.split("\n").map((line, index) => (
                        <span key={index}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </Text>
                  </Box>
                )}
                <Box
                  flex={1}
                  alignItems={"end"}
                  display={"flex"}
                  flexDir={"row"}
                >
                  <Heading size="m" variant="italic">
                    {t("store.preview-card.title.price")} {card.price}
                  </Heading>
                  <Heading size="m" ml={2}>
                    ¢
                  </Heading>
                </Box>
              </VStack>
            </Flex>
          </Flex>
        </Flex>

        <Flex
          width={layoutWidth}
          gap={4}
          m={1000}
          mt={8}
          justifyContent={"space-between"}
          margin={"0 auto"}
        >
          <Coins />
          <HStack gap={4}>
            {notEnoughCash || noSpaceForSpecialCards ? (
              <Tooltip
                label={
                  noSpaceForSpecialCards
                    ? "You don't have enough space for another special card. Remove one to buy this card"
                    : "You don't have enough coins to buy this card"
                }
              >
                {buyButton}
              </Tooltip>
            ) : (
              buyButton
            )}

            <Button
              variant="outlineSecondaryGlow"
              onClick={() => navigate("/store")}
              height={"100%"}
            >
              {t("store.preview-card.labels.close")}
            </Button>
          </HStack>
        </Flex>
      </Flex>
      <PositionedDiscordLink />
    </Background>
  );
};

export default PreviewCardLayout;
