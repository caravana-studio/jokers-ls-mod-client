import { Button, Tooltip } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import CachedImage from "../../components/CachedImage.tsx";
import { StorePreviewComponent } from "../../components/StorePreviewComponent.tsx";
import { useGame } from "../../dojo/queries/useGame.tsx";
import { useStore } from "../../providers/StoreProvider.tsx";
import { getCardData } from "../../utils/getCardData.ts";
import { getTemporalCardText } from "../../utils/getTemporalCardText.ts";
import MobilePreviewCard from "./PreviewCardMobile.tsx";

const PreviewCard = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { card } = state || {};

  const [buyDisabled, setBuyDisabled] = useState(false);
  const { t } = useTranslation("store", {
    keyPrefix: "store.preview-card.labels",
  });

  if (!card) {
    return <p>Card not found.</p>;
  }

  const game = useGame();
  const { buyCard, locked, setLockRedirection } = useStore();
  const cash = game?.cash ?? 0;
  const { name, description } = getCardData(card, false);
  const specialMaxLength = game?.len_max_current_special_cards ?? 0;
  const specialLength = game?.len_current_special_cards ?? 0;

  const notEnoughCash = !card.price || cash < card.price;
  const noSpaceForSpecialCards =
    card.isSpecial && specialLength >= specialMaxLength;

  const buyButton = (
    <Button
      onClick={() => {
        buyCard(card);
        navigate(-1);
      }}
      isDisabled={
        notEnoughCash || noSpaceForSpecialCards || locked || buyDisabled
      }
      variant="outlinePrimaryGlow"
      height={{ base: "40px", sm: "100%" }}
      width={{ base: "50%", sm: "unset" }}
    >
      {t("buy")}
    </Button>
  );

  const tooltipButton =
    notEnoughCash || noSpaceForSpecialCards ? (
      <Tooltip
        label={
          noSpaceForSpecialCards ? t("tooltip.no-space") : t("tooltip.no-coins")
        }
      >
        {buyButton}
      </Tooltip>
    ) : (
      buyButton
    );

  const image = (
    <CachedImage
      src={`/Cards/${card.isSpecial || card.isModifier ? `big/${card?.card_id}.png` : `big/${card?.img}`}`}
      alt={`Card: ${card.name}`}
      borderRadius="10px"
    />
  );

  const cardType = card.isSpecial
    ? t("special")
    : card.isModifier
      ? t("modifier")
      : t("traditional");

  const temporary = card.temporary && " (" + t("temporary") + ")";

  return (
    <StorePreviewComponent
      buyButton={tooltipButton}
      image={image}
      title={name}
      cardType={card.temporary ? cardType + temporary : cardType}
      description={description}
      extraDescription={card.isTemporary && getTemporalCardText(card.remaining)}
      price={card.price}
    />
  );
};

export default PreviewCard;
