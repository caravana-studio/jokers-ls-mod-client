import { BurnerAccount, useBurnerManager } from "@dojoengine/create-burner";
import { ReactNode, createContext, useContext, useMemo } from "react";
import { Account, RpcProvider } from "starknet";
import { SetupResult } from "./setup";

interface DojoContextType extends SetupResult {
  masterAccount: Account;
  account: BurnerAccount;
}
const useBurners = import.meta.env.VITE_USE_BURNER_ACCOUNTS || false;

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
    dojoProvider,
  } = value;

  const rpcProvider = useMemo(
    () =>
      new RpcProvider({
        nodeUrl: rpcUrl,
      }),
    [rpcUrl]
  );

  const controllerMasterAccount = useMemo(
    () => new Account(rpcProvider, masterAddress, masterPrivateKey, "1"),
    [masterAddress, masterPrivateKey, rpcProvider]
  );

  const burnerMasterAccount = useMemo(
    () =>
      new Account(dojoProvider.provider, masterAddress, masterPrivateKey, "1"),
    [masterAddress, masterPrivateKey, dojoProvider]
  );

  const masterAccount = useMemo(() => {
    if (useBurners) {
      return burnerMasterAccount;
    } else {
      return controllerMasterAccount;
    }
  }, [burnerMasterAccount, controllerMasterAccount, useBurners]);

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
