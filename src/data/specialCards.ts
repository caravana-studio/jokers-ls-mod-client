import i18n from "i18next";
import { CardDataMap } from "../types/CardData";

export const SPECIAL_CARDS_DATA: CardDataMap = {};

const loadTranslations = async () => {
  await i18n.loadNamespaces(["effects"]);

  Object.assign(SPECIAL_CARDS_DATA, {
    300: {
      name: i18n.t("specialCardsData.300.name", { ns: "effects" }),
      description: i18n.t("specialCardsData.300.description", {
        ns: "effects",
      }),
    },
    301: {
      name: i18n.t("specialCardsData.301.name", { ns: "effects" }),
      description: i18n.t("specialCardsData.301.description", {
        ns: "effects",
      }),
    },
    302: {
      name: i18n.t("specialCardsData.302.name", { ns: "effects" }),
      description: i18n.t("specialCardsData.302.description", {
        ns: "effects",
      }),
    },
    303: {
      name: i18n.t("specialCardsData.303.name", { ns: "effects" }),
      description: i18n.t("specialCardsData.303.description", {
        ns: "effects",
      }),
    },
    304: {
      name: i18n.t("specialCardsData.304.name", { ns: "effects" }),
      description: i18n.t("specialCardsData.304.description", {
        ns: "effects",
      }),
    },
    305: {
      name: i18n.t("specialCardsData.305.name", { ns: "effects" }),
      description: i18n.t("specialCardsData.305.description", {
        ns: "effects",
      }),
    },
    306: {
      name: i18n.t("specialCardsData.306.name", { ns: "effects" }),
      description: i18n.t("specialCardsData.306.description", {
        ns: "effects",
      }),
    },
    307: {
      name: i18n.t("specialCardsData.307.name", { ns: "effects" }),
      description: i18n.t("specialCardsData.307.description", {
        ns: "effects",
      }),
    },
    308: {
      name: i18n.t("specialCardsData.308.name", { ns: "effects" }),
      description: i18n.t("specialCardsData.308.description", {
        ns: "effects",
      }),
    },
    309: {
      name: i18n.t("specialCardsData.309.name", { ns: "effects" }),
      description: i18n.t("specialCardsData.309.description", {
        ns: "effects",
      }),
    },
    310: {
      name: i18n.t("specialCardsData.310.name", { ns: "effects" }),
      description: i18n.t("specialCardsData.310.description", {
        ns: "effects",
      }),
    },
    311: {
      name: i18n.t("specialCardsData.311.name", { ns: "effects" }),
      description: i18n.t("specialCardsData.311.description", {
        ns: "effects",
      }),
    },
    312: {
      name: i18n.t("specialCardsData.312.name", { ns: "effects" }),
      description: i18n.t("specialCardsData.312.description", {
        ns: "effects",
      }),
    },
    313: {
      name: i18n.t("specialCardsData.313.name", { ns: "effects" }),
      description: i18n.t("specialCardsData.313.description", {
        ns: "effects",
      }),
    },
    314: {
      name: i18n.t("specialCardsData.314.name", { ns: "effects" }),
      description: i18n.t("specialCardsData.314.description", {
        ns: "effects",
      }),
    },
    315: {
      name: i18n.t("specialCardsData.315.name", { ns: "effects" }),
      description: i18n.t("specialCardsData.315.description", {
        ns: "effects",
      }),
    },
    316: {
      name: i18n.t("specialCardsData.316.name", { ns: "effects" }),
      description: i18n.t("specialCardsData.316.description", {
        ns: "effects",
      }),
    },
    317: {
      name: i18n.t("specialCardsData.317.name", { ns: "effects" }),
      description: i18n.t("specialCardsData.317.description", {
        ns: "effects",
      }),
    },
    318: {
      name: i18n.t("specialCardsData.318.name", { ns: "effects" }),
      description: i18n.t("specialCardsData.318.description", {
        ns: "effects",
      }),
    },
    319: {
      name: i18n.t("specialCardsData.319.name", { ns: "effects" }),
      description: i18n.t("specialCardsData.319.description", {
        ns: "effects",
      }),
    },
    320: {
      name: i18n.t("specialCardsData.320.name", { ns: "effects" }),
      description: i18n.t("specialCardsData.320.description", {
        ns: "effects",
      }),
    },
    321: {
      name: i18n.t("specialCardsData.321.name", { ns: "effects" }),
      description: i18n.t("specialCardsData.321.description", {
        ns: "effects",
      }),
    },
  });
};

i18n.on("initialized", loadTranslations);
i18n.on("languageChanged", loadTranslations);
