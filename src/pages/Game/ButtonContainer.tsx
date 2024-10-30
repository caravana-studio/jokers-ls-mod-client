import { Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { isMobile } from "react-device-detect";

export const ButtonContainer = ({ children }: PropsWithChildren) => {
  return isMobile ? (
    <>{children}</>
  ) : (
    <Flex flexDirection="column" alignItems="center" gap={4} width={"100%"}>
      {children}
    </Flex>
  );
};
