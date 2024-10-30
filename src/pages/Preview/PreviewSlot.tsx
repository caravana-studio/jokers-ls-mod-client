import { Button, Tooltip } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CachedImage from "../../components/CachedImage.tsx";
import { StorePreviewComponent } from "../../components/StorePreviewComponent.tsx";
import { useGame } from "../../dojo/queries/useGame.tsx";
import { useSpecialCardSlotItem } from "../../dojo/queries/useSpecialCardSlotItem.tsx";
import { useStore } from "../../providers/StoreProvider.tsx";

export const PreviewSlot = () => {
  const specialSlotItem = useSpecialCardSlotItem();
  const navigate = useNavigate();

  const price = specialSlotItem?.cost ?? 0;
  const [buyDisabled, setBuyDisabled] = useState(false);
  const { t } = useTranslation("store", { keyPrefix: "store.preview-card" });

  const game = useGame();
  const { buySpecialSlot, locked } = useStore();
  const cash = game?.cash ?? 0;

  const notEnoughCash = !price || cash < price;

  const buyButton = (
    <Button
      onClick={() => {
        buySpecialSlot();
        navigate(-1);
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
      src={`/store/slot-image.png`}
      alt={`special card slot`}
      pl={4}
      pt={4}
    />
  );
  return (
    <StorePreviewComponent
      buyButton={tooltipButton}
      image={image}
      title={t("slot-title")}
      description={t("slot-description")}
      price={price}
    />
  );
};
