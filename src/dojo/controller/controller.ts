import ControllerConnector from "@cartridge/connector/controller";
import { policies } from "./policies";

const DOJO_NAMESPACE =
  import.meta.env.VITE_DOJO_NAMESPACE;

const StarknetChainId = {
  SN_MAIN: "0x534e5f4d41494e",
  SN_SEPOLIA: "0x534e5f5345504f4c4941",
}

const chain = import.meta.env.VITE_PUBLIC_CHAIN;
const defaultChainId = chain === "mainnet" ? StarknetChainId.SN_MAIN : StarknetChainId.SN_SEPOLIA;
const RPC_URL = import.meta.env.VITE_RPC_URL;

export const controller =
  new ControllerConnector({
    policies,
    chains: [{ rpcUrl: RPC_URL }],
    defaultChainId,
    namespace: DOJO_NAMESPACE,
    preset: "jokers-of-neon",
  });