import ControllerConnector from "@cartridge/connector/controller";
import { policies } from "./policies";

export const controller = new ControllerConnector({
  policies,
  rpc: import.meta.env.VITE_RPC_URL,
  preset: "jokers-of-neon",
});
