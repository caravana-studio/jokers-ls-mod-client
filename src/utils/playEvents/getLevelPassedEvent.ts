import {
    LEVEL_PASSED_EVENT
} from "../../constants/dojoEventKeys";
import { DojoEvent } from "../../types/DojoEvent";
import {
    LevelPassedEvent
} from "../../types/ScoreData";
import {
    getNumberValueFromEvent
} from "../getNumberValueFromEvent";

export const getLevelPassedEvent = (
  events: DojoEvent[]
): LevelPassedEvent | undefined => {
  const levelPassedEvent = events.find(
    (event) => event.keys[0] === LEVEL_PASSED_EVENT
  );
  if (!levelPassedEvent) return undefined;
  const level = getNumberValueFromEvent(levelPassedEvent, 1) ?? 0;
  const score = getNumberValueFromEvent(levelPassedEvent, 2) ?? 0;
  return { level, score };
};
