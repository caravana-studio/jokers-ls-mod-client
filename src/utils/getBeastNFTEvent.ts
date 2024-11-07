import { BEAST_NFT } from "../constants/dojoEventKeys";
import { DojoEvent } from "../types/DojoEvent";
import { BeastNFTEvent } from "../types/ScoreData";
import { getNumberValueFromEvent } from "./getNumberValueFromEvent";

export const getBeastNFTEvent = (
  events: DojoEvent[]
): BeastNFTEvent | undefined => {
  const beastNFTEvent = events.find((event) => event.keys[0] === BEAST_NFT);

  if (!beastNFTEvent) return undefined;
  const tier = getNumberValueFromEvent(beastNFTEvent, 0) ?? 0;
  const level = getNumberValueFromEvent(beastNFTEvent, 1) ?? 0;
  const beast_id = getNumberValueFromEvent(beastNFTEvent, 2) ?? 0;
  const token_id = getNumberValueFromEvent(beastNFTEvent, 3) ?? 0;
  return {
    beast_id,
    tier,
    level,
    token_id,
  };
};
