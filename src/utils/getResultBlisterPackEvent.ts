import { BLISTER_PACK_RESULT } from "../constants/dojoEventKeys";
import { getCardFromCardId } from "../dojo/utils/getCardFromCardId";
import { Card } from "../types/Card";
import { DojoEvent } from "../types/DojoEvent";
import { getNumberValueFromEvent } from "./getNumberValueFromEvent";

const sort = (a: Card, b: Card) => {
  return (a.card_id ?? 0) - (b.card_id ?? 0);
};

export const getResultBlisterPackEvent = (events: DojoEvent[]): Card[] => {
  const blisterPackResultEvent = events.find(
    (event) => event.keys[0] === BLISTER_PACK_RESULT
  );

  if (!blisterPackResultEvent) return [];

  const packLength = getNumberValueFromEvent(blisterPackResultEvent, 1) ?? 0;
  const packResult = [];

  for (let i = 2; i < packLength + 2; i++) {
    const cardId = getNumberValueFromEvent(blisterPackResultEvent, i);
    if (cardId) {
      const card = getCardFromCardId(cardId, i - 2);
      packResult.push(card);
    }
  }
  return packResult.sort(sort);
};
