import { ITEM_CHALLENGE_COMPLETED } from "../../constants/dojoEventKeys";
import { DojoEvent } from "../../types/DojoEvent";
import { getNumberValueFromEvent } from "../getNumberValueFromEvent";

export const getItemChallengeCompletedEvent = (
  events: DojoEvent[]
): number[] | undefined => {
  const itemChallengeCompletedEvents = events.filter(
    (event) => event.keys[0] === ITEM_CHALLENGE_COMPLETED
  );
  return (
    itemChallengeCompletedEvents &&
    itemChallengeCompletedEvents.map((event) => {
      return getNumberValueFromEvent(event, 0) ?? 0;
    })
  );
};
