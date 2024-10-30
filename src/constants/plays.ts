import i18n from "i18next";
import { Card } from "../types/Card";
import {
  C7,
  C9,
  CK,
  D10,
  D7,
  D8,
  D9,
  DA,
  DJ,
  DK,
  DQ,
  H4,
  H7,
  H9,
  HA,
  HJ,
  S10,
  S7,
  S9,
} from "../utils/mocks/cardMocks";

interface PlaysData {
  name: string;
  description: string;
  example: Card[];
  importantCards: Card[];
  multi: number;
  points: number;
}

export const PLAYS: string[] = [];
export const PLAYS_DATA: PlaysData[] = [];

const loadTranslations = async () => {
  await i18n.loadNamespaces(["plays"]);

  Object.assign(PLAYS, [
    "NONE",
    i18n.t("playsData.royalFlush.name", { ns: "plays" }),
    i18n.t("playsData.straightFlush.name", { ns: "plays" }),
    i18n.t("playsData.fiveOfAKind.name", { ns: "plays" }),
    i18n.t("playsData.fourOfAKind.name", { ns: "plays" }),
    i18n.t("playsData.fullHouse.name", { ns: "plays" }),
    i18n.t("playsData.straight.name", { ns: "plays" }),
    i18n.t("playsData.flush.name", { ns: "plays" }),
    i18n.t("playsData.threeOfAKind.name", { ns: "plays" }),
    i18n.t("playsData.twoPair.name", { ns: "plays" }),
    i18n.t("playsData.pair.name", { ns: "plays" }),
    i18n.t("playsData.highCard.name", { ns: "plays" }),
  ]);

  //TODO: update multi and points with real data

  Object.assign(PLAYS_DATA, [
    {
      name: i18n.t("playsData.royalFlush.name", { ns: "plays" }),
      description: i18n.t("playsData.royalFlush.description", { ns: "plays" }),
      example: [D10, DJ, DQ, DK, DA],
      importantCards: [D10, DJ, DQ, DK, DA],
      multi: 14,
      points: 100,
    },
    {
      name: i18n.t("playsData.straightFlush.name", { ns: "plays" }),
      description: i18n.t("playsData.straightFlush.description", {
        ns: "plays",
      }),
      example: [D7, D8, D9, D10, DJ],
      importantCards: [D7, D8, D9, D10, DJ],
      multi: 8,
      points: 100,
    },
    {
      name: i18n.t("playsData.fiveOfAKind.name", { ns: "plays" }),
      description: i18n.t("playsData.fiveOfAKind.description", { ns: "plays" }),
      example: [H7, D7, C7, S7, S7],
      importantCards: [H7, D7, C7, S7, S7],
      multi: 7,
      points: 75,
    },
    {
      name: i18n.t("playsData.fourOfAKind.name", { ns: "plays" }),
      description: i18n.t("playsData.fourOfAKind.description", { ns: "plays" }),
      example: [H7, D7, C7, S7, H9],
      importantCards: [H7, D7, C7, S7],
      multi: 7,
      points: 60,
    },
    {
      name: i18n.t("playsData.fullHouse.name", { ns: "plays" }),
      description: i18n.t("playsData.fullHouse.description", { ns: "plays" }),
      example: [H7, D7, C7, S9, H9],
      importantCards: [H7, D7, C7, S9, H9],
      multi: 4,
      points: 40,
    },
    {
      name: i18n.t("playsData.straight.name", { ns: "plays" }),
      description: i18n.t("playsData.straight.description", { ns: "plays" }),
      example: [D7, D8, H9, S10, HJ],
      importantCards: [D7, D8, H9, S10, HJ],
      multi: 4,
      points: 40,
    },
    {
      name: i18n.t("playsData.flush.name", { ns: "plays" }),
      description: i18n.t("playsData.flush.description", { ns: "plays" }),
      example: [HA, H7, H9, H4, HJ],
      importantCards: [HA, H7, H9, H4, HJ],
      multi: 4,
      points: 35,
    },
    {
      name: i18n.t("playsData.threeOfAKind.name", { ns: "plays" }),
      description: i18n.t("playsData.threeOfAKind.description", {
        ns: "plays",
      }),
      example: [C9, S9, H9, HA, D7],
      importantCards: [C9, S9, H9],
      multi: 3,
      points: 30,
    },
    {
      name: i18n.t("playsData.twoPair.name", { ns: "plays" }),
      description: i18n.t("playsData.twoPair.description", { ns: "plays" }),
      example: [H7, D7, C9, S9, HA],
      importantCards: [H7, D7, C9, S9],
      multi: 3,
      points: 20,
    },
    {
      name: i18n.t("playsData.pair.name", { ns: "plays" }),
      description: i18n.t("playsData.pair.description", { ns: "plays" }),
      example: [H7, D7, HA, CK, DQ],
      importantCards: [H7, D7],
      multi: 2,
      points: 10,
    },
    {
      name: i18n.t("playsData.highCard.name", { ns: "plays" }),
      description: i18n.t("playsData.highCard.description", { ns: "plays" }),
      example: [HA, CK, DQ, S9, H7],
      importantCards: [HA],
      multi: 1,
      points: 5,
    },
  ]);
};

i18n.on("initialized", loadTranslations);
i18n.on("languageChanged", loadTranslations);
