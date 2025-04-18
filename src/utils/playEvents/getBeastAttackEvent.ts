import {
  BEAST_ATTACK
} from "../../constants/dojoEventKeys";
import { DojoEvent } from "../../types/DojoEvent";
import { getNumberValueFromEvent } from "../getNumberValueFromEvent";

export const getBeastAttackEvent = (
  events: DojoEvent[]
): number | undefined => {
  const beastAttackEvent = events.find(
    (event) => event.keys[0] === BEAST_ATTACK
  );
  return beastAttackEvent && getNumberValueFromEvent(beastAttackEvent, 0);
};
