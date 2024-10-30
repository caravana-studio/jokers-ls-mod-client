import { expect, test, beforeAll } from "vitest";
import { Plays } from "../../../enums/plays";
import { testCheckHand } from "../../../testUtils/testCheckHand";
import {
  C10,
  C2,
  C3,
  C5,
  CA,
  CJ,
  CQ,
  D10,
  D2,
  D3,
  D4,
  D5,
  D6,
  D7,
  D8,
  D9,
  DA,
  DK,
  DQ,
  H10,
  H2,
  H3,
  H4,
  H6,
  H7,
  H9,
  HA,
  HJ,
  HK,
  HQ,
  JOKER1,
  JOKER2,
  S10,
  S3,
  SA,
} from "../../mocks/cardMocks";
import {
  EasyFlush,
  AllCardsToHearts,
  EasyStraight,
} from "../../mocks/specialCardMocks";
import i18n from "../../../i18n";

beforeAll(async () => {
  await i18n.loadNamespaces(["traditional-cards", "neon-cards", "effects"]);
});

test("Flush with EasyFlush should work", () => {
  expect(testCheckHand([H2, H3, H4, H9, S10], [EasyFlush])).toBe(Plays.FLUSH);
});

test("Royal flush with Easy flush shouldn't work", () => {
  expect(testCheckHand([HJ, HQ, HA, C3, JOKER1], [EasyFlush])).toBe(
    Plays.FLUSH
  );
});

test("Royal flush with Easy flush shouldn't work case 2", () => {
  expect(testCheckHand([CA, CA, HA, JOKER2, JOKER1], [EasyFlush])).toBe(
    Plays.FIVE_OF_A_KIND
  );
});

test("Royal flush with Easy flush shouldn't work case 3", () => {
  expect(testCheckHand([DQ, DK, DA, DA, JOKER1], [EasyFlush])).toBe(
    Plays.FLUSH
  );
});

test("Straight flush with Easy flush shouldn't work", () => {
  expect(testCheckHand([D8, D9, C10, DA, JOKER1], [EasyFlush])).toBe(
    Plays.FLUSH
  );
});

test("Flush with EasyFlush and a joker should work", () => {
  expect(testCheckHand([H2, H3, H4, JOKER1], [EasyFlush])).toBe(Plays.FLUSH);
});

test("Flush with EasyFlush and two jokers should work", () => {
  expect(testCheckHand([H2, H3, JOKER2, JOKER1], [EasyFlush])).toBe(
    Plays.FLUSH
  );
});

test("Flush with EasyFlush case 2 should work", () => {
  expect(testCheckHand([C2, C5, CJ, CQ, SA], [EasyFlush])).toBe(Plays.FLUSH);
});

test("Flush with AllCardsToHearts should work", () => {
  expect(testCheckHand([H2, H3, H4, D10, S3], [AllCardsToHearts])).toBe(
    Plays.FLUSH
  );
});

test("Flush with AllCardsToHearts and a joker should work", () => {
  expect(testCheckHand([H2, H3, H4, D10, JOKER2], [AllCardsToHearts])).toBe(
    Plays.FLUSH
  );
});

test("Flush with EasyFlush and AllCardsToHearts should work", () => {
  expect(testCheckHand([H2, H3, H4, D10], [EasyFlush, AllCardsToHearts])).toBe(
    Plays.FLUSH
  );
});

test("Flush with EasyFlush and AllCardsToHearts and a joker should work", () => {
  expect(
    testCheckHand([H2, H3, H4, JOKER1], [EasyFlush, AllCardsToHearts])
  ).toBe(Plays.FLUSH);
});

test("Straight with EasyStraight should work", () => {
  expect(testCheckHand([H2, H3, H4, D5], [EasyStraight])).toBe(Plays.STRAIGHT);
});

test("Straight with EasyStraight first cards should work", () => {
  expect(testCheckHand([H3, H4, D5, D6, S10], [EasyStraight])).toBe(
    Plays.STRAIGHT
  );
});

test("Straight with EasyStraight last cards should work", () => {
  expect(testCheckHand([H3, H7, D8, D9, S10], [EasyStraight])).toBe(
    Plays.STRAIGHT
  );
});

test("Straight with EasyStraight and a gap filled with joker should work", () => {
  expect(testCheckHand([H6, H3, H4, JOKER1], [EasyStraight])).toBe(
    Plays.STRAIGHT
  );
});

