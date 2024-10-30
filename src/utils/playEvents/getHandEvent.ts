import {
    PLAY_SCORE_EVENT
} from "../../constants/dojoEventKeys";
import { DojoEvent } from "../../types/DojoEvent";
import {
    getNumberValueFromEvents
} from "../getNumberValueFromEvent";

export const getHandEvent = (events: DojoEvent[]) => {
  const playMulti = getNumberValueFromEvents(events, PLAY_SCORE_EVENT, 1);
  const playPoints = getNumberValueFromEvents(events, PLAY_SCORE_EVENT, 2);

  return {
    multi: playMulti ?? 1,
    points: playPoints ?? 0,
  };
};
