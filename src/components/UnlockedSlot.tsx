import { Box } from "@chakra-ui/react";
import { CARD_HEIGHT, CARD_WIDTH } from "../constants/visualProps.ts";
import CachedImage from "./CachedImage.tsx";

interface IUnlockedSlotProps {
  scale?: number;
}

export const FilledUnlockedSlot = ({ scale = 1 }: IUnlockedSlotProps) => {
  return (
    <CachedImage
      src="/store/unlocked-slot.png"
      alt="slot-icon"
      width={`${CARD_WIDTH * scale}`}
      height={`${CARD_HEIGHT * scale}`}
      minWidth={`${CARD_WIDTH * scale}`}
    />
  );
};

export const UnlockedSlot = ({ scale = 1 }: IUnlockedSlotProps) => {
  return (
    <Box
      width={`${CARD_WIDTH * scale}`}
      height={`${CARD_HEIGHT * scale}`}
      minWidth={`${CARD_WIDTH * scale}`}
      border={"1px solid white"}
      borderRadius={{ base: "10px", sm: "15px" }}
      boxShadow={`0px 0px 2px 1px white, 0px 0px 2px 1px white inset`}
    ></Box>
  );
};
