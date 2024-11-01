import { BEAST_EVENT, OBSTACLE_EVENT } from "../constants/dojoEventKeys";
import { DojoEvent } from "../types/DojoEvent";
import { getNumberValueFromEvent } from "./getNumberValueFromEvent";

export const getCreateLevelEvents = (events: DojoEvent[]) => {
  const obstacleEvent = events.find(
    (event) => event.keys[0] === OBSTACLE_EVENT
  );
  const beastEvent = events.find((event) => event.keys[0] === BEAST_EVENT);

  if (obstacleEvent) {
    console.log("obstacle event found");
    console.log(obstacleEvent);
    const ids: number[] = [];
    const numberOfIds = getNumberValueFromEvent(obstacleEvent, 0) ?? 0;
    for (let i = 0; i < numberOfIds; i++) {
      const id = getNumberValueFromEvent(obstacleEvent, i + 1) ?? 0;
      ids.push(id);
    }
    console.log(ids);
    return { isObstacle: true, obstacleIds: ids };
  } else if (beastEvent) {
    console.log("beast event found");
    console.log(beastEvent);
    const beast_id = getNumberValueFromEvent(beastEvent, 0) ?? 0;
    const tier = getNumberValueFromEvent(beastEvent, 1) ?? 0;
    const level = getNumberValueFromEvent(beastEvent, 2) ?? 0;
    const health = getNumberValueFromEvent(beastEvent, 3) ?? 0;
    const current_health = getNumberValueFromEvent(beastEvent, 4) ?? 0;
    const attack = getNumberValueFromEvent(beastEvent, 5) ?? 0;
    console.log(tier, level, health, attack);
    return {
      isBeast: true,
      beast: { beast_id, tier, level, health, current_health, attack },
    };
  }
  return undefined;
};
