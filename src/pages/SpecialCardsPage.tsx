import { Box, Button, Flex, Text, Tooltip, useTheme } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Background } from "../components/Background";
import { Card } from "../types/Card";

import { useTranslation } from "react-i18next";
import CachedImage from "../components/CachedImage";
import { ConfirmationModal } from "../components/ConfirmationModal";
import { PositionedDiscordLink } from "../components/DiscordLink";
import { PositionedGameMenu } from "../components/GameMenu";
import { LockedSlot } from "../components/LockedSlot";
import { TemporalBadge } from "../components/TiltCard";
import { UnlockedSlot } from "../components/UnlockedSlot";
import { MAX_SPECIAL_CARDS } from "../constants/config";
import { CARD_HEIGHT, CARD_WIDTH } from "../constants/visualProps";
import { useGame } from "../dojo/queries/useGame";
import { useGameContext } from "../providers/GameProvider";
import { useResponsiveValues } from "../theme/responsiveSettings";
import { getTooltip } from "../utils/getTooltip";
import { FullScreenCardContainer } from "./FullScreenCardContainer";

export const SpecialCardsPage = () => {
  const navigate = useNavigate();
  const { colors } = useTheme();

  const { t } = useTranslation("intermediate-screens", {
    keyPrefix: "special-cards",
  });

  const { discardSpecialCard, specialCards } = useGameContext();

  const [discardedCards, setDiscardedCards] = useState<Card[]>([]);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const [preselectedCard, setPreselectedCard] = useState<Card | undefined>();

  const game = useGame();

  const unlockedSpecialSlots = game?.len_max_current_special_cards ?? 1;

  const freeUnlockedSlots = unlockedSpecialSlots - specialCards.length;
  const lockedSlots =
    unlockedSpecialSlots === MAX_SPECIAL_CARDS
      ? 0
      : Math.max(1, 5 - unlockedSpecialSlots);

  const { isSmallScreen, cardScale } = useResponsiveValues();

  const scale = isSmallScreen ? cardScale * 1.2 : cardScale * 1.4;

  return (
    <Background type="home" dark bgDecoration>
      <PositionedGameMenu decoratedPage />

      <Flex
        height={"100%"}
        justifyContent="center"
        flexDirection="column"
        gap={4}
        px={6}
      >
        <Flex gap={4} flexDirection="column">
          <Text mx={2} size="l">
            {t("title")}
          </Text>
          <FullScreenCardContainer>
            {specialCards.map((card) => {
              const isDiscarded = discardedCards
                .map((card) => card.card_id)
                .includes(card.card_id!);

              return (
                card &&
                !isDiscarded && (
                  <Box
                    key={card.id}
                    mx={{ base: 0, sm: 1 }}
                    p={1}
                    sx={{
                      borderRadius: { base: "10px", sm: "17px" },
                      border:
                        preselectedCard?.card_id === card.card_id
                          ? `2px solid ${colors.blueLight}`
                          : "2px solid transparent",
                      boxShadow:
                        preselectedCard?.card_id === card.card_id
                          ? `0px 0px 15px 12px ${colors.blue}`
                          : "none",
                    }}
                  >
                    <Tooltip label={getTooltip(card, false)}>
                      <Box
                        position="relative"
                        w={`${CARD_WIDTH * scale}px`}
                        h={`${CARD_HEIGHT * scale}px`}
                        cursor={"pointer"}
                      >
                        <CachedImage
                          borderRadius={{ base: "5px", sm: "8px" }}
                          src={`Cards/${card.img}`}
                          alt={card.img}
                          w="100%"
                          height="100%"
                          onClick={() => {
                            setPreselectedCard((prev) =>
                              prev === card ? undefined : card
                            );
                          }}
                        />
                        {card.temporary && (
                          <TemporalBadge
                            remaining={card.remaining ?? 1}
                            scale={scale}
                          />
                        )}
                      </Box>
                    </Tooltip>
                  </Box>
                )
              );
            })}
            {Array.from({ length: freeUnlockedSlots }).map((_, index) => (
              <Box mx={1.5} p={1}>
                <UnlockedSlot scale={scale} key={`unlocked-${index}`} />
              </Box>
            ))}
            {Array.from({ length: lockedSlots }).map((_, index) => (
              <Box mx={1.5} p={1}>
                <LockedSlot scale={scale} key={`locked-${index}`} />
              </Box>
            ))}
          </FullScreenCardContainer>
          <Flex
            flexDirection={"row"}
            justifyContent="space-between"
            gap={4}
            mx={4}
          >
            <Button
              fontSize={12}
              onClick={() => {
                navigate(-1);
              }}
              width={isSmallScreen ? "50%" : "unset"}
            >
              {t("go-back")}
            </Button>
            <Button
              isDisabled={!preselectedCard}
              variant={!preselectedCard ? "defaultOutline" : "secondarySolid"}
              fontSize={12}
              onClick={() => {
                setConfirmationModalOpen(true);
              }}
              width={isSmallScreen ? "50%" : "unset"}
            >
              {t("remove")}
            </Button>
          </Flex>
        </Flex>
      </Flex>
      {confirmationModalOpen && (
        <ConfirmationModal
          close={() => setConfirmationModalOpen(false)}
          title={t("confirmation-modal.title")}
          description={t("confirmation-modal.description")}
          onConfirm={() => {
            setConfirmationModalOpen(false);
            preselectedCard &&
              discardSpecialCard(preselectedCard.idx).then((response) => {
                if (response) {
                  setDiscardedCards((prev) => [...prev, preselectedCard]);
                  setPreselectedCard(undefined);
                }
              });
          }}
        />
      )}
      {!isSmallScreen && <PositionedDiscordLink />}
    </Background>
  );
};
