import { Box, Heading, useToast } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export interface ICustomToastProps extends PropsWithChildren {
  type: "success" | "error";
}

const CustomToast = ({ type, children }: ICustomToastProps) => {
  return (
    <Box
      sx={{  mt: 4, mr: 6 }}
      color="white"
      py={3}
      px={6}
      bg={type === "error" ? "red.500" : "green.500"}
      borderRadius="10px"
    >
      {children}
    </Box>
  );
};

export const useCustomToast = () => {
  const toast = useToast();

  const showErrorToast = (message: string, title?: string): void => {
    toast({
      duration: 5000,
      position: "top-right",
      render: () => (
        <CustomToast type="error">
          {title && <Heading size="m">{title}</Heading>}
          {message}
        </CustomToast>
      ),
    });
  };
  const showSuccessToast = (message: string, title?: string): void => {
    toast({
      duration: 5000,
      position: "top-right",
      render: () => (
        <CustomToast type="success">
          {title && <Heading size="m">{title}</Heading>}
          {message}
        </CustomToast>
      ),
    });
  };

  return { showErrorToast, showSuccessToast };
};
