import { Flex, Text } from "@chakra-ui/react";
import { RollingNumber } from "../../components/RollingNumber";
import { useGameContext } from "../../providers/GameProvider";
import { useTranslation } from "react-i18next";
import { useResponsiveValues } from "../../theme/responsiveSettings";

export const Coins = () => {
  const { cash } = useGameContext();
  const { t } = useTranslation(["game"]);
  const { isSmallScreen } = useResponsiveValues();

  return (
    <Flex
      flexDirection={isSmallScreen ? "row" : "column"}
      alignItems="center"
      gap={0.5}
    >
      <Text size="m" pl={{ base: 1, sm: 0 }}>
        {t("game.hand-section.my-coins")}
      </Text>
      <Flex
        gap={1.5}
        alignItems="center"
        justifyContent="center"
        border={isSmallScreen ? "none" : "1px solid white"}
        borderRadius="8px"
        color="white"
        minWidth={{ base: "50px", sm: "70px" }}
        p={{ base: "5px 5px", sm: "15px 6px" }}
        fontSize="13px"
      >
        <RollingNumber n={cash} />
      </Flex>
    </Flex>
  );
};
