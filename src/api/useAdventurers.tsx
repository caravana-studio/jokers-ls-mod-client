import { useEffect, useState } from "react";
import { useDojo } from "../dojo/useDojo";
import { Adventurer } from "../types/Adventurer";
import { getAdventurers } from "./adventurers";

/* const myController =
  "0x010cc45e3ff2203e63797a8e4dee0b7f1edcd3d2dd9157c9a5adc642a04cf263"; */

export const useAdventurers = () => {
  const [adventurers, setAdventurers] = useState<Adventurer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { account } = useDojo();
  console.log("account", account);

  useEffect(() => {
    getAdventurers(account.address)
      .then((adventurers) => {
        setAdventurers(adventurers);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { adventurers, isLoading };
};
