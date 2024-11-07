import { useAccount } from "@starknet-react/core";
import { useContext } from "react";
import { Account } from "starknet";
import { DojoContext } from "./DojoContext";

export const useDojo = () => {
  const context = useContext(DojoContext);
  if (!context)
    throw new Error("The `useDojo` hook must be used within a `DojoProvider`");

  const { account } = useAccount();
  return {
    setup: context,
    account: account as Account,
    masterAccount: context.masterAccount,
    // syncCall: context.syncCallback,
  };
};
