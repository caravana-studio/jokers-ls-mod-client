import { Cards } from "../enums/cards";
import { Suits } from "../enums/suits";
import { CardDataMap } from "../types/CardData";
import i18n from 'i18next';

export const TRADITIONAL_CARDS_DATA: CardDataMap = {};
export const NEON_CARDS_DATA: CardDataMap = {};

const loadTranslations = async () => {
  await i18n.loadNamespaces(['traditional-cards', 'neon-cards']);

  for (let i = 0; i <= 53; i++) {
    TRADITIONAL_CARDS_DATA[i] = {
      name: i18n.t(`traditionalCardsData.${i}.name`, {ns:'traditional-cards'}),
      description: i18n.t(`traditionalCardsData.${i}.description`, {ns:'traditional-cards'}),
      card: CARDS_SUIT_DATA[i].card,
      suit: CARDS_SUIT_DATA[i].suit,
    };
  }
  
  for (let i = 200; i <= 251; i++) {
    NEON_CARDS_DATA[i] = {
      name: i18n.t(`neonCardsData.${i}.name`, {ns:'neon-cards'}),
      description: i18n.t(`neonCardsData.${i}.description`, {ns:'neon-cards'}),
      card: CARDS_SUIT_DATA[i].card,
      suit: CARDS_SUIT_DATA[i].suit,
    };
  }
}

i18n.on('initialized', loadTranslations);
i18n.on('languageChanged', loadTranslations);

interface CardMultiSuitData {
  card?: Cards;
  suit?: Suits;
}

export type CardMultiSuitDataMap = {
  [key: number]: CardMultiSuitData;
};

