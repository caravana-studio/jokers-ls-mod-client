import { SPECIAL_LEVEL_EVENT } from "../../constants/dojoEventKeys";
import { DojoEvent } from "../../types/DojoEvent";
import { getNumberValueFromEvent } from "../getNumberValueFromEvent";

export const getSpecialLevelEvent = (events: DojoEvent[]) => {
  const event = events.find((event) => event.keys[0] === SPECIAL_LEVEL_EVENT);
  if (!event) return undefined;
  const special_idx = getNumberValueFromEvent(event, 1) ?? 0;
  const multi = getNumberValueFromEvent(event, 2) ?? 0;
  const points = getNumberValueFromEvent(event, 3) ?? 0;
  return {
    special_idx,
    multi,
    points,
  };
};
