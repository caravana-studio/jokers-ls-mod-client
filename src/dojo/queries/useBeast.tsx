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

  return { beast, setBeast }
};

export const useBeastPlayer = () => {
  const {
    setup: { client },
  } = useDojo();
  
  const [player_beast, setPlayerBeast] = useState<PlayerBeast | undefined>(undefined);

  useEffect(() => {
    fetchPlayerBeast();
  }, []);

  const fetchPlayerBeast = () => {
    getPlayerBeastQuery(client).then((player_beast) => {
      setPlayerBeast(player_beast);
    });
  };

  return player_beast;
};

export const useGameModeBeast = () => {
  const {
    setup: { client },
  } = useDojo();
  
  const gameId = getLSGameId();
  const entityId = getEntityIdFromKeys([BigInt(gameId)]) as Entity;
  return useComponentValue(GameModeBeast, entityId);
};
