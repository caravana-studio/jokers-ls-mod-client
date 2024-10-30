import { DETAIL_EARNED_EVENT } from "../../constants/dojoEventKeys";
import { DojoEvent } from "../../types/DojoEvent";
import { DetailEarned } from "../../types/ScoreData";
import { getNumberValueFromEvent } from "../getNumberValueFromEvent";

export const getDetailEarnedEvent = (
  events: DojoEvent[]
): DetailEarned | undefined => {
  const detailEarnedEvent = events.find(
    (event) => event.keys[0] === DETAIL_EARNED_EVENT
  );
  if (!detailEarnedEvent) return undefined;
  const round_defeat = getNumberValueFromEvent(detailEarnedEvent, 1) ?? 0;
  const level_bonus = getNumberValueFromEvent(detailEarnedEvent, 2) ?? 0;
  const hands_left = getNumberValueFromEvent(detailEarnedEvent, 3) ?? 0;
  const hands_left_cash = getNumberValueFromEvent(detailEarnedEvent, 4) ?? 0;
  const discard_left = getNumberValueFromEvent(detailEarnedEvent, 5) ?? 0;
  const discard_left_cash = getNumberValueFromEvent(detailEarnedEvent, 6) ?? 0;
  const rage_card_defeated = getNumberValueFromEvent(detailEarnedEvent, 7) ?? 0;
  const rage_card_defeated_cash =
    getNumberValueFromEvent(detailEarnedEvent, 8) ?? 0;
  const total = getNumberValueFromEvent(detailEarnedEvent, 9) ?? 0;

  return {
    round_defeat,
    level_bonus,
    hands_left,
    hands_left_cash,
    discard_left,
    discard_left_cash,
    rage_card_defeated,
    rage_card_defeated_cash,
    total,
  };
};
