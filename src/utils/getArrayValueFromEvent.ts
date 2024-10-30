import { DojoEvent } from "../types/DojoEvent";
import { getNumberValueFromEvent } from "./getNumberValueFromEvent";

export const getArrayValueFromEvent = (
  event: DojoEvent | undefined,
  indexToGet: number
): number[] => {
  if (!event) {
    return []
  }
  const array: number[] = []
  const arrayLength = getNumberValueFromEvent(event, indexToGet) ?? 0
  for (let i = indexToGet + 1; i <= indexToGet + arrayLength; i++) {
    const value = getNumberValueFromEvent(event, i)
    if (value || value === 0) {
      array.push(value)
    }
  }
  return array
};
