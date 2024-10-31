import { Flex, SystemStyleObject } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

interface FullScreenCardContainerProps extends PropsWithChildren {
  sx?: SystemStyleObject;
}

export const FullScreenCardContainer = ({
  children,
  sx,
}: FullScreenCardContainerProps) => {
  return (
    <Flex
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        ...sx,
      }}
      gap={3}
    >
      {children}
    </Flex>
  );
};
