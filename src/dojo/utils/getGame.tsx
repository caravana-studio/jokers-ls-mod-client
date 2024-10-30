import {
  Component,
  Entity,
  getComponentValue
} from "@dojoengine/recs";
import { getEntityIdFromKeys } from "@dojoengine/utils";

export const getGame = (gameId: number, Game: Component) => {
  const entityId = getEntityIdFromKeys([BigInt(gameId)]) as Entity;
  return getComponentValue(Game, entityId);
};

export const gameExists = (Game: Component, gameId: number) => {
  const game = getGame(gameId, Game);
  return !!game;
};
