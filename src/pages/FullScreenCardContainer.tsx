import { Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { CARD_HEIGHT, CARD_WIDTH } from "../constants/visualProps";

export const FullScreenCardContainer = ({ children }: PropsWithChildren) => {
  return (
    <Flex
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
      }}
      gap={3}
    >
      {children}
    </Flex>
  );
};
