import { PLAY_WIN_GAME_EVENT } from "../../constants/dojoEventKeys";
import { DojoEvent } from "../../types/DojoEvent";
import { PlayWinGameEvent } from "../../types/ScoreData";
import { getNumberValueFromEvent } from "../getNumberValueFromEvent";

export const getPlayerWinGameEvent = (
  events: DojoEvent[]
): PlayWinGameEvent | undefined => {
  const levelPassedEvent = events.find(
    (event) => event.keys[0] === PLAY_WIN_GAME_EVENT
  );
  if (!levelPassedEvent) return undefined;
  const game_id = getNumberValueFromEvent(levelPassedEvent, 0) ?? 0;
  const level = getNumberValueFromEvent(levelPassedEvent, 1) ?? 0;
  const player_score = getNumberValueFromEvent(levelPassedEvent, 2) ?? 0;

  console.log(levelPassedEvent);
  return { game_id, level, player_score };
};