export const CARDS_SUIT_DATA: CardMultiSuitDataMap = {
  0: {
    card: Cards.TWO,
    suit: Suits.CLUBS,
  },
  1: {
    card: Cards.THREE,
    suit: Suits.CLUBS,
  },
  2: {
    card: Cards.FOUR,
    suit: Suits.CLUBS,
  },
  3: {
    card: Cards.FIVE,
    suit: Suits.CLUBS,
  },
  4: {
    card: Cards.SIX,
    suit: Suits.CLUBS,
  },
  5: {
    card: Cards.SEVEN,
    suit: Suits.CLUBS,
  },
  6: {
    card: Cards.EIGHT,
    suit: Suits.CLUBS,
  },
  7: {
    card: Cards.NINE,
    suit: Suits.CLUBS,
  },
  8: {
    card: Cards.TEN,
    suit: Suits.CLUBS,
  },
  9: {
    card: Cards.JACK,
    suit: Suits.CLUBS,
  },
  10: {
    card: Cards.QUEEN,
    suit: Suits.CLUBS,
  },
  11: {
    card: Cards.KING,
    suit: Suits.CLUBS,
  },
  12: {
    card: Cards.ACE,
    suit: Suits.CLUBS,
  },
  13: {
    card: Cards.TWO,
    suit: Suits.DIAMONDS,
  },
  14: {
    card: Cards.THREE,
    suit: Suits.DIAMONDS,
  },
  15: {
    card: Cards.FOUR,
    suit: Suits.DIAMONDS,
  },
  16: {
    card: Cards.FIVE,
    suit: Suits.DIAMONDS,
  },
  17: {
    card: Cards.SIX,
    suit: Suits.DIAMONDS,
  },
  18: {
    card: Cards.SEVEN,
    suit: Suits.DIAMONDS,
  },
  19: {
    card: Cards.EIGHT,
    suit: Suits.DIAMONDS,
  },
  20: {
    card: Cards.NINE,
    suit: Suits.DIAMONDS,
  },
  21: {
    card: Cards.TEN,
    suit: Suits.DIAMONDS,
  },
  22: {
    card: Cards.JACK,
    suit: Suits.DIAMONDS,
  },
  23: {
    card: Cards.QUEEN,
    suit: Suits.DIAMONDS,
  },
  24: {
    card: Cards.KING,
    suit: Suits.DIAMONDS,
  },
  25: {
    card: Cards.ACE,
    suit: Suits.DIAMONDS,
  },
  26: {
    card: Cards.TWO,
    suit: Suits.HEARTS,
  },
  27: {
    card: Cards.THREE,
    suit: Suits.HEARTS,
  },
  28: {
    card: Cards.FOUR,
    suit: Suits.HEARTS,
  },
  29: {
    card: Cards.FIVE,
    suit: Suits.HEARTS,
  },
  30: {
    card: Cards.SIX,
    suit: Suits.HEARTS,
  },
  31: {
    card: Cards.SEVEN,
    suit: Suits.HEARTS,
  },
  32: {
    card: Cards.EIGHT,
    suit: Suits.HEARTS,
  },
  33: {
    card: Cards.NINE,
    suit: Suits.HEARTS,
  },
  34: {
    card: Cards.TEN,
    suit: Suits.HEARTS,
  },
  35: {
    card: Cards.JACK,
    suit: Suits.HEARTS,
  },
  36: {
    card: Cards.QUEEN,
    suit: Suits.HEARTS,
  },
  37: {
    card: Cards.KING,
    suit: Suits.HEARTS,
  },
  38: {
    card: Cards.ACE,
    suit: Suits.HEARTS,
  },
  39: {
    card: Cards.TWO,
    suit: Suits.SPADES,
  },
  40: {
    card: Cards.THREE,
    suit: Suits.SPADES,
  },
  41: {
    card: Cards.FOUR,
    suit: Suits.SPADES,
  },
  42: {
    card: Cards.FIVE,
    suit: Suits.SPADES,
  },
  43: {
    card: Cards.SIX,
    suit: Suits.SPADES,
  },
  44: {
    card: Cards.SEVEN,
    suit: Suits.SPADES,
  },
  45: {
    card: Cards.EIGHT,
    suit: Suits.SPADES,
  },
  46: {
    card: Cards.NINE,
    suit: Suits.SPADES,
  },
  47: {
    card: Cards.TEN,
    suit: Suits.SPADES,
  },
  48: {
    card: Cards.JACK,
    suit: Suits.SPADES,
  },
  49: {
    card: Cards.QUEEN,
    suit: Suits.SPADES,
  },
  50: {
    card: Cards.KING,
    suit: Suits.SPADES,
  },
  51: {
    card: Cards.ACE,
    suit: Suits.SPADES,
  },
  52: {
    card: Cards.JOKER,
    suit: Suits.JOKER,
  },
  53: {
    card: Cards.JOKER,
    suit: Suits.JOKER,
  },
  200: {
    card: Cards.TWO,
    suit: Suits.CLUBS,
  },
  201: {
    card: Cards.THREE,
    suit: Suits.CLUBS,
  },
  202: {
    card: Cards.FOUR,
    suit: Suits.CLUBS,
  },
  203: {
    card: Cards.FIVE,
    suit: Suits.CLUBS,
  },
  204: {
    card: Cards.SIX,
    suit: Suits.CLUBS,
  },
  205: {
    card: Cards.SEVEN,
    suit: Suits.CLUBS,
  },
  206: {
    card: Cards.EIGHT,
    suit: Suits.CLUBS,
  },
  207: {
    card: Cards.NINE,
    suit: Suits.CLUBS,
  },
  208: {
    card: Cards.TEN,
    suit: Suits.CLUBS,
  },
  209: {
    card: Cards.JACK,
    suit: Suits.CLUBS,
  },
  210: {
    card: Cards.QUEEN,
    suit: Suits.CLUBS,
  },
  211: {
    card: Cards.KING,
    suit: Suits.CLUBS,
  },
  212: {
    card: Cards.ACE,
    suit: Suits.CLUBS,
  },
  213: {
    card: Cards.TWO,
    suit: Suits.DIAMONDS,
  },
  214: {
    card: Cards.THREE,
    suit: Suits.DIAMONDS,
  },
  215: {
    card: Cards.FOUR,
    suit: Suits.DIAMONDS,
  },
  216: {
    card: Cards.FIVE,
    suit: Suits.DIAMONDS,
  },
  217: {
    card: Cards.SIX,
    suit: Suits.DIAMONDS,
  },
  218: {
    card: Cards.SEVEN,
    suit: Suits.DIAMONDS,
  },
  219: {
    card: Cards.EIGHT,
    suit: Suits.DIAMONDS,
  },
  220: {
    card: Cards.NINE,
    suit: Suits.DIAMONDS,
  },
  221: {
    card: Cards.TEN,
    suit: Suits.DIAMONDS,
  },
  222: {
    card: Cards.JACK,
    suit: Suits.DIAMONDS,
  },
  223: {
    card: Cards.QUEEN,
    suit: Suits.DIAMONDS,
  },
  224: {
    card: Cards.KING,
    suit: Suits.DIAMONDS,
  },
  225: {
    card: Cards.ACE,
    suit: Suits.DIAMONDS,
  },
  226: {
    card: Cards.TWO,
    suit: Suits.HEARTS,
  },
  227: {
    card: Cards.THREE,
    suit: Suits.HEARTS,
  },
  228: {
    card: Cards.FOUR,
    suit: Suits.HEARTS,
  },
  229: {
    card: Cards.FIVE,
    suit: Suits.HEARTS,
  },
  230: {
    card: Cards.SIX,
    suit: Suits.HEARTS,
  },
  231: {
    card: Cards.SEVEN,
    suit: Suits.HEARTS,
  },
  232: {
    card: Cards.EIGHT,
    suit: Suits.HEARTS,
  },
  233: {
    card: Cards.NINE,
    suit: Suits.HEARTS,
  },
  234: {
    card: Cards.TEN,
    suit: Suits.HEARTS,
  },
  235: {
    card: Cards.JACK,
    suit: Suits.HEARTS,
  },
  236: {
    card: Cards.QUEEN,
    suit: Suits.HEARTS,
  },
  237: {
    card: Cards.KING,
    suit: Suits.HEARTS,
  },
  238: {
    card: Cards.ACE,
    suit: Suits.HEARTS,
  },
  239: {
    card: Cards.TWO,
    suit: Suits.SPADES,
  },
  240: {
    card: Cards.THREE,
    suit: Suits.SPADES,
  },
  241: {
    card: Cards.FOUR,
    suit: Suits.SPADES,
  },
  242: {
    card: Cards.FIVE,
    suit: Suits.SPADES,
  },
  243: {
    card: Cards.SIX,
    suit: Suits.SPADES,
  },
  244: {
    card: Cards.SEVEN,
    suit: Suits.SPADES,
  },
  245: {
    card: Cards.EIGHT,
    suit: Suits.SPADES,
  },
  246: {
    card: Cards.NINE,
    suit: Suits.SPADES,
  },
  247: {
    card: Cards.TEN,
    suit: Suits.SPADES,
  },
  248: {
    card: Cards.JACK,
    suit: Suits.SPADES,
  },
  249: {
    card: Cards.QUEEN,
    suit: Suits.SPADES,
  },
  250: {
    card: Cards.KING,
    suit: Suits.SPADES,
  },
  251: {
    card: Cards.ACE,
    suit: Suits.SPADES,
  },
};
