import { Box, Center, Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useGame } from "../../dojo/queries/useGame";
import { BLUE_LIGHT, VIOLET } from "../../theme/colors";

export const LevelBox = () => {
  const { t } = useTranslation("game", {
    keyPrefix: "game.compact-round-data",
  });
  const game = useGame();
  const level = game?.level ?? 0;
  return (
    <Center>
      <Box
        bg={`linear-gradient(to right, ${BLUE_LIGHT} 50%, ${VIOLET} 50%) `}
        p="2px"
        borderRadius="11px"
        mb={0.5}
      >
        <Box bg="black" borderRadius="9px" px={5} py={0.25}>
          <Heading
            fontSize="11px"
            textTransform="uppercase"
            variant="italic"
            color="white"
            fontWeight="bold"
          >
            {t("round", { round: level })}
          </Heading>
        </Box>
      </Box>
    </Center>
  );
};
