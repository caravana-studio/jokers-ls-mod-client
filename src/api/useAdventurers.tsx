import { useEffect, useState } from "react";
import { Adventurer } from "../types/Adventurer";
import { getAdventurers } from "./adventurers";
import { useAccount } from "@starknet-react/core";

export const useAdventurers = () => {
  const [adventurers, setAdventurers] = useState<Adventurer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { address } = useAccount();

  useEffect(() => {
    if (address) {
      getAdventurers(address)
        .then((adventurers) => {
          setAdventurers(adventurers);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [address]);

  return { adventurers, isLoading };
};
