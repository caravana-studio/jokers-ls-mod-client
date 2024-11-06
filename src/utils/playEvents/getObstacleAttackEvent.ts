import { OBSTACLE_ATTACK } from "../../constants/dojoEventKeys";
import { DojoEvent } from "../../types/DojoEvent";
import { getNumberValueFromEvent } from "../getNumberValueFromEvent";

export const getObstacleAttackEvent = (
  events: DojoEvent[]
): number | undefined => {
  const beastAttackEvent = events.find(
    (event) => event.keys[0] === OBSTACLE_ATTACK
  );
  return beastAttackEvent && getNumberValueFromEvent(beastAttackEvent, 0);
};
