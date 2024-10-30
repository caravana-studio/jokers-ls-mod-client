import { Button, Flex, Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Background } from "../../components/Background";
import { PositionedDiscordLink } from "../../components/DiscordLink";
import { PositionedGameMenu } from "../../components/GameMenu";
import { PlaysAvailableTable } from "./PlaysAvailableTable";
import { useResponsiveValues } from "../../theme/responsiveSettings";

export const PlaysLayout = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(["game"]);
  const { isSmallScreen } = useResponsiveValues();

  return (
    <Background type="game" dark bgDecoration>
      <PositionedGameMenu decoratedPage />
      <Flex
        py={2}
        px={8}
        flexDirection={"column"}
        justifyContent={"center"}
        width={{ base: "100%", sm: "75%", md: "50%" }}
        margin={"0 auto"}
        height={"100vh"}
      >
        <Heading
          mt={{ base: 0, sm: 20, md: 20 }}
          size={{ base: "sm", sm: "md" }}
          variant="italic"
          color="white"
          textAlign={"center"}
          mb={isSmallScreen ? 10 : 8}
        >
          {t("game.plays.title").toUpperCase()}
        </Heading>
        <PlaysAvailableTable maxHeight={{ base: "52%", lg: "60%" }} />
        <Button
          className="game-tutorial-step-4"
          mt={8}
          mb={4}
          w="100%"
          size="md"
          variant="solid"
          onClick={() =>
            navigate("/demo", { state: { skipRageAnimation: true } })
          }
        >
          {t("game.plays.go-back-btn")}
        </Button>
      </Flex>
      {!isSmallScreen && <PositionedDiscordLink />}
    </Background>
  );
};
