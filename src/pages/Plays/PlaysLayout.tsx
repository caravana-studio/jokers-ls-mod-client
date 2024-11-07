import { Button, Flex, Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Background } from "../../components/Background";
import { PositionedDiscordLink } from "../../components/DiscordLink";
import { PositionedGameMenu } from "../../components/GameMenu";
import { useGameContext } from "../../providers/GameProvider";
import { useResponsiveValues } from "../../theme/responsiveSettings";
import { PlaysAvailableTable } from "./PlaysAvailableTable";

export const PlaysLayout = () => {
  const { t } = useTranslation(["game"]);
  const { isSmallScreen } = useResponsiveValues();

  const { forceRedirectBasedOnGameState } = useGameContext();

  return (
    <Background type="home" dark bgDecoration>
      <PositionedGameMenu decoratedPage />
      <Flex
        py={2}
        px={8}
        flexDirection={"column"}
        justifyContent={"flex-start"}
        width={{ base: "100%", sm: "75%", md: "50%" }}
        margin={"0 auto"}
        height={"100vh"}
      >
        <Heading
          size={{ base: "sm", sm: "lg" }}
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
          onClick={() => forceRedirectBasedOnGameState()}
        >
          {t("game.plays.go-back-btn")}
        </Button>
      </Flex>
      {!isSmallScreen && <PositionedDiscordLink />}
    </Background>
  );
};
