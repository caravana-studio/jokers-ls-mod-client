import { useAccount, useConnect } from "@starknet-react/core";
import { shortString } from "starknet";
import {
  CREATE_GAME_EVENT,
  PLAY_GAME_OVER_EVENT,
} from "../constants/dojoEventKeys";
import { Card } from "../types/Card";
import { getCardsFromEvents } from "../utils/getCardsFromEvents";
import { getCreateLevelEvents } from "../utils/getCreateLevelEvents";
import { getCreateRewardsEvents } from "../utils/getCreateRewardsEvent";
import { getNumberValueFromEvents } from "../utils/getNumberValueFromEvent";
import { getResultBlisterPackEvent } from "../utils/getResultBlisterPackEvent";
import { getBeastAttackEvent } from "../utils/playEvents/getBeastAttackEvent";
import { getPlayEvents } from "../utils/playEvents/getPlayEvents";
import {
  failedTransactionToast,
  showTransactionToast,
  updateTransactionToast,
} from "../utils/transactionNotifications";
import { useDojo } from "./useDojo";

const createGameEmptyResponse = {
  gameId: 0,
  hand: [],
};

export const useGameActions = () => {
  const {
    setup: { client },
    account,
  } = useDojo();

  const { account: controllerAccount } = useAccount();
  const { connect, connectors } = useConnect();

  const reconnectController = () => {
    if (!controllerAccount) {
      connect({ connector: connectors[0] });
      return;
    }
  };

  const selectDeck = async (
    gameId: number,
    deckId: number
  ): Promise<Card[]> => {
    reconnectController();
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
        return getResultBlisterPackEvent(tx.events);
      } else {
        console.error("Error at select deck:", tx);
      }
      return [];
    } catch (e) {
      failedTransactionToast();
      console.log(e);
      return [];
    }
  };

  const selectSpecials = async (
    gameId: number,
    cardsIndex: number[]
  ): Promise<Card[]> => {
    reconnectController();
    try {
      showTransactionToast();
      console.log("paylaod", {
        account,
        game_id: gameId,
        cards_index: cardsIndex,
      });
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
        return getResultBlisterPackEvent(tx.events);
      } else {
        console.error("Error at select specialCards:", tx);
      }
      return [];
    } catch (e) {
      failedTransactionToast();
      console.log(e);
      return [];
    }
  };

  const selectModifiers = async (gameId: number, cardsIndex: number[]) => {
    reconnectController();
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
      return tx.isSuccess();
    } catch (e) {
      failedTransactionToast();
      console.log(e);
      return false;
    }
  };

  const selectAdventurerCs = async (
    gameId: number,
    cardsIndex: number[]
  ): Promise<boolean> => {
    reconnectController();
    try {
      showTransactionToast();
      const { transaction_hash } =
        await client.game_system.select_aventurer_cards({
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
        console.log("Success at select adventurer cards:", tx);
      } else {
        console.error("Error at select adventurer cards:", tx);
      }
      return tx.isSuccess();
    } catch (e) {
      failedTransactionToast();
      console.log(e);
      return false;
    }
  };

  const createLevel = async (gameId: number) => {
    reconnectController();
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

  const skipFailedLevel = async (gameId: number) => {
    try {
      showTransactionToast();
      const { transaction_hash } =
        await client.game_system.skip_unpassed_obstacle({
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
        console.log("Success at skipFailedLevel:", tx);
        return getCreateLevelEvents(events);
      } else {
        console.error("Error at skipFailedLevel:", tx);
        return undefined;
      }
    } catch (e) {
      failedTransactionToast();
      console.log(e);
      return undefined;
    }
  };

  const createGame = async (username: string) => {
    reconnectController();
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
        const gameId = getNumberValueFromEvents(events, CREATE_GAME_EVENT, 0);
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

  const createReward = async (gameId: number, rewardId: number) => {
    reconnectController();
    try {
      showTransactionToast();
      const { transaction_hash } = await client.game_system.create_reward({
        account,
        game_id: gameId,
        reward_index: rewardId,
      });

      showTransactionToast(transaction_hash);

      const tx = await account.waitForTransaction(transaction_hash, {
        retryInterval: 100,
      });

      updateTransactionToast(transaction_hash, tx.isSuccess());

      if (tx.isSuccess()) {
        const events = tx.events;
        console.log("Success at createReward:", tx);
        return getCreateRewardsEvents(events);
      } else {
        console.error("Error at createReward:", tx);
        return undefined;
      }
    } catch (e) {
      failedTransactionToast();
      console.log(e);
      return undefined;
    }
  };

  const selectRewards = async (gameId: number, cardsIndex: number[]) => {
    reconnectController();
    try {
      showTransactionToast();
      const { transaction_hash } = await client.game_system.select_reward({
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
        const events = tx.events;
        console.log("Success at selectRewards:", tx);
        return getCreateLevelEvents(events);
      } else {
        console.error("Error at selectRewards:", tx);
        return undefined;
      }
    } catch (e) {
      failedTransactionToast();
      console.log(e);
      return undefined;
    }
  };

  const endTurn = async (gameId: number) => {
    reconnectController();
    try {
      showTransactionToast();
      const { transaction_hash } = await client.game_system.end_turn({
        account,
        game_id: gameId,
      });

      showTransactionToast(transaction_hash);

      const tx = await account.waitForTransaction(transaction_hash, {
        retryInterval: 100,
      });

      updateTransactionToast(transaction_hash, tx.isSuccess());

      if (tx.isSuccess()) {
        console.log("Success at endTurn:", tx);
        return {
          success: true,
          gameOver: !!tx.events.find(
            (event) => event.keys[0] === PLAY_GAME_OVER_EVENT
          ),
          beastAttack: getBeastAttackEvent(tx.events),
        };
      } else {
        console.error("Error at endTurn:", tx);
      }
      return { success: false };
    } catch (e) {
      failedTransactionToast();
      console.log(e);
      return { success: false };
    }
  };

  const discard = async (
    gameId: number,
    cards: number[],
    modifiers: number[]
  ) => {
    reconnectController();
    try {
      showTransactionToast();
      const { transaction_hash } = await client.game_system.discard({
        account,
        game_id: gameId,
        cards_index: cards,
        modifiers_index: modifiers,
      });
      showTransactionToast(transaction_hash);

      const tx = await account.waitForTransaction(transaction_hash, {
        retryInterval: 100,
      });

      updateTransactionToast(transaction_hash, tx.isSuccess());
      if (tx.isSuccess()) {
        const cards = getCardsFromEvents(tx.events);
        const beastAttack = getBeastAttackEvent(tx.events);
        return {
          success: true,
          cards: cards,
          gameOver: !!tx.events.find(
            (event) => event.keys[0] === PLAY_GAME_OVER_EVENT
          ),
          beastAttack,
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
    reconnectController();
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
    reconnectController();
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

  const play = async (gameId: number, cards: number[], modifiers: number[]) => {
    reconnectController();
    try {
      showTransactionToast();
      const { transaction_hash } = await client.game_system.play({
        account,
        game_id: gameId,
        cards_index: cards,
        modifiers_index: modifiers,
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

  const useAdventurer = async (
    gameId: number,
    adventurerId: number
  ): Promise<Card[]> => {
    reconnectController();
    try {
      showTransactionToast();
      const { transaction_hash } = await client.game_system.use_adventurer({
        account,
        game_id: gameId,
        adventurer_id: adventurerId,
      });

      showTransactionToast(transaction_hash);

      const tx = await account.waitForTransaction(transaction_hash, {
        retryInterval: 100,
      });

      updateTransactionToast(transaction_hash, tx.isSuccess());
      if (tx.isSuccess()) {
        console.log("Success at use adventurer:", tx);
        return getResultBlisterPackEvent(tx.events);
      } else {
        console.error("Error at use adventurer:", tx);
      }
      return [];
    } catch (e) {
      failedTransactionToast();
      console.log(e);
      return [];
    }
  };

  const skipAdventurer = async (gameId: number) => {
    reconnectController();
    try {
      showTransactionToast();
      const { transaction_hash } = await client.game_system.skip_adventurer({
        account,
        game_id: gameId,
      });

      showTransactionToast(transaction_hash);

      const tx = await account.waitForTransaction(transaction_hash, {
        retryInterval: 100,
      });

      updateTransactionToast(transaction_hash, tx.isSuccess());
      if (tx.isSuccess()) {
        console.log("Success at skip adventurer:", tx);
      } else {
        console.error("Error at skip adventurer:", tx);
      }
      return tx.isSuccess();
    } catch (e) {
      failedTransactionToast();
      console.log(e);
      return undefined;
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
    useAdventurer,
    skipAdventurer,
    selectAdventurerCs,
    createReward,
    selectRewards,
    endTurn,
    skipFailedLevel,
  };
};
