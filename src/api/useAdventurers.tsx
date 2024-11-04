import { useEffect, useState } from "react";
import { useControllerAddress } from "../dojo/utils/useUsername";
import { Adventurer } from "../types/Adventurer";
import { getAdventurers } from "./adventurers";
/* const myController =
  "0x010cc45e3ff2203e63797a8e4dee0b7f1edcd3d2dd9157c9a5adc642a04cf263"; */

export const useAdventurers = () => {
  const [adventurers, setAdventurers] = useState<Adventurer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // const { account } = useDojo();

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