test("Straight with EasyStraight and gaps filled with two jokers should work", () => {
  expect(testCheckHand([H6, D3, JOKER2, JOKER1], [EasyStraight])).toBe(
    Plays.STRAIGHT
  );
});

test("Low straight with EasyStraight and one gap should work", () => {
  expect(testCheckHand([H3, D4, SA, DA, JOKER1], [EasyStraight])).toBe(
    Plays.STRAIGHT
  );
});

test("Low straight with EasyStraight and two gaps should work", () => {
  expect(testCheckHand([D4, SA, JOKER2, JOKER1, D7], [EasyStraight])).toBe(
    Plays.STRAIGHT
  );
});

test("Straight with EasyStraight and gap filled with jokers at the end should work", () => {
  expect(testCheckHand([H4, C5, JOKER2, JOKER1], [EasyStraight])).toBe(
    Plays.STRAIGHT
  );
});

test("StraightFlush with EasyStraight and EasyFlush should work", () => {
  expect(testCheckHand([D2, D3, D4, D5], [EasyStraight, EasyFlush])).toBe(
    Plays.STRAIGHT_FLUSH
  );
});

test("RoyalFlush with EasyStraight and EasyFlush should work", () => {
  expect(testCheckHand([HA, HJ, HQ, HK, H10], [EasyStraight, EasyFlush])).toBe(
    Plays.ROYAL_FLUSH
  );
});

test("RoyalFlush with EasyStraight and EasyFlush and a gap should work", () => {
  expect(
    testCheckHand([HA, HJ, HQ, JOKER1, H10], [EasyStraight, EasyFlush])
  ).toBe(Plays.ROYAL_FLUSH);
});

test("RoyalFlush with EasyStraight and EasyFlush and two gaps should work", () => {
  expect(
    testCheckHand([HA, HJ, JOKER2, JOKER1, HQ], [EasyStraight, EasyFlush])
  ).toBe(Plays.ROYAL_FLUSH);
});

test("StraightFlush with EasyStraight, EasyFlush and AllCardsToHearts should work", () => {
  expect(
    testCheckHand([H2, H3, H4, D5], [EasyStraight, EasyFlush, AllCardsToHearts])
  ).toBe(Plays.STRAIGHT_FLUSH);
});

test("RoyalFlush with EasyStraight, EasyFlush and AllCardsToHearts should work", () => {
  expect(
    testCheckHand(
      [HA, HJ, HQ, HK, H10],
      [EasyStraight, EasyFlush, AllCardsToHearts]
    )
  ).toBe(Plays.ROYAL_FLUSH);
});

test("FiveOfAKind with three of a kind, two jokers and AllCardsToHearts should work", () => {
  expect(testCheckHand([SA, CA, HA, JOKER2, JOKER1], [AllCardsToHearts])).toBe(
    Plays.FIVE_OF_A_KIND
  );
});

test("FiveOfAKind with four of a kind, a jokers and AllCardsToHearts should work", () => {
  expect(testCheckHand([SA, CA, HA, DA, JOKER1], [AllCardsToHearts])).toBe(
    Plays.FIVE_OF_A_KIND
  );
});

test("Royal flush shouldnt work with a seven, four jokers and easy straight", () => {
  expect(
    testCheckHand([D7, JOKER2, JOKER2, JOKER1, JOKER1], [EasyStraight])
  ).toBe(Plays.STRAIGHT_FLUSH);
});

test("Royal flush should work with three cards, two jokers and easy straight", () => {
  expect(testCheckHand([HJ, HQ, HK, JOKER2, JOKER1], [EasyStraight])).toBe(
    Plays.ROYAL_FLUSH
  );
});

test("Straight flush should work with two cards, two jokers, easy straight and easy flush", () => {
  expect(
    testCheckHand([HJ, HQ, JOKER2, JOKER1], [EasyStraight, EasyFlush])
  ).toBe(Plays.STRAIGHT_FLUSH);
});

test("Straight should work with two cards, two jokers and easy straight", () => {
  expect(testCheckHand([HJ, HQ, JOKER2, JOKER1], [EasyStraight])).toBe(
    Plays.STRAIGHT
  );
});

test("Straight ace flush shouldnt work with A,2,3 a joker and easy straight", () => {
  expect(testCheckHand([H2, H3, HA, HQ, JOKER1], [EasyStraight])).toBe(
    Plays.FLUSH
  );
});

test("Straight ace flush should work with easy straight", () => {
  expect(testCheckHand([H2, H3, HA, H4, JOKER1], [EasyStraight])).toBe(
    Plays.STRAIGHT_FLUSH
  );
});
