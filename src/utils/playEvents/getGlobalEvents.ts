import { SPECIAL_GLOBAL_EVENT } from "../../constants/dojoEventKeys";
import { DojoEvent } from "../../types/DojoEvent";
import { getNumberValueFromEvent } from "../getNumberValueFromEvent";

export const getGlobalEvents = (events: DojoEvent[]) => {
  const filteredEvents = events.filter(
    (event) => event.keys[0] === SPECIAL_GLOBAL_EVENT
  );
  return filteredEvents.map((event) => {
    const special_idx = getNumberValueFromEvent(event, 1) ?? 0;
    const multi = getNumberValueFromEvent(event, 2) ?? 0;
    const points = getNumberValueFromEvent(event, 3) ?? 0;
    return {
      special_idx,
      multi,
      points,
    };
  });
};
