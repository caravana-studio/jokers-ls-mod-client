import {
  CHALLENGE_COMPLETED,
  PLAY_GAME_OVER_EVENT,
  PLAYER_ATTACK,
} from "../../constants/dojoEventKeys";
import { DojoEvent } from "../../types/DojoEvent";
import { PlayEvents } from "../../types/ScoreData";
import { getCardsFromEvents } from "../getCardsFromEvents";
import { getRewardsEvents } from "../getRewardEvents";
import { getBeastAttackEvent } from "./getBeastAttackEvent";
import { getCashEvents } from "./getCashEvents";
import { getDetailEarnedEvent } from "./getDetailEarnedEvent";
import { getGlobalEvents } from "./getGlobalEvents";
import { getHandEvent } from "./getHandEvent";
import { getItemChallengeCompletedEvent } from "./getItemChallengeCompleted";
import { getLevelPassedEvent } from "./getLevelPassedEvent";
import { getModifierSuitEvents } from "./getModifierSuitEvents";
import { getMultiPointEvents } from "./getMultiPointEvents";
import { getNeonPlayEvent } from "./getNeonPlayEvent";
import { getObstacleAttackEvent } from "./getObstacleAttackEvent";
import { getPlayerAttackEvent } from "./getPlayerAttackEvent";
import { getPlayerWinGameEvent } from "./getPlayWinGameEvent";
import { getScoreEvent } from "./getScoreEvent";
import { getSpecialLevelEvent } from "./getSpecialLevelEvent";
import { getSpecialSuitEvents } from "./getSpecialSuitEvents";
import { getTraditionalCardsEvents } from "./getTraditionalCardsEvents";

export const getPlayEvents = (events: DojoEvent[]): PlayEvents => {
  const playEvents: PlayEvents = {
    play: getHandEvent(events),
    cardScore: getTraditionalCardsEvents(events),
    specialCards: getMultiPointEvents(events),
    gameOver: !!events.find((event) => event.keys[0] === PLAY_GAME_OVER_EVENT),
    obstacleDefeated: !!events.find(
      (event) => event.keys[0] === CHALLENGE_COMPLETED
    ),
    playWinGameEvent: getPlayerWinGameEvent(events),
    itemChallengeCompleted: getItemChallengeCompletedEvent(events),
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
    playerAttack: getPlayerAttackEvent(events),
    beastAttack: getBeastAttackEvent(events),
    obstacleAttack: getObstacleAttackEvent(events),
    rewards: getRewardsEvents(events),
  };

  return playEvents;
};
