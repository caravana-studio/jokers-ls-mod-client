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
import { useLocation, useNavigate } from "react-router-dom";
import { Background } from "../../components/Background.tsx";
import { CashSymbol } from "../../components/CashSymbol.tsx";
import OpenAnimation from "../../components/OpenAnimation.tsx";
import { CARD_WIDTH } from "../../constants/visualProps.ts";
import { useGame } from "../../dojo/queries/useGame.tsx";
import { useStore } from "../../providers/StoreProvider.tsx";
import theme from "../../theme/theme.ts";
import { getCardData } from "../../utils/getCardData.ts";
import { getTemporalCardText } from "../../utils/getTemporalCardText.ts";
import { Coins } from "../store/Coins.tsx";
import CachedImage from "../../components/CachedImage.tsx";
import { useTranslation } from "react-i18next";
import { PositionedGameMenu } from "../../components/GameMenu.tsx";
import { useResponsiveValues } from "../../theme/responsiveSettings.tsx";

const SIZE_MULTIPLIER = 1.3;
const { white, neonGreen } = theme.colors;

const MobilePreviewCardLayout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation(["store"]);
  const { cardScale } = useResponsiveValues();

  const { card, isPack, pack } = state || {};

  const [isOpenAnimationRunning, setIsOpenAnimationRunning] =
    useState<boolean>(false);

  const handleAnimationEnd = () => {
    setIsOpenAnimationRunning(false);
    setLockRedirection(false);
    close();
    navigate("/redirect/open-pack");
  };

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

  const buyButton = (
    <Button
      onClick={() => {
        if (isPack) {
          buyPack(pack);
          setIsOpenAnimationRunning(true);
          setLockRedirection(true);
        } else {
          buyCard(card);
          navigate(-1);
        }
      }}
      isDisabled={notEnoughCash || noSpaceForSpecialCards || locked}
      variant="outlinePrimaryGlow"
      width={"50%"}
    >
      {t("store.preview-card.labels.buy")}
    </Button>
  );

  return (
    <Background type="home" dark>
      <PositionedGameMenu />
      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        height={"100vh"}
        overflow="scroll"
      >
        <Flex
          flexDirection={"column"}
          justifyContent={"center"}
          width="90%"
          margin={"0 auto"}
          bg="rgba(0, 0, 0, 0.6)"
          borderRadius="25px"
          p={6}
          boxShadow={`0px 0px 10px 1px ${white}`}
        >
          <Flex flexDirection={"column"} ml={"30px"} flex="1" mb={4}>
            <Flex justifyContent="center" alignItems="center">
              <Heading size="md" variant="italic">
                {name}
              </Heading>
            </Flex>
          </Flex>

          <Flex justifyContent={"center"}>
            <Box width={`${CARD_WIDTH * cardScale * SIZE_MULTIPLIER}px`}>
              <OpenAnimation
                startAnimation={isOpenAnimationRunning}
                onAnimationEnd={() => handleAnimationEnd()}
              >
                <CachedImage
                  src={
                    isPack
                      ? `Cards/${card.img}.png`
                      : `Cards/${card.isSpecial || card.isModifier ? `big/${card?.card_id}.png` : `big/${card?.img}`}`
                  }
                  borderRadius="10px"
                />
              </OpenAnimation>
            </Box>
          </Flex>

          <VStack align="stretch" spacing={8} flex={1} mb={4}>
            {!isPack && (
              <Box mt={"20px"}>
                <Text
                  color="white"
                  fontSize="md"
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
                <Text color={neonGreen} fontSize="md">
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
          </VStack>
          <Box mb={4}>
            <Text
              color="white"
              fontSize="md"
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
            <Text color={neonGreen} fontSize="md">
              {description}
            </Text>
            {card.temporary && (
              <Text variant="neonGreen" size="l" pt={2}>
                {getTemporalCardText(card.remaining)}
              </Text>
            )}
          </Box>
          {isPack && (
            <Box mb={4}>
              <Text
                color="white"
                fontSize="md"
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
              <Text color={neonGreen} fontSize="md">
                {details?.split("\n").map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </Text>
            </Box>
          )}

          <Heading size="sm" variant="italic">
            {t("store.preview-card.title.price")} {card.price}
            <CashSymbol />
          </Heading>
        </Flex>

        <Flex
          width="100%"
          gap={4}
          m={10}
          mt={4}
          justifyContent={"center"}
          margin={"0 auto"}
        >
          <HStack gap={4} width={"70%"}>
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
              width={"50%"}
            >
              {t("store.preview-card.labels.close")}
            </Button>
          </HStack>
        </Flex>

        <Flex mt={4} justifyContent={"center"}>
          <Coins />
        </Flex>
      </Flex>
    </Background>
  );
};

export default MobilePreviewCardLayout;
