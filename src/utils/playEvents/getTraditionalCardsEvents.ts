import { CARD_SCORE_EVENT } from "../../constants/dojoEventKeys";
import { DojoEvent } from "../../types/DojoEvent";
import { getNumberValueFromEvent } from "../getNumberValueFromEvent";

export const getTraditionalCardsEvents = (events: DojoEvent[]) => {
  return events
    .filter((event) => event.keys[0] === CARD_SCORE_EVENT)
    .map((event) => {
      const idx = getNumberValueFromEvent(event, 0) ?? 0;
      const multi = getNumberValueFromEvent(event, 1) ?? 0;
      const points = getNumberValueFromEvent(event, 2) ?? 0;
      return {
        idx,
        multi,
        points,
      };
    });
};
