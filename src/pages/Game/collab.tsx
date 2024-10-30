import React from "react";
import { Flex, Text, Image, Box } from "@chakra-ui/react";
import CachedImage from "../../components/CachedImage";

export const Collab: React.FC = () => {
  return (
    <Flex align="center" justify="center">
      <CachedImage
        src="/logos/logo-merge.png"
        alt="JON Logo"
        width="20%"
        objectFit="contain"
      />

      <Text color="white" fontSize="2rem" fontWeight="bold">
        ×
      </Text>

      <Image src="/logos/ls-logo.png" alt="Skull Logo" width="18%" />
    </Flex>
  );
};
