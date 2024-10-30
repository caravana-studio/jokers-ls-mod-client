import { Card } from "../types/Card";

export const handsAreDifferent = (a: Card[], b: Card[]) => {
  return (
    a.some((card, index) => card.img !== b[index].img) || a.length !== b.length
  );
};
