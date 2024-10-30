import { BLUE_LIGHT, VIOLET_LIGHT } from "../theme/colors";
import { Card } from "../types/Card";
import { getCardData } from "./getCardData";

import i18n from "i18next";

export const t = (key: string) => {
  return i18n.t(key, { ns: "game" });
};

export const colorizeText = (inputText: string) => {
  const pointsTranslation = t("points");
  const escapedPointsTranslation = pointsTranslation.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );
  const parts = inputText.split(
    new RegExp(`((?:\\+\\d+\\s*(?:${escapedPointsTranslation}|multi))+)`, "g")
  );

  return parts.map((part, index) => {
    const pointsRegex = new RegExp(`^\\+\\d+\\s*(${pointsTranslation})?`);

    if (/^\+\d+\s*multi/.test(part)) {
      return (
        <span
          key={index}
          style={{ fontWeight: "bold", color: `${VIOLET_LIGHT}` }}
        >
          {part}
        </span>
      );
    }

    if (pointsRegex.test(part)) {
      return (
        <span
          key={index}
          style={{ fontWeight: "bold", color: `${BLUE_LIGHT}` }}
        >
          {part}
        </span>
      );
    }

    return part;
  });
};

export const getTooltip = (card: Card, isPack = false) => {
  const { name, description } = getCardData(card, isPack);
  const tooltip = `${name}: ${description}`;
  return (
    <>
      {colorizeText(card.isModifier || card.isSpecial ? description : tooltip)}
    </>
  );
};
