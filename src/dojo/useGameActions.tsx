import { AccountInterface, shortString } from "starknet";
import { CHECK_HAND_EVENT, GAME_ID_EVENT, GAME_OVER_EVENT } from "../constants/dojoEventKeys";
import { Plays } from "../enums/plays";
import { getCardsFromEvents } from "../utils/getCardsFromEvents";
import { getNumberValueFromEvents } from "../utils/getNumberValueFromEvent";
import { getPlayEvents } from "../utils/playEvents/getPlayEvents";
import { failedTransactionToast, showTransactionToast, updateTransactionToast } from "../utils/transactionNotifications";
import { useDojo } from "./useDojo";
import { getModifiersForContract } from "./utils/getModifiersForContract";

const createGameEmptyResponse = {
    gameId: 0,
    hand: [],
  };
  
export const useGameActions = () => {
    const {
        setup: {
          client,
        },
        account: { account },
      } = useDojo(); 

      const createGame = async (username: string) => {
        try {
          showTransactionToast();
          const { transaction_hash } = await client.game_system.createGame({
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

      const checkHand = async (
        gameId: number,
        cards: number[],
        modifiers: { [key: number]: number[] }
      ) => {
        try {
          const { modifiers1 } = getModifiersForContract(
            cards,
            modifiers
          );
          const { transaction_hash } = await client.game_system.checkHand({
            account,
            gameId,
            cards,
            modifiers1
          });
    
          const tx = await account.waitForTransaction(transaction_hash, {
            retryInterval: 100,
          });
    
          if (tx.isSuccess()) {
            const events = tx.events;
            const play = getNumberValueFromEvents(events, CHECK_HAND_EVENT, 0);
            const multi = getNumberValueFromEvents(events, CHECK_HAND_EVENT, 1);
            const points = getNumberValueFromEvents(events, CHECK_HAND_EVENT, 2);
            return {
              play,
              multi,
              points,
            };
          }
    
          return {
            play: Plays.NONE,
            multi: 0,
            points: 0,
          };
        } catch (e) {
          console.log(e);
        }
      };

      const discard = async (
        gameId: number,
        cards: number[],
        modifiers: { [key: number]: number[] }
      ) => {
        const { modifiers1 } = getModifiersForContract(
          cards,
          modifiers
        );
        try {
          showTransactionToast();
          const { transaction_hash } = await client.game_system.discard({
            account,
            gameId,
            cards,
            modifiers1
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
              cards:cards,
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

      const discardEffectCard = async (
        gameId: number,
        card: number
      ) => {
        try {
          showTransactionToast();
          const { transaction_hash } = await client.game_system.discardEffectCard({
            account,
            gameId,
            card,
          });
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

      const discardSpecialCard = async (
        account: AccountInterface,
        gameId: number,
        card: number
      ) => {
        try {
          const { transaction_hash } = await client.game_system.discardSpecialCard({
            account,
            gameId,
            card,
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
        const { modifiers1 } = getModifiersForContract(
          cards,
          modifiers
        );
        try {
          showTransactionToast();
          const { transaction_hash } = await client.game_system.play({
            account,
            gameId,
            cards,
            modifiers1
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
        checkHand,
        discard,
        discardEffectCard,
        discardSpecialCard,
        play,
      };
    };
      
