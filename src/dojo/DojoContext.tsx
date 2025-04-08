import ControllerConnector from "@cartridge/connector/controller";
import { BurnerProvider, useBurnerManager } from "@dojoengine/create-burner";
import { useAccount, useConnect } from "@starknet-react/core";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Account, AccountInterface, RpcProvider } from "starknet";
import { LoadingScreen } from "../pages/LoadingScreen";
import { SetupResult } from "./setup";
import { useAccountStore } from "./accountStore";
import { PreThemeLoadingPage } from "../pages/PreThemeLoadingPage";
import { Button, ChakraBaseProvider, extendTheme } from "@chakra-ui/react";
import customTheme from "../theme/theme";

interface DojoAccount {
  create: () => void;
  list: () => any[];
  get: (id: string) => any;
  select: (id: string) => void;
  account: Account; // | AccountInterface;
  isDeploying: boolean;
  clear: () => void;
  accountDisplay: string;
}

interface DojoContextType extends SetupResult {
  masterAccount: Account | AccountInterface;
  account: DojoAccount;
}

export interface DojoResult {
  setup: DojoContextType;
  account: DojoAccount;
  masterAccount: Account | AccountInterface;
}

export function displayAddress(string: string) {
  if (string === undefined) return "unknown";
  return string.substring(0, 6) + "..." + string.substring(string.length - 4);
}

export const DojoContext = createContext<DojoContextType | null>(null);

type DojoProviderProps = {
  children: ReactNode;
  value: SetupResult;
};

const useMasterAccount = (rpcProvider: RpcProvider) => {
  const masterAddress = import.meta.env.VITE_MASTER_ADDRESS;
  const privateKey = import.meta.env.VITE_MASTER_PRIVATE_KEY;
  return useMemo(
    () => new Account(rpcProvider, masterAddress, privateKey),
    [rpcProvider, masterAddress, privateKey]
  );
};

const useRpcProvider = () => {
  return useMemo(
    () =>
      new RpcProvider({
        nodeUrl: import.meta.env.VITE_RPC_URL || "http://localhost:5050",
      }),
    []
  );
};

const useControllerAccount = () => {
  const { account, connector, isConnected } = useAccount();

  useEffect(() => {
    if (account) {
      useAccountStore.getState().setAccount(account);
    }
  }, [account, isConnected]);

  useEffect(() => {
    if (connector) {
      useAccountStore
        .getState()
        .setConnector(connector as unknown as ControllerConnector);
    }
  }, [connector, isConnected]);

  return account;
};

export const DojoProvider = ({ children, value }: DojoProviderProps) => {
  const currentValue = useContext(DojoContext);
  if (currentValue) throw new Error("DojoProvider can only be used once");

  const rpcProvider = useRpcProvider();
  const masterAccount = useMasterAccount(rpcProvider);
  const controllerAccount = useControllerAccount();

  return (
    <BurnerProvider
      initOptions={{
        masterAccount,
        accountClassHash:
          import.meta.env.VITE_PUBLIC_ACCOUNT_CLASS_HASH ||
          "0x079d9ce84b97bcc2a631996c3100d57966fc2f5b061fb1ec4dfd0040976bcac6",
        rpcProvider,
        feeTokenAddress:
          import.meta.env.VITE_NETWORK_FEE_TOKEN ||
          "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
      }}
    >
      <DojoContextProvider
        value={value}
        masterAccount={masterAccount}
        controllerAccount={controllerAccount!}
      >
        {children}
      </DojoContextProvider>
    </BurnerProvider>
  );
};

export const useDojo = (): DojoResult => {
  const contextValue = useContext(DojoContext);
  if (!contextValue)
    throw new Error("The `useDojo` hook must be used within a `DojoProvider`");

  return {
    setup: contextValue,
    account: contextValue.account,
    masterAccount: contextValue.masterAccount,
  };
};

const DojoContextProvider = ({
  children,
  value,
  masterAccount,
  controllerAccount,
}: DojoProviderProps & {
  masterAccount: Account;
  controllerAccount: AccountInterface | null;
}) => {
  const currentValue = useContext(DojoContext);
  if (currentValue) throw new Error("DojoProvider can only be used once");

  const {
    create,
    list,
    get,
    account: burnerAccount,
    select,
    isDeploying,
    clear,
  } = useBurnerManager({
    burnerManager: value.burnerManager,
  });

  const { connect, connectors } = useConnect();
  const { isConnected, isConnecting } = useAccount();

  const [accountsInitialized, setAccountsInitialized] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const theme = extendTheme(customTheme);

  const connectWallet = async () => {
    try {
      console.log("Attempting to connect wallet...");
      await connect({ connector: connectors[0] });
      console.log("Wallet connected successfully.");
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  useEffect(() => {
    if (controllerAccount) {
      console.log("Setting account from controllerAccount:", controllerAccount);
      useAccountStore.getState().setAccount(controllerAccount);
      setAccountsInitialized(true);
    } else {
      console.log("ControllerAccount is null in production or not connected.");
      setAccountsInitialized(true);
    }
  }, [controllerAccount, accountsInitialized]);

  useEffect(() => {
    if (
      !(
        !accountsInitialized &&
        isConnecting &&
        !controllerAccount &&
        isConnected
      )
    ) {
      setIsReady(true);
    }
  }, [accountsInitialized, isConnecting, controllerAccount, isConnected]);

  if (!isReady) {
    return <LoadingScreen />;
  }

  if (!isConnected && !isConnecting && !controllerAccount) {
    return (
      <ChakraBaseProvider theme={theme}>
        <PreThemeLoadingPage>
          <img width="60%" src="logos/logo.png" alt="logo" />
          {!isConnected && (
            <Button className="login-button" onClick={connectWallet}>
              LOGIN
            </Button>
          )}
        </PreThemeLoadingPage>
      </ChakraBaseProvider>
    );
  }

  // Once account is set, render the children
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
          clear,
          account: controllerAccount as Account,
          isDeploying,
          accountDisplay: displayAddress(
            (controllerAccount as Account | AccountInterface)?.address || ""
          ),
        },
      }}
    >
      {children}
    </DojoContext.Provider>
  );
};
