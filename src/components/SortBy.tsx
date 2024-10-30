import { Flex, Img, Text, Tooltip } from "@chakra-ui/react";
import { SortBy as SortByEnum } from "../enums/sortBy.ts";
import { useGameContext } from "../providers/GameProvider";
import { useTranslation } from "react-i18next";
import { useResponsiveValues } from "../theme/responsiveSettings.tsx";
import CachedImage from "./CachedImage.tsx";

export const SortBy = () => {
  const { sortBy, toggleSortBy } = useGameContext();
  const { t } = useTranslation(["game"]);
  const { isSmallScreen } = useResponsiveValues();

  return (
    <Flex
      flexDirection={isSmallScreen ? "row" : "column"}
      alignItems="center"
      gap={0.5}
    >
      <Text size="m" pl={{ base: 1, sm: 0 }}>
        {t("game.hand-section.sort-by.sort-by-title")}
      </Text>
      <Flex
        gap={0.5}
        alignItems="center"
        justifyContent="center"
        border={isSmallScreen ? "none" : "1px solid white"}
        borderRadius="8px"
        minWidth={{ base: "50px", sm: "70px" }}
        p={{ base: "5px 5px", sm: "8px 5px" }}
      >
        <Tooltip
          label={t("game.hand-section.sort-by.tooltip.suit")}
          placement="bottom"
          size="sm"
        >
          <CachedImage
            cursor="pointer"
            src={`sort/heart-${sortBy === SortByEnum.SUIT ? "on" : "off"}.png`}
            height={{ base: 5, sm: 8 }}
            onClick={() => {
              toggleSortBy();
            }}
          />
        </Tooltip>
        <Tooltip
          label={t("game.hand-section.sort-by.tooltip.rank")}
          placement="bottom"
          size="sm"
        >
          <CachedImage
            cursor="pointer"
            src={`sort/rank-${sortBy === SortByEnum.SUIT ? "off" : "on"}.png`}
            height={{ base: 5, sm: 8 }}
            onClick={() => {
              toggleSortBy();
            }}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};
