import { BLISTER_PACK_RESULT, PLAYER_HEALED } from "../constants/dojoEventKeys";
import { DojoEvent } from "../types/DojoEvent";
import { getNumberValueFromEvent } from "./getNumberValueFromEvent";
import { getResultBlisterPackEvent } from "./getResultBlisterPackEvent";

export const getCreateRewardsEvents = (events: DojoEvent[]) => {
  console.log(events);
  const playerHealedEvent = events.find(
    (event) => event.keys[0] === PLAYER_HEALED
  );
  const blisterEvent = events.find(
    (event) => event.keys[0] === BLISTER_PACK_RESULT
  );

  if (playerHealedEvent) {
    const game_id = getNumberValueFromEvent(playerHealedEvent, 0) ?? 0;
    const potion_heal = getNumberValueFromEvent(playerHealedEvent, 1) ?? 0;
    const current_hp = getNumberValueFromEvent(playerHealedEvent, 0) ?? 0;

    return { healed: true, game_id, potion_heal, current_hp };
  } else if (blisterEvent) {
    return { blisterPackResult: getResultBlisterPackEvent(events) };
  }
  return undefined;
};
