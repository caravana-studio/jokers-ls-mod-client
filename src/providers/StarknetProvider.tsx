"use client";
import React from "react";

import { mainnet, sepolia } from "@starknet-react/chains";
import {
    StarknetConfig,
    publicProvider,
    voyager
} from "@starknet-react/core";

export function StarknetProvider({ children }: { children: React.ReactNode }) {
  return (
    <StarknetConfig
      chains={[mainnet, sepolia]}
      provider={publicProvider()}
      connectors={[]}
      explorer={voyager}
    >
      {children}
    </StarknetConfig>
  );
}
