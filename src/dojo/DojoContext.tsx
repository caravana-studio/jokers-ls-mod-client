import { BurnerAccount, useBurnerManager } from "@dojoengine/create-burner";
import { ReactNode, createContext, useContext, useMemo } from "react";
import { Account, RpcProvider } from "starknet";
import { SetupResult } from "./setup";

interface DojoContextType extends SetupResult {
  masterAccount: Account;
  account: BurnerAccount;
}

export const DojoContext = createContext<DojoContextType | null>(null);

export const DojoProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: SetupResult;
}) => {
  const currentValue = useContext(DojoContext);
  if (currentValue) throw new Error("DojoProvider can only be used once");

  const {
    config: { rpcUrl, masterAddress, masterPrivateKey },
    burnerManager,
  } = value;

  const rpcProvider = useMemo(
    () =>
      new RpcProvider({
        nodeUrl: rpcUrl,
      }),
    [rpcUrl],
  );

  const masterAccount = useMemo(
    () =>
      new Account(rpcProvider, masterAddress, masterPrivateKey, "1"),
    [masterAddress, masterPrivateKey, rpcProvider]
  );

  const {
    create,
    list,
    get,
    select,
    deselect,
    remove,
    clear,
    account,
    isDeploying,
    count,
    copyToClipboard,
    applyFromClipboard,
    checkIsDeployed,
  } = useBurnerManager({
    burnerManager,
  });

  return (
    <DojoContext.Provider
      value={{
        ...value,
        masterAccount,
        account: {
          create,
          list,
          get,
          select,
          deselect,
          remove,
          clear,
          account: account ? account : masterAccount,
          isDeploying,
          count,
          copyToClipboard,
          applyFromClipboard,
          checkIsDeployed,
        },
      }}
    >
      {children}
    </DojoContext.Provider>
  );
};
