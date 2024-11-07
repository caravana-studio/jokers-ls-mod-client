import { useEffect, useState } from "react";
import { useDojo } from "../useDojo";
import { Beast, PlayerBeast } from "../typescript/models.gen";
import { getBeastQuery, getGameModeBeastQuery, getPlayerBeastQuery } from "./getBeastQuery";

export const useBeast = () => {
  const {
    setup: { client },
  } = useDojo();

  const [beast, setBeast] = useState<Beast | undefined>(undefined);

  useEffect(() => {
    fetchBeast();
  }, []);

  const fetchBeast = () => {
    getBeastQuery(client).then((beast) => {
      setBeast(beast);
    });
  };

  return { beast, setBeast, fetchBeast }
};

export const useBeastPlayer = () => {
  const {
    setup: { client },
  } = useDojo();
  
  const [energyLeft, setEnergyLeft] = useState<number>(-1);

  useEffect(() => {
    fetchEnergyLeft();
  }, []);

  const fetchEnergyLeft = () => {
    getPlayerBeastQuery(client).then((player_beast) => {
      setEnergyLeft(player_beast.energy.valueOf());
    });
  };

  return { energyLeft, setEnergyLeft, fetchEnergyLeft }
};