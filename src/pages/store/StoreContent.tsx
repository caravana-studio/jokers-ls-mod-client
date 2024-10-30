import { Box, Flex, Heading } from "@chakra-ui/react";
import { PositionedGameMenu } from "../../components/GameMenu.tsx";
import { Coins } from "./Coins.tsx";
import { Packs } from "./Packs.tsx";
import { StoreCardsRow } from "./StoreCardsRow.tsx";
import useStoreContent from "./UseStoreContent.ts";
import LevelUpTable from "./StoreElements/LevelUpTable.tsx";
import RerollButton from "./StoreElements/RerollButton.tsx";
import SpecialsButton from "./StoreElements/SpecialsButton.tsx";
import NextLevelButton from "./StoreElements/NextLevelButton.tsx";
import { PositionedDiscordLink } from "../../components/DiscordLink.tsx";
import { useTranslation } from "react-i18next";
import CachedImage from "../../components/CachedImage.tsx";
import { SpecialSlotItem } from "./SpecialSlotItem.tsx";

export const StoreContent = () => {
  const {
    rerollCost,
    notEnoughCash,
    rerolled,
    setRerolled,
    setLoading,
    specialCards,
    skipShop,
    setRun,
    reroll,
    locked,
    shopItems,
    onShopSkip,
    gameId,
    setHand,
  } = useStoreContent();

  const { t } = useTranslation(["store"]);

  return (
    <>
      <PositionedGameMenu
        showTutorial={() => {
          setRun(true);
        }}
      />
      <Flex
        width="100%"
        height="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          display="flex"
          flexWrap="nowrap"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          overflow={"auto"}
          pt={0}
          px={{ md: 0, lg: 4 }}
          overflowY={"hidden"}
        >
          <Box
            display="flex"
            h={"100%"}
            flexDirection="column"
            justifyContent="space-between"
            pb={0}
            pt={0}
            pl={"2%"}
          >
            <Flex flexDirection={"column"} gap={4} mb={0}>
              <Heading variant="italic" size="l" ml={4}>
                {t("store.titles.level-game").toUpperCase()}
              </Heading>
            </Flex>
            <Packs />
            <Flex mt={8} width={"100%"}>
              <LevelUpTable shopItems={shopItems} isSmallScreen={false} />
            </Flex>
            <Coins rolling />
          </Box>
          <Box
            w={"auto"}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems={"flex-start"}
            pb={0}
            gap={6}
          >
            <Box className="game-tutorial-step-3">
              {shopItems.commonCards.length > 0 && (
                <StoreCardsRow
                  cards={shopItems.commonCards}
                  title={t("store.titles.traditional")}
                />
              )}
            </Box>
            <Box className="game-tutorial-step-4">
              {shopItems.modifierCards.length > 0 && (
                <StoreCardsRow
                  cards={shopItems.modifierCards}
                  title={t("store.titles.modifiers")}
                />
              )}
            </Box>
            <Box className="game-tutorial-step-5">
              {shopItems.specialCards.length > 0 && (
                <StoreCardsRow
                  cards={shopItems.specialCards}
                  title={t("store.titles.special")}
                />
              )}
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection={"column"}
            w={"15%"}
            h={"100%"}
            justifyContent={"space-between"}
            gap={10}
            px={0}
            pr={"2%"}
          >
            <>
              <NextLevelButton
                setLoading={setLoading}
                onShopSkip={onShopSkip}
                skipShop={skipShop}
                gameId={gameId}
                setHand={setHand}
                locked={false}
                isSmallScreen={false}
              />
              <SpecialSlotItem />
              <Flex flexDirection="column" gap={14}>
                <RerollButton
                  rerolled={rerolled}
                  locked={locked}
                  notEnoughCash={notEnoughCash}
                  rerollCost={rerollCost}
                  setRerolled={setRerolled}
                  isSmallScreen={false}
                  reroll={reroll}
                />
                <SpecialsButton
                  specialCards={specialCards}
                  isSmallScreen={false}
                />
                <CachedImage
                  src="/logos/logo-variant.svg"
                  alt="store-bg"
                  width="90%"
                />
              </Flex>
            </>
          </Box>
        </Box>
      </Flex>
      <PositionedDiscordLink />
    </>
  );
};
