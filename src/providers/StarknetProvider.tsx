"use client";
import { mainnet, sepolia } from "@starknet-react/chains";
import { StarknetConfig, jsonRpcProvider, voyager } from "@starknet-react/core";
import React from "react";

import cartridgeConnector from "../cartridgeConnector";

/* function rpc(chain: Chain) {
  return {
    nodeUrl: `https://starknet-mainnet.public.blastapi.io/rpc/v0_7`
  }
} */
function rpc() {
  return {
    nodeUrl: import.meta.env.VITE_RPC_URL,
  };
}

export function StarknetProvider({ children }: { children: React.ReactNode }) {
  const connectors = [cartridgeConnector];
  const provider = jsonRpcProvider({ rpc });

  return (
    <StarknetConfig
      chains={[mainnet, sepolia]}
      provider={provider}
      connectors={connectors}
      explorer={voyager}
    >
      {children}
    </StarknetConfig>
  );
}
