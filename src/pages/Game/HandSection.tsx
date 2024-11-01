import {
  Box,
  Button,
  Flex,
  GridItem,
  Heading,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useDndContext, useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import { isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";
import { AnimatedCard } from "../../components/AnimatedCard";
import { ShowPlays } from "../../components/ShowPlays";
import { SortBy } from "../../components/SortBy";
import { TiltCard } from "../../components/TiltCard";
import { HAND_SECTION_ID } from "../../constants/general";
import { CARD_HEIGHT, CARD_WIDTH } from "../../constants/visualProps";
import { useGameContext } from "../../providers/GameProvider";
import { useResponsiveValues } from "../../theme/responsiveSettings";

const TRANSLATE_Y_PX = isMobile ? 3 : 10;

export const HandSection = () => {
  const {
    hand,
    preSelectedCards,
    togglePreselected,
    discardEffectCard,
    preSelectedModifiers,
    roundRewards,
  } = useGameContext();

  const [discarding, setDiscarding] = useState(false);

  const handsLeft = 1;

  const { activeNode } = useDndContext();

  const { setNodeRef } = useDroppable({
    id: HAND_SECTION_ID,
  });

  const cardIsPreselected = (cardIndex: number) => {
    return (
      preSelectedCards.filter((idx) => idx === cardIndex).length > 0 ||
      Object.values(preSelectedModifiers).some((array) =>
        array.includes(cardIndex)
      )
    );
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [menuIdx, setMenuIdx] = useState<number | undefined>();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);
  const { t } = useTranslation(["game"]);
  const { cardScale, isSmallScreen } = useResponsiveValues();

  const cardWidth = CARD_WIDTH * cardScale;
  const cardHeight = CARD_HEIGHT * cardScale;

  return (
    <>
      <Box
        pt={16}
        px={2}
        className="game-tutorial-step-2 tutorial-modifiers-step-1"
        ref={setNodeRef}
        height={isSmallScreen ? cardHeight : "100%"}
        display={"flex"}
        alignItems={"end"}
        position={"relative"}
      >
        <Box mb={"20px"} mr="10px">
          <SortBy />
        </Box>
        <SimpleGrid
          sx={{
            opacity: !roundRewards ? 1 : 0.3,
            minWidth: `${cardWidth * 4}px`,
            maxWidth: `${cardWidth * 6.5}px`,
          }}
          columns={hand.length}
          position="relative"
        >
          {hand.map((card, index) => {
            const isPreselected = cardIsPreselected(card.idx);
            return (
              <GridItem
                zIndex={1000}
                key={card.idx + "-" + index}
                sx={{
                  transform: ` rotate(${
                    (index - hand.length / 2 + 0.5) * 3
                  }deg) translateY(${Math.abs(index - hand.length / 2 + 0.5) * TRANSLATE_Y_PX}px)`,
                }}
                w="100%"
                onContextMenu={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setMenuIdx(card.idx);
                  onOpen();
                }}
                className={
                  card.isModifier ? "tutorial-modifiers-step-2" : undefined
                }
                onMouseEnter={() => setHoveredCard(card.idx)}
                onMouseLeave={() => {
                  setHoveredCard(null);
                  setHoveredButton(null);
                }}
                position="relative"
              >
                {card.isModifier && !isPreselected && (
                  <Flex
                    position={"absolute"}
                    zIndex={7}
                    bottom={"5px"}
                    left={"5px"}
                    borderRadius={"10px"}
                    background={"violet"}
                  >
                    {hoveredCard === card.idx && (
                      <Button
                        height={8}
                        fontSize="8px"
                        px={"16px"}
                        borderRadius={"10px"}
                        size={isSmallScreen ? "xs" : "md"}
                        variant={"discardSecondarySolid"}
                        onMouseEnter={() => setHoveredButton(card.idx)}
                        display="flex"
                        gap={4}
                        isDisabled={discarding}
                        onClick={(e) => {
                          setDiscarding(true);
                          e.stopPropagation();
                          setHoveredButton(null);
                          discardEffectCard(card.idx).then((_) => {
                            setDiscarding(false);
                          });
                          onClose();
                        }}
                      >
                        <Text fontSize="10px">X</Text>
                        {hoveredButton === card.idx && (
                          <Text fontSize="10px">
                            {t("game.hand-section.modifier-change")}
                          </Text>
                        )}
                      </Button>
                    )}
                  </Flex>
                )}
                <AnimatedCard idx={card.idx} discarded={card.discarded}>
                  <Box
                    sx={{
                      borderRadius: "8px",
                      transform: isPreselected
                        ? `translateY(-40px)`
                        : "translateY(0px)",
                      transition: "transform 0.3s ease, box-shadow 0.5s ease",
                      boxShadow: isPreselected ? "0px 0px 10px 6px white" : "",
                    }}
                  >
                    <TiltCard
                      card={card}
                      scale={cardScale}
                      cursor={"pointer"}
                      onClick={() => {
                        togglePreselected(card.idx);
                      }}
                    />
                  </Box>
                </AnimatedCard>
              </GridItem>
            );
          })}
        </SimpleGrid>
        <Box mb={"20px"} ml="40px">
          <ShowPlays />
        </Box>
      </Box>
      {/* {handsLeft === 0 && (
        <Heading
          ml={{ base: "0", md: "100px" }}
          size={{ base: "sm", md: "md" }}
          variant="italic"
          textAlign="center"
          bottom={{ base: "70px", md: "100px" }}
          sx={{ position: "fixed" }}
        >
          {t("game.hand-section.no-cards-label")}
        </Heading>
      )} */}
    </>
  );
};
