import { useEffect, useState } from "react";
import { useControllerAddress } from "../dojo/utils/useUsername";
import { Adventurer } from "../types/Adventurer";
import { getAdventurers } from "./adventurers";

export const useAdventurers = () => {
  const [adventurers, setAdventurers] = useState<Adventurer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const account = useControllerAddress();
  console.log("account", account);

  useEffect(() => {
    if (account) {
      getAdventurers(account)
        .then((adventurers) => {
          setAdventurers(adventurers);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [account]);

  return { adventurers, isLoading };
};
