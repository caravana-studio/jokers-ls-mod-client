import React from "react";
import { Flex, Text, Image, Box } from "@chakra-ui/react";
import CachedImage from "../../components/CachedImage";

export const Collab: React.FC = () => {
  return (
    <Flex align="center" justify="center" gap={1}>
      <CachedImage
        src="/logos/logo-merge.png"
        alt="JON Logo"
        width="40px"
        objectFit="contain"
      />

      <Text color="white" fontSize="1.5rem" fontFamily='serif'>
        ×
      </Text>

      <Image src="/logos/ls-logo.png" alt="Skull Logo" width="32px" />
    </Flex>
  );
};
