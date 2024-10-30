import { shortenHex } from "@dojoengine/utils";
import { isMobile } from "react-device-detect";
import { ExternalToast, toast } from "sonner";
import { ERROR_TOAST, LOADING_TOAST, SUCCESS_TOAST } from "../theme/colors.tsx";
import { getEnvString } from "./getEnvValue.ts";
import { Box, Spinner, Tooltip } from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { MouseEventHandler } from "react";

const TOAST_COMMON_OPTIONS: ExternalToast = {
  id: "transaction",
  position: "top-right",
  closeButton: false,
  dismissible: true,
  style: {
    padding: 0,
    backgroundColor: "transparent",
    boxShadow: "none",
    right: "18px",
    width: "50px"
  },
  duration: 1750
};

type CircularToastProps = {
  backgroundColor: string;
  status: "loading" | "success" | "error";
  description?: string;
  onClickFn?: MouseEventHandler<HTMLDivElement>;
};

const CircularToast = ({ backgroundColor, status, description, onClickFn }: CircularToastProps) => (
  <Tooltip 
    hasArrow 
    label={description} 
    closeOnPointerDown 
    color="white" 
    backgroundColor={backgroundColor}
    padding={2}
    isDisabled={!description}
    >
    <Box
      width="50px"
      height="50px"
      bg={backgroundColor}
      borderRadius="50%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      onClick={onClickFn}
      cursor={onClickFn ? "pointer" : "default"}
    >
      {status === "loading" ? (
        <Spinner boxSize={24} thickness="2px" speed="0.65s" color="white" size="xl" />
      ) : status === "success" ? (
        <CheckCircleIcon boxSize="24px" color="white" />
      ) : (
        <WarningIcon boxSize="24px" color="white" />
      )}
    </Box>
  </Tooltip>
);

export const showTransactionToast = (
  transaction_hash?: string,
  message?: string
): void => {
  const description = message || "Transaction in progress...";

  toast.loading(
    <CircularToast backgroundColor={LOADING_TOAST} status="loading" description={description}/>,
    {
      ...TOAST_COMMON_OPTIONS,
    }
  );
};

export const updateTransactionToast = (
  transaction_hash: string,
  succeed: boolean
): boolean => {
  const backgroundColor = succeed ? SUCCESS_TOAST : ERROR_TOAST;
  const description = shortenHex(transaction_hash, 15);

  if (succeed) {

    toast.success(
      <CircularToast backgroundColor={backgroundColor} status={"success"}/>,
      {
        ...TOAST_COMMON_OPTIONS,
      }
    );
  } else {
    
    const showErrorFn = function(): void {
      window.open(getEnvString("VITE_TRANSACTIONS_URL") + transaction_hash);
    };

    toast.error(
      <CircularToast backgroundColor={backgroundColor} status={"error"} description={description} onClickFn={showErrorFn}/>,
      {
        ...TOAST_COMMON_OPTIONS,
      }
    );
  }
  return succeed;
};

export const failedTransactionToast = (): boolean => {
  const TX_ERROR_MESSAGE = "Error processing transaction.";
  toast.error(
    <CircularToast backgroundColor={ERROR_TOAST} status="error" description={TX_ERROR_MESSAGE}/>,
    {
      ...TOAST_COMMON_OPTIONS,
    }
  );

  return false;
};
