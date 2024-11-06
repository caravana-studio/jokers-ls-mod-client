import CartridgeConnector from "@cartridge/connector";
import { useEffect, useState } from "react";
import cartridgeConnector from "../../cartridgeConnector";

const useBurners = import.meta.env.VITE_USE_BURNER_ACCOUNTS || false;

export const useUsername = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    (cartridgeConnector as CartridgeConnector)?.username()?.then((username) => {
      username && setUsername(username);
    });
  }, [cartridgeConnector]);

  useEffect(() => {
    if (useBurners) {
      setUsername("testUser");
    }
  }, [useBurners]);

  return username;
};

export const useControllerAddress = () => {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    if (useBurners) {
      setAddress(
        "0x010cc45e3ff2203e63797a8e4dee0b7f1edcd3d2dd9157c9a5adc642a04cf263"
      );
    }
  }, [useBurners]);

  useEffect(() => {
    (cartridgeConnector as CartridgeConnector)?.account()?.then((acc) => {
      setAddress(acc.address);
    });
  }, [cartridgeConnector]);

  return address;
};
