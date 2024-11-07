import { OBSTACLE_ATTACK_EVENT } from "../../constants/dojoEventKeys";
import { DojoEvent } from "../../types/DojoEvent";
import { getNumberValueFromEvent } from "../getNumberValueFromEvent";

export const getObstacleAttackEvent = (
  events: DojoEvent[]
): number | undefined => {
  const obstacleAttackEvent = events.find(
    (event) => event.keys[0] === OBSTACLE_ATTACK_EVENT
  );
  const res =
    obstacleAttackEvent && getNumberValueFromEvent(obstacleAttackEvent, 0);
  return res;
};
