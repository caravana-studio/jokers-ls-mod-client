import { GAME_OVER_EVENT } from "../../constants/dojoEventKeys";
import { DojoEvent } from "../../types/DojoEvent";
import { PlayEvents } from "../../types/ScoreData";
import { getCardsFromEvents } from "../getCardsFromEvents";
import { getCashEvents } from "./getCashEvents";
import { getDetailEarnedEvent } from "./getDetailEarnedEvent";
import { getGlobalEvents } from "./getGlobalEvents";
import { getHandEvent } from "./getHandEvent";
import { getLevelPassedEvent } from "./getLevelPassedEvent";
import { getModifierSuitEvents } from "./getModifierSuitEvents";
import { getMultiPointEvents } from "./getMultiPointEvents";
import { getNeonPlayEvent } from "./getNeonPlayEvent";
import { getScoreEvent } from "./getScoreEvent";
import { getSpecialLevelEvent } from "./getSpecialLevelEvent";
import { getSpecialSuitEvents } from "./getSpecialSuitEvents";
import { getTraditionalCardsEvents } from "./getTraditionalCardsEvents";

export const getPlayEvents = (events: DojoEvent[]): PlayEvents => {
  const playEvents: PlayEvents = {
    play: getHandEvent(events),
    cardScore: getTraditionalCardsEvents(events),
    specialCards: getMultiPointEvents(events),
    gameOver: !!events.find((event) => event.keys[0] === GAME_OVER_EVENT),
    levelPassed: getLevelPassedEvent(events),
    detailEarned: getDetailEarnedEvent(events),
    levelEvent: getSpecialLevelEvent(events),
    specialSuitEvents: getSpecialSuitEvents(events),
    neonPlayEvent: getNeonPlayEvent(events),
    globalEvents: getGlobalEvents(events),
    modifierSuitEvents: getModifierSuitEvents(events),
    cards: getCardsFromEvents(events),
    score: getScoreEvent(events),
    cashEvents: getCashEvents(events),
  };

  return playEvents;
};
