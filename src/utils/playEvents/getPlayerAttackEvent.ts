import { PLAYER_ATTACK } from "../../constants/dojoEventKeys";
import { DojoEvent } from "../../types/DojoEvent";
import { getNumberValueFromEvent } from "../getNumberValueFromEvent";

export const getPlayerAttackEvent = (events: DojoEvent[]): number | undefined => {
    const playerEvent = events.find(
        (event) => event.keys[0] === PLAYER_ATTACK);

      if(!playerEvent) return undefined;

      return getNumberValueFromEvent(playerEvent, 0) ?? 0;
};
