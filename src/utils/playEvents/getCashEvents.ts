import { SPECIAL_CASH_EVENT } from "../../constants/dojoEventKeys";
import { DojoEvent } from "../../types/DojoEvent";
import { CashEvent } from "../../types/ScoreData";
import { getNumberValueFromEvent } from "../getNumberValueFromEvent";

export const getCashEvents = (
  events: DojoEvent[]
): CashEvent[] => {
  
  const cashEvents = events.filter(
    (event) => event.keys[0] === SPECIAL_CASH_EVENT
  );

  return cashEvents.map((event) => {
    const cash = getNumberValueFromEvent(event, 0) ?? 0;
    const idx = getNumberValueFromEvent(event, 1) ?? 0;
    const special_idx = getNumberValueFromEvent(event, 2) ?? 0;
    return {
      idx,
      cash,
      special_idx
    }
  })
  
};
