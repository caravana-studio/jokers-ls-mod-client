"use client";
import { mainnet } from "@starknet-react/chains";
import React from "react";
import {
  Connector,
  StarknetConfig,
  jsonRpcProvider,
  voyager,
} from "@starknet-react/core";
import { controller } from "../dojo/controller/controller";

function rpc() {
  return {
    nodeUrl: import.meta.env.VITE_RPC_URL,
  };
}

export function StarknetProvider({ children }: { children: React.ReactNode }) {
  const provider = jsonRpcProvider({ rpc });

  return (
    <StarknetConfig
      chains={[mainnet]}
      provider={provider}
      connectors={[controller as unknown as Connector]}
      explorer={voyager}
      autoConnect
    >
      {children}
    </StarknetConfig>
  );
}
