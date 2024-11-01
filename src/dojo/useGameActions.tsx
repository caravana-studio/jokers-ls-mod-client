import { shortString } from "starknet";
import { GAME_ID_EVENT, GAME_OVER_EVENT } from "../constants/dojoEventKeys";
import { getCardsFromEvents } from "../utils/getCardsFromEvents";
import { getCreateLevelEvents } from "../utils/getCreateLevelEvents";
import { getNumberValueFromEvents } from "../utils/getNumberValueFromEvent";
import { getPlayEvents } from "../utils/playEvents/getPlayEvents";
import {
  failedTransactionToast,
  showTransactionToast,
  updateTransactionToast,
} from "../utils/transactionNotifications";
import { useDojo } from "./useDojo";
import { getModifiersForContract } from "./utils/getModifiersForContract";

const createGameEmptyResponse = {
  gameId: 0,
  hand: [],
};

export const useGameActions = () => {
  const {
    setup: { client },
    account: { account },
  } = useDojo();

  const selectDeck = async (gameId: number, deckId: number) => {
    try {
      showTransactionToast();
      const { transaction_hash } = await client.game_system.select_deck({
        account,
        game_id: gameId,
        deck_id: deckId,
      });

      showTransactionToast(transaction_hash);

      const tx = await account.waitForTransaction(transaction_hash, {
        retryInterval: 100,
      });

      updateTransactionToast(transaction_hash, tx.isSuccess());
      if (tx.isSuccess()) {
        console.log("Success at select deck:", tx);
      } else {
        console.error("Error at select deck:", tx);
      }
    } catch (e) {
      failedTransactionToast();
      console.log(e);
      return 0;
    }
  };

  const selectSpecials = async (gameId: number, cardsIndex: number[]) => {
    try {
      showTransactionToast();
      const { transaction_hash } =
        await client.game_system.select_special_cards({
          account,
          game_id: gameId,
          cards_index: cardsIndex,
        });

      showTransactionToast(transaction_hash);

      const tx = await account.waitForTransaction(transaction_hash, {
        retryInterval: 100,
      });

      updateTransactionToast(transaction_hash, tx.isSuccess());
      if (tx.isSuccess()) {
        console.log("Success at select specialCards:", tx);
      } else {
        console.error("Error at select specialCards:", tx);
      }
    } catch (e) {
      failedTransactionToast();
      console.log(e);
      return 0;
    }
  };

  const selectModifiers = async (gameId: number, cardsIndex: number[]) => {
    try {
      showTransactionToast();
      const { transaction_hash } =
        await client.game_system.select_modifier_cards({
          account,
          game_id: gameId,
          cards_index: cardsIndex,
        });

      showTransactionToast(transaction_hash);

      const tx = await account.waitForTransaction(transaction_hash, {
        retryInterval: 100,
      });

      updateTransactionToast(transaction_hash, tx.isSuccess());
      if (tx.isSuccess()) {
        console.log("Success at select modifiers:", tx);
      } else {
        console.error("Error at select modifiers:", tx);
      }
    } catch (e) {
      failedTransactionToast();
      console.log(e);
      return 0;
    }
  };

  const createLevel = async (gameId: number) => {
    try {
      showTransactionToast();
      const { transaction_hash } = await client.game_system.create_level({
        account,
        game_id: gameId,
      });

      showTransactionToast(transaction_hash);

      const tx = await account.waitForTransaction(transaction_hash, {
        retryInterval: 100,
      });

      updateTransactionToast(transaction_hash, tx.isSuccess());
      if (tx.isSuccess()) {
        const events = tx.events;
        console.log("Success at createLevel:", tx);
        return getCreateLevelEvents(events);
      } else {
        console.error("Error at createLevel:", tx);
        return undefined;
      }
    } catch (e) {
      failedTransactionToast();
      console.log(e);
      return undefined;
    }
  };

  const createGame = async (username: string) => {
    try {
      showTransactionToast();
      const { transaction_hash } = await client.game_system.create_game({
        account,
        player_name: BigInt(shortString.encodeShortString(username)),
      });
      showTransactionToast(transaction_hash, "Creating game...");

      const tx = await account.waitForTransaction(transaction_hash, {
        retryInterval: 100,
      });

      updateTransactionToast(transaction_hash, tx.isSuccess());
      if (tx.isSuccess()) {
        const events = tx.events;
        const gameId = getNumberValueFromEvents(events, GAME_ID_EVENT, 0);
        console.log("Game " + gameId + " created");
        return {
          gameId,
          hand: getCardsFromEvents(events),
        };
      } else {
        console.error("Error creating game:", tx);
        return createGameEmptyResponse;
      }
    } catch (e) {
      failedTransactionToast();
      console.log(e);
      return createGameEmptyResponse;
    }
  };

  const discard = async (
    gameId: number,
    cards: number[],
    modifiers: { [key: number]: number[] }
  ) => {
    const { modifiers1 } = getModifiersForContract(cards, modifiers);
    try {
      showTransactionToast();
      const { transaction_hash } = await client.game_system.discard({
        account,
        game_id: gameId,
        cards_index: cards,
        modifiers_index: modifiers1,
      });
      showTransactionToast(transaction_hash);

      const tx = await account.waitForTransaction(transaction_hash, {
        retryInterval: 100,
      });

      updateTransactionToast(transaction_hash, tx.isSuccess());
      if (tx.isSuccess()) {
        const cards = getCardsFromEvents(tx.events);
        return {
          success: true,
          cards: cards,
          gameOver: !!tx.events.find(
            (event) => event.keys[0] === GAME_OVER_EVENT
          ),
        };
      } else {
        return {
          success: false,
          cards: [],
        };
      }
    } catch (e) {
      failedTransactionToast();
      console.log(e);
      return {
        success: false,
        cards: [],
      };
    }
  };

  const discardEffectCard = async (gameId: number, card: number) => {
    try {
      showTransactionToast();
      const { transaction_hash } = await client.game_system.discard_effect_card(
        {
          account,
          game_id: gameId,
          card_index: card,
        }
      );
      showTransactionToast(transaction_hash);

      const tx = await account.waitForTransaction(transaction_hash, {
        retryInterval: 100,
      });

      updateTransactionToast(transaction_hash, tx.isSuccess());
      if (tx.isSuccess()) {
        return {
          success: true,
          cards: getCardsFromEvents(tx.events),
        };
      } else {
        return {
          success: false,
          cards: [],
        };
      }
    } catch (e) {
      failedTransactionToast();
      console.log(e);
      return {
        success: false,
        cards: [],
      };
    }
  };

  const discardSpecialCard = async (gameId: number, card: number) => {
    try {
      const { transaction_hash } =
        await client.game_system.discard_special_card({
          account,
          game_id: gameId,
          special_card_index: card,
        });

      const tx = await account.waitForTransaction(transaction_hash, {
        retryInterval: 100,
      });

      return tx.isSuccess();
    } catch (e) {
      console.log(e);
      return failedTransactionToast();
    }
  };

  const play = async (
    gameId: number,
    cards: number[],
    modifiers: { [key: number]: number[] }
  ) => {
    const { modifiers1 } = getModifiersForContract(cards, modifiers);
    try {
      showTransactionToast();
      const { transaction_hash } = await client.game_system.play({
        account,
        game_id: gameId,
        cards_index: cards,
        modifiers_index: modifiers1,
      });
      showTransactionToast(transaction_hash);

      const tx = await account.waitForTransaction(transaction_hash, {
        retryInterval: 100,
      });

      updateTransactionToast(transaction_hash, tx.isSuccess());
      if (tx.isSuccess()) {
        const events = tx.events;
        return getPlayEvents(events);
      }
      return;
    } catch (e) {
      console.log(e);
      failedTransactionToast();
      return;
    }
  };

  return {
    createGame,
    discard,
    discardEffectCard,
    discardSpecialCard,
    play,
    selectDeck,
    selectSpecials,
    selectModifiers,
    createLevel,
  };
};
