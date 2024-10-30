import { MODIFIER_SUIT_EVENT } from "../../constants/dojoEventKeys";
import { Suits } from "../../enums/suits";
import { DojoEvent } from "../../types/DojoEvent";
import { ModifierSuitEvent } from "../../types/ScoreData";
import { getNumberValueFromEvent } from "../getNumberValueFromEvent";

export const getModifierSuitEvents = (
  events: DojoEvent[]
): ModifierSuitEvent[] => {
  
  const modifierSuitEvents = events.filter(
    (event) => event.keys[0] === MODIFIER_SUIT_EVENT
  );

  return modifierSuitEvents.map((event) => {
    const idx = getNumberValueFromEvent(event, 2) ?? 0;
    const suit = getNumberValueFromEvent(event, 3) as Suits;
    return {
      idx,
      suit,
    }
  })
  
};
