import { OBSTACLE_HAND_SCORE } from "../constants/dojoEventKeys";
import { DojoEvent } from "../types/DojoEvent";
import { getNumberValueFromEvent } from "./getNumberValueFromEvent";

export const getObstacleHandScore = (
  events: DojoEvent[]
): number | undefined => {
  const obstacleHandScoreEvent = events.find(
    (event) => event.keys[0] === OBSTACLE_HAND_SCORE
  );

  if (!obstacleHandScoreEvent) return undefined;
  return getNumberValueFromEvent(obstacleHandScoreEvent, 0) ?? 0;
};
