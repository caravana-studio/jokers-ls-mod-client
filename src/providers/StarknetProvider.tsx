"use client";
import React from "react";

import { mainnet, sepolia } from "@starknet-react/chains";
import {
  StarknetConfig,
  jsonRpcProvider,
  voyager
} from "@starknet-react/core";

import { Chain } from "@starknet-react/chains";
 
function rpc(chain: Chain) {
  return {
    nodeUrl: `https://starknet-mainnet.public.blastapi.io/rpc/v0_7`
  }
}
 
const provider = jsonRpcProvider({ rpc });

export function StarknetProvider({ children }: { children: React.ReactNode }) {
  return (
    <StarknetConfig
      chains={[mainnet, sepolia]}
      provider={jsonRpcProvider({
        rpc
      })}
      connectors={[]}
      explorer={voyager}
    >
      {children}
    </StarknetConfig>
  );
}
