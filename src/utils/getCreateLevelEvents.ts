import { BEAST_EVENT, OBSTACLE_EVENT } from "../constants/dojoEventKeys";
import { DojoEvent } from "../types/DojoEvent";
import { getCardsFromEvents } from "./getCardsFromEvents";
import { getNumberValueFromEvent } from "./getNumberValueFromEvent";

export const getCreateLevelEvents = (events: DojoEvent[]) => {
  const obstacleEvent = events.find(
    (event) => event.keys[0] === OBSTACLE_EVENT
  );
  const beastEvent = events.find((event) => event.keys[0] === BEAST_EVENT);

  const cards = getCardsFromEvents(events);

  if (obstacleEvent) {
    const obstacles: { id: number; completed: boolean }[] = [];
    const numberOfIds = getNumberValueFromEvent(obstacleEvent, 0) ?? 0;
    for (let i = 0; i < numberOfIds * 2; i = i + 2) {
      const id = getNumberValueFromEvent(obstacleEvent, i + 1) ?? 0;
      obstacles.push({ id, completed: false });
    }
    return { isObstacle: true, obstacles, cards };
  } else if (beastEvent) {
    console.log(beastEvent);
    const beast_id = getNumberValueFromEvent(beastEvent, 0) ?? 0;
    const tier = getNumberValueFromEvent(beastEvent, 1) ?? 0;
    const level = getNumberValueFromEvent(beastEvent, 2) ?? 0;
    const health = getNumberValueFromEvent(beastEvent, 3) ?? 0;
    const current_health = getNumberValueFromEvent(beastEvent, 4) ?? 0;
    const attack = getNumberValueFromEvent(beastEvent, 5) ?? 0;
    const type_beast = getNumberValueFromEvent(beastEvent, 6) ?? 0;

    console.log(type_beast);

    return {
      isBeast: true,
      beast: {
        beast_id,
        tier,
        level,
        health,
        current_health,
        attack,
        type_beast,
      },
      cards,
    };
  }
  return undefined;
};
