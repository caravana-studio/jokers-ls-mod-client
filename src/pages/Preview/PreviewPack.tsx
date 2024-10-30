import { Button, Tooltip } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import CachedImage from "../../components/CachedImage.tsx";
import { StorePreviewComponent } from "../../components/StorePreviewComponent.tsx";
import { useGame } from "../../dojo/queries/useGame.tsx";
import { useStore } from "../../providers/StoreProvider.tsx";
import { getCardData } from "../../utils/getCardData.ts";

export const PreviewPack = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { card, pack } = state || {};

  const [buyDisabled, setBuyDisabled] = useState(false);
  const { t } = useTranslation("store", { keyPrefix: "store.preview-card" });

  if (!card) {
    return <p>Card not found.</p>;
  }

  const game = useGame();
  const { buyPack, locked } = useStore();
  const cash = game?.cash ?? 0;
  const { name, description, details } = getCardData(card, true);

  const notEnoughCash = !card.price || cash < card.price;

  const buyButton = (
    <Button
      onClick={() => {
        setBuyDisabled(true);
        buyPack(pack)
          .then((response) => {
            if (response) {
              navigate("/redirect/open-pack");
            } else {
              setBuyDisabled(false);
            }
          })
          .catch(() => {
            setBuyDisabled(false);
          });
      }}
      isDisabled={notEnoughCash || locked || buyDisabled}
      variant="outlinePrimaryGlow"
      
      height={{ base: "40px", sm: "100%" }}
      width={{ base: "50%", sm: "unset" }}
    >
      {t("labels.buy")}
    </Button>
  );

  const tooltipButton = notEnoughCash ? (
    <Tooltip label={t("labels.tooltip.no-coins")}>{buyButton}</Tooltip>
  ) : (
    buyButton
  );

  const image = (
    <CachedImage
      src={`/Cards/${card.img}.png`}
      alt={`Pack`}
      borderRadius="10px"
    />
  );
  return (
    <StorePreviewComponent
      buyButton={tooltipButton}
      image={image}
      title={name}
      description={description}
      price={card.price}
      details={details}
    />
  );
};
