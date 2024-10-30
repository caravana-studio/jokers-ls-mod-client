import { Hand } from "../types/Hand.ts";
import { Plays } from "./plays.ts";

export type Hands = Record<string, Hand>;

export const Hands: Hands = {
  NONE: {
    id: "None",
    value: Plays.NONE,
    name: "None",
    description: "No hand",
    order: 0,
  },
  ROYAL_FLUSH: {
    id: "RoyalFlush",
    value: Plays.ROYAL_FLUSH,
    name: "Royal Flush",
    description: "A, K, Q, J, 10, all the same suit",
    order: 11,
  },
  STRAIGHT_FLUSH: {
    id: "StraightFlush",
    value: Plays.STRAIGHT_FLUSH,
    name: "Straight Flush",
    description: "Five cards in a sequence, all in the same suit",
    order: 10,
  },
  FOUR_OF_A_KIND: {
    id: "FourOfAKind",
    value: Plays.FOUR_OF_A_KIND,
    name: "Four of a Kind",
    description: "All four cards of the same rank",
    order: 8,
  },
  FULL_HOUSE: {
    id: "FullHouse",
    value: Plays.FULL_HOUSE,
    name: "Full House",
    description: "Three of a kind with a pair",
    order: 7,
  },
  STRAIGHT: {
    id: "Straight",
    value: Plays.STRAIGHT,
    name: "Straight",
    description: "Five cards in a sequence",
    order: 6,
  },
  FLUSH: {
    id: "Flush",
    value: Plays.FLUSH,
    name: "Flush",
    description: "Any five cards of the same suit, but not in a sequence",
    order: 5,
  },
  THREE_OF_A_KIND: {
    id: "ThreeOfAKind",
    value: Plays.THREE_OF_A_KIND,
    name: "Three of a Kind",
    description: "Three cards of the same rank",
    order: 4,
  },
  TWO_PAIR: {
    id: "TwoPair",
    value: Plays.TWO_PAIR,
    name: "Two Pair",
    description: "Two different pairs",
    order: 3,
  },
  PAIR: {
    id: "OnePair",
    value: Plays.PAIR,
    name: "Pair",
    description: "Two cards of the same rank",
    order: 2,
  },
  HIGH_CARD: {
    id: "HighCard",
    value: Plays.HIGH_CARD,
    name: "High Card",
    description: "Highest card",
    order: 1,
  },
  FIVE_OF_A_KIND: {
    id: "FiveOfAKind",
    value: Plays.FIVE_OF_A_KIND,
    name: "Five of a Kind",
    description: "All five cards of the same rank",
    order: 9,
  },
};

export function parseHand(handId: string | undefined): Hand {
  //get a Hand type object using the Hands dictionary searching by id field, if no ID matches, then return NONE
  return Object.values(Hands).find((hand) => hand.id === handId) ?? Hands.NONE;
}
