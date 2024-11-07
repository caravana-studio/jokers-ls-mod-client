import { useEffect, useState } from "react";
import { Game } from "../typescript/models.gen";
import { useDojo } from "../useDojo";
import { getGameQuery } from "./getGameQuery";

export const useGame = () => {
  const {
    setup: { client },
  } = useDojo();

  const [game, setGame] = useState<Game | undefined>(undefined);

  useEffect(() => {
    fetchGame();
  }, []);

  const fetchGame = () => {
    const gamePromise = getGameQuery(client);
    gamePromise.then((game) => {
      if (game.owner !== 0n) {
        setGame(game);
      }
    });
    return gamePromise;
  };

  return { game, fetchGame };
};
