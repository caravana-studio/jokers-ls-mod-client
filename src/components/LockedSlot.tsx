import { Tooltip } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { CARD_HEIGHT, CARD_WIDTH } from "../constants/visualProps.ts";
import CachedImage from "./CachedImage.tsx";

interface ILockedSlotProps {
  scale?: number;
}

export const LockedSlot = ({ scale = 1 }: ILockedSlotProps) => {
  const { t } = useTranslation("game", { keyPrefix: "game.special-cards" });

  return (
    <Tooltip label={t("locked-slot")}>
      <CachedImage
        src="/store/locked-slot.png"
        alt="slot-icon"
        width={`${CARD_WIDTH * scale}`}
        height={`${CARD_HEIGHT * scale}`}
        minWidth={`${CARD_WIDTH * scale}`}
      />
    </Tooltip>
  );
};
