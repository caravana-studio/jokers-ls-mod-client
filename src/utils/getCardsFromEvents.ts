import { Type } from "@dojoengine/recs";
import { parseComponentValue } from "@dojoengine/utils";
import { HAND_CARD_EVENT } from "../constants/dojoEventKeys";
import { Card } from "../types/Card";
import { DojoEvent } from "../types/DojoEvent";
import { getNumberValueFromEvent } from "./getNumberValueFromEvent";

export const getCardsFromEvents = (events: DojoEvent[]): Card[] => {
  return events
    .filter((event) => event.keys[0] === HAND_CARD_EVENT)
    .map((event) => {
      const idx = parseComponentValue(event.keys[2], Type.Number) as number;
      const card_id = getNumberValueFromEvent(event, 0);
      const card_type =
        card_id === undefined
          ? ""
          : card_id >= 600 && card_id <= 699
            ? "Effect"
            : "";
      const img = `${card_id}.png`;
      const isModifier = card_type === "Effect";
      const id = idx.toString();
      return {
        idx,
        card_id,
        img,
        isModifier,
        id,
      };
    });
};
