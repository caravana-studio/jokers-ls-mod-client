import { expect, test, beforeAll } from "vitest";
import { Plays } from "../../../enums/plays";
import { testCheckHand } from "../../../testUtils/testCheckHand";
import {
  C10,
  C2,
  C3,
  C4,
  C7,
  C8,
  C9,
  CA,
  CJ,
  CK,
  D2,
  D3,
  D4,
  D5,
  DJ,
  H10,
  H2,
  H3,
  H5,
  H6,
  H7,
  H9,
  HA,
  HJ,
  HK,
  HQ,
  S10,
  S2,
  S3,
  S5,
  S6,
  S7,
  S8,
  S9,
  SA,
  SJ,
} from "../../mocks/cardMocks";
import i18n from "../../../i18n";

beforeAll(async () => {
  await i18n.loadNamespaces(["traditional-cards", "neon-cards", "effects"]);
});

test("Royal flush should work", () => {
  expect(testCheckHand([HA, HK, HQ, HJ, H10])).toBe(Plays.ROYAL_FLUSH);
});

test("StraightFlush should work", () => {
  expect(testCheckHand([H9, HK, HQ, HJ, H10])).toBe(Plays.STRAIGHT_FLUSH);
});

test("FourOfAKind should work", () => {
  expect(testCheckHand([H2, C2, D2, S2])).toBe(Plays.FOUR_OF_A_KIND);
});

test("FullHouse should work", () => {
  expect(testCheckHand([H2, C2, H3, C3, D3])).toBe(Plays.FULL_HOUSE);
});

test("Ace Straight should work", () => {
  expect(testCheckHand([HA, C2, H3, D4, H5])).toBe(Plays.STRAIGHT);
});

test("Straight should work", () => {
  expect(testCheckHand([C2, H3, D4, H5, S6])).toBe(Plays.STRAIGHT);
});

test("Straight high should work", () => {
  expect(testCheckHand([C10, HK, DJ, HQ, SA])).toBe(Plays.STRAIGHT);
});

test("Straight shouldn't work", () => {
  expect(testCheckHand([HA, H3, D4, H5, HA])).toBe(Plays.PAIR);
});

test("Flush should work", () => {
  expect(testCheckHand([H2, H3, HQ, HK, H10])).toBe(Plays.FLUSH);
});

test("ThreeOfAKind should work", () => {
  expect(testCheckHand([H2, C2, D2])).toBe(Plays.THREE_OF_A_KIND);
});

test("Two Pairs should work", () => {
  expect(testCheckHand([H2, C2, H3, C3])).toBe(Plays.TWO_PAIR);
});

test("Pair should work", () => {
  expect(testCheckHand([H2, C2])).toBe(Plays.PAIR);
});

test("HighCard should work", () => {
  expect(testCheckHand([H2])).toBe(Plays.HIGH_CARD);
});

test("HighCard with A should work", () => {
  expect(testCheckHand([HA])).toBe(Plays.HIGH_CARD);
});

test("FiveOfAKind should work", () => {
  expect(testCheckHand([H2, C2, D2, S2, H2])).toBe(Plays.FIVE_OF_A_KIND);
});

// Straight
test("Straight case 1", () => {
  expect(testCheckHand([CA, C2, S3, C4, D5])).toBe(Plays.STRAIGHT);
});

test("Straight case 2", () => {
  expect(testCheckHand([S7, S8, C9, S10, DJ])).toBe(Plays.STRAIGHT);
});

test("Straight case 3", () => {
  expect(testCheckHand([S5, H6, H7, C8, S9])).toBe(Plays.STRAIGHT);
});

test("Straight ace 2 case 1", () => {
  expect(testCheckHand([SJ, HQ, HK, CA, S2])).toBe(Plays.HIGH_CARD);
});

test("Straight ace 3 case 1", () => {
  expect(testCheckHand([S3, HQ, HK, CA, S2])).toBe(Plays.HIGH_CARD);
});

test("Straight ace 3 case 2", () => {
  expect(testCheckHand([SJ, HQ, HK, CA, S2])).toBe(Plays.HIGH_CARD);
});

// Flush
test("Flush case 1", () => {
  expect(testCheckHand([C3, C7, C8, CJ, CK])).toBe(Plays.FLUSH);
});
