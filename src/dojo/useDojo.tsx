import { useAccount } from "@starknet-react/core";
import { useContext } from "react";
import { Account } from "starknet";
import { DojoContext } from "./DojoContext";

const useBurners = import.meta.env.VITE_USE_BURNER_ACCOUNTS || false;

export const useDojo = () => {
  const context = useContext(DojoContext);
  if (!context)
    throw new Error("The `useDojo` hook must be used within a `DojoProvider`");

  const { account } = useAccount();

  const dojoAccount = useBurners
    ? context.account.account
    : (account as Account);

  return {
    setup: context,
    account: dojoAccount,
    masterAccount: context.masterAccount,
    syncCall: context.syncCallback,
  };
};
