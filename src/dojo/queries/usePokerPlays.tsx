import {
  getComponentValue,
  Has,
} from "@dojoengine/recs";
import { PlayerLevelPokerHand } from "../typescript/models.gen";
import { useEffect, useState } from "react";
import { useDojo } from "../useDojo";
import { useEntityQuery } from "@dojoengine/react";

export const usePokerPlays = (gameId: number): { plays: PlayerLevelPokerHand[] } => {
  const [plays, setPlays] = useState<any>({});
  
  const {
      setup: {
          clientComponents: {
          PlayerLevelPokerHand
        },
      },
    } = useDojo();
  
    const gameKeys = useEntityQuery([Has(PlayerLevelPokerHand)]);
  
    useEffect(() => {
      const components = gameKeys.map((entity) => {
        const component = getComponentValue(PlayerLevelPokerHand, entity);
  
        if (!component) {
          return undefined;
        }
        return component;
      }).filter((component) => component?.game_id === gameId);;
   
      setPlays(components);
    }, [gameKeys]);
  
  return {plays: Object.values(plays)};
}
