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
import { useTranslation } from "react-i18next";
import { SpecialSlotItem } from "./SpecialSlotItem.tsx";

export const StoreContentMobile = () => {
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
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center"
          width="100%"
          overflow="scroll"
          pt={4}
          px={2}
        >
          <Box
            display="flex"
            w={["100%", "100%", "100%", "40%", "40%"]}
            flexDirection="column"
            pb={4}
          >
            <Flex flexDirection={"column"} gap={0} mb={4} mt={0}>
              <Heading
                variant="italic"
                size="l"
                ml={4}
                textAlign={{ base: "left", sm: "center" }}
              >
                {t("store.titles.level-game").toUpperCase()}
              </Heading>
              <Flex margin={{ base: "0", sm: "0 auto" }} mt={2}>
                <Coins rolling />
              </Flex>
            </Flex>
            <Flex justifyContent={{ base: "left", sm: "center" }}>
              <Packs />
            </Flex>
          </Box>
          <Box
            width={{ base: "100%", sm: "auto" }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            pb={4}
            pl={4}
            gap={2}
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
          <Box mb={3} mx={4}>
            <SpecialSlotItem />
          </Box>
          <Box
            className="game-tutorial-step-2"
            width={{ base: "95%", sm: "75%" }}
            background="rgba(0,0,0,0.5)"
            px={4}
            borderRadius="10px"
          >
            <Heading variant="italic" size="m" mt={4}>
              {t("store.titles.improve-plays").toUpperCase()}
            </Heading>
            <LevelUpTable shopItems={shopItems} isSmallScreen={true} />
          </Box>

          <Box
            display="flex"
            flexDirection={"row-reverse"}
            w={"100%"}
            justifyContent={"center"}
            gap={10}
            px={2}
          >
            <Flex
              width="100%"
              mx={2}
              justifyContent="center"
              my={6}
              mb={12}
              gap={6}
            >
              <RerollButton
                rerolled={rerolled}
                locked={locked}
                notEnoughCash={notEnoughCash}
                rerollCost={rerollCost}
                setRerolled={setRerolled}
                isSmallScreen={true}
                reroll={reroll}
              />
              <SpecialsButton
                specialCards={specialCards}
                isSmallScreen={true}
              />
              <NextLevelButton
                setLoading={setLoading}
                onShopSkip={onShopSkip}
                skipShop={skipShop}
                gameId={gameId}
                setHand={setHand}
                locked={false}
                isSmallScreen={true}
              />
            </Flex>
          </Box>
        </Box>
      </Flex>
    </>
  );
};
