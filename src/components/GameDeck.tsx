import { Flex, Image, Text } from "@chakra-ui/react";
import { CARD_WIDTH_PX } from "../constants/visualProps.ts";
import { useDeck } from "../dojo/queries/useDeck.tsx";

export const GameDeck = () => {
  const deck = useDeck();

  return (
    <Flex flexDirection="column" alignItems='flex-end' gap={2} className="game-tutorial-step-8">
      <Text size='s' mr={2}>
        {`${deck.currentLength}/${deck.size}`}
      </Text>
      <Image
        sx={{ maxWidth: "unset" }}
        src={`Cards/Backs/back.png`}
        alt={`Ccard back`}
        width={CARD_WIDTH_PX}
      />
    </Flex>
  );
};
