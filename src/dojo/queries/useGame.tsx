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
    getGameQuery(client).then((game) => {
      console.log("asdasd", game);
      setGame(game);
    });
  };

  return game;
};
