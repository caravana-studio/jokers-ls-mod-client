import { SPECIAL_SUIT_EVENT } from "../../constants/dojoEventKeys";
import { Suits } from "../../enums/suits";
import { DojoEvent } from "../../types/DojoEvent";
import { SpecialSuitEvent } from "../../types/ScoreData";
import { getNumberValueFromEvent } from "../getNumberValueFromEvent";

export const getSpecialSuitEvents = (
  events: DojoEvent[]
): SpecialSuitEvent[] => {
  const grouped: { [key: number]: number[] } = {};
  const specialSuit: { [key: number]: Suits } = {};

  const specialSuitEvents = events.filter(
    (event) => event.keys[0] === SPECIAL_SUIT_EVENT
  );
  specialSuitEvents.forEach((event) => {
    const special_idx = getNumberValueFromEvent(event, 1) ?? 0;
    const idx = getNumberValueFromEvent(event, 2) ?? 0;
    const suit = getNumberValueFromEvent(event, 3) as Suits;
    if (!grouped[special_idx]) {
      grouped[special_idx] = [];
    }
    if (!specialSuit[special_idx]) {
      specialSuit[special_idx] = suit;
    }
    grouped[special_idx].push(idx);
  });
  return Object.keys(grouped).map((special_idx) => ({
    special_idx: Number(special_idx),
    idx: grouped[Number(special_idx)],
    suit: specialSuit[Number(special_idx)],
  }));
};
