import { REWARD_EVENT } from "../constants/dojoEventKeys";
import { DojoEvent } from "../types/DojoEvent";
import { getNumberValueFromEvent } from "./getNumberValueFromEvent";

export const getRewardsEvents = (events: DojoEvent[]): number[] => {
  return events
    .filter((event) => event.keys[0] === REWARD_EVENT)
    .flatMap((event) => {
      const rewardsId = Array.from(
        { length: event.data.length },
        (_, index) => getNumberValueFromEvent(event, index) ?? 0
      );

      return rewardsId;
    });
};
