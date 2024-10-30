import { Box, Button, Flex, HStack, Heading, Text } from "@chakra-ui/react";
import { isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Background } from "../components/Background";
import CachedImage from "../components/CachedImage.tsx";
import { PositionedDiscordLink } from "../components/DiscordLink.tsx";
import { PositionedGameMenu } from "../components/GameMenu.tsx";
import { CARD_WIDTH } from "../constants/visualProps.ts";
import { Coins } from "../pages/store/Coins.tsx";
import theme from "../theme/theme";
import { CashSymbol } from "./CashSymbol.tsx";

const SIZE_MULTIPLIER = isMobile ? 1.3 : 2;
const { white, neonGreen } = theme.colors;

interface IStorePreviewComponent {
  buyButton: JSX.Element;
  image: JSX.Element;
  title: string;
  description: string;
  cardType?: string;
  extraDescription?: string;
  details?: string;
  price: number;
}

export const StorePreviewComponent = ({
  buyButton,
  image,
  title,
  description,
  cardType,
  extraDescription,
  details,
  price,
}: IStorePreviewComponent) => {
  const navigate = useNavigate();
  const { t } = useTranslation(["store"]);

  return (
    <Background type="home" dark scrollOnMobile>
      <PositionedGameMenu />
      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        minHeight={isMobile ? "100%" : "unset"}
        height={isMobile ? "unset" : "100%"}
      >
        <Flex
          flexDirection={"column"}
          justifyContent={"center"}
          width={{ base: "85%", sm: "60%" }}
          margin={"0 auto"}
          bg="rgba(0, 0, 0, 0.6)"
          borderRadius="25px"
          mt={4}
          p={6}
          boxShadow={`0px 0px 10px 1px ${white}`}
        >
          <Flex
            flexDirection={{ base: "column", sm: "row" }}
            alignItems="center"
            gap={4}
            flex="1"
            height="100%"
          >
            <Flex width={`${CARD_WIDTH * SIZE_MULTIPLIER + 30}px`}>
              {image}
            </Flex>

            <Flex
              flexDirection={"column"}
              width="100%"
              ml={{ base: "15px", sm: "30px" }}
              flex="1"
              height="100%"
              justifyContent={"space-between"}
            >
              <Flex justifyContent="space-between" alignItems="center">
                <Heading size={{ base: "sm", sm: "l" }} variant="italic">
                  {title}
                </Heading>
                {!isMobile && (
                  <CachedImage
                    src={`/logos/jn-logo.png`}
                    alt={"JN logo"}
                    width="120px"
                  />
                )}
              </Flex>

              {cardType && (
                <Box mt={"20px"}>
                  <Text
                    color="white"
                    fontSize={{ base: "md", sm: "lg" }}
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
                  <Text color={neonGreen} fontSize={{ base: "md", sm: "xl" }}>
                    {cardType}
                  </Text>
                </Box>
              )}
              <Box>
                <Text
                  color="white"
                  fontSize={{ base: "md", sm: "lg" }}
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
                <Text color={neonGreen} fontSize={{ base: "md", sm: "xl" }}>
                  {description}
                </Text>
                {extraDescription && (
                  <Text
                    variant="neonGreen"
                    fontSize={{ base: "md", sm: "xl" }}
                    pt={2}
                  >
                    {extraDescription}
                  </Text>
                )}
              </Box>

              {details && (
                <Box>
                  <Text
                    color="white"
                    fontSize={{ base: "md", sm: "lg" }}
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
                  <Text color={neonGreen} fontSize={{ base: "md", sm: "xl" }}>
                    {details?.split("\n").map((line, index) => (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </Text>
                </Box>
              )}
              <Box flex={1} alignItems={"end"} display={"flex"} flexDir={"row"}>
                <Heading fontSize={{ base: "sm", sm: "lg" }} variant="italic">
                  {t("store.preview-card.title.price")} {price}
                  <CashSymbol />
                </Heading>
              </Box>
            </Flex>
          </Flex>
        </Flex>

        <Flex
          width="60%"
          gap={4}
          m={1000}
          mt={{ base: 4, sm: 8 }}
          mb={4}
          justifyContent={"space-between"}
          margin={"0 auto"}
          flexDirection={{ base: "column", sm: "row" }}
        >
          <Coins />
          <HStack gap={4}>
            {buyButton}

            <Button
              variant="outlineSecondaryGlow"
              onClick={() => navigate("/store")}
              height={{ base: "40px", sm: "100%" }}
              width={{ base: "50%", sm: "unset" }}
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
