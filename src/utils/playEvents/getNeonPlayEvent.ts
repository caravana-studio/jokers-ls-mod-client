import { NEON_PLAY_EVENT } from "../../constants/dojoEventKeys";
import { DojoEvent } from "../../types/DojoEvent";
import { NeonPlayEvent } from "../../types/ScoreData";
import { getArrayValueFromEvent } from "../getArrayValueFromEvent";
import { getNumberValueFromEvent } from "../getNumberValueFromEvent";

export const getNeonPlayEvent = (
  events: DojoEvent[]
): NeonPlayEvent | undefined => {

  const neonPlayEvent = events.find(
    (event) => event.keys[0] === NEON_PLAY_EVENT
  );

  const cardIndexes = getArrayValueFromEvent(neonPlayEvent, 1)
  const arrayLength = (neonPlayEvent ? getNumberValueFromEvent(neonPlayEvent, 1) : 0 ) ?? 0
  
  return neonPlayEvent && {
    neon_cards_idx: cardIndexes,
    points: getNumberValueFromEvent(neonPlayEvent, arrayLength + 3) ?? 0,
    multi: getNumberValueFromEvent(neonPlayEvent, arrayLength + 2) ?? 0,
  }
};
