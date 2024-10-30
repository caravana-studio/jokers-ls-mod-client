import { getCardsFromEvents } from "../utils/getCardsFromEvents";
import { failedTransactionToast, showTransactionToast, updateTransactionToast } from "../utils/transactionNotifications";
import { useDojo } from "./useDojo";

  
export const useShopActions = () => {
    const {
        setup: {
          client,
        },
        account: { account },
      } = useDojo(); 

      const skipShop = async (gameId: number) => {
        try {
          showTransactionToast();
          const { transaction_hash } = await client.shop_system.skipShop({
            account,
            gameId,
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

      const buyCard = async (
        gameId: number,
        card_idx: number,
        card_type: number
      ) => {
        try {
          showTransactionToast();
          const { transaction_hash } = await client.shop_system.buyCard({
            account,
            gameId,
            card_idx,
            card_type,
          });
          showTransactionToast(transaction_hash);
    
          const tx = await account.waitForTransaction(transaction_hash, {
            retryInterval: 100,
          });
    
          return updateTransactionToast(transaction_hash, tx.isSuccess());
        } catch (e) {
          console.log(e);
          return failedTransactionToast();
        }
      };      
      
      const buySpecialSlot = async (
        gameId: number,
      ) => {
        try {
          showTransactionToast();
          const { transaction_hash } = await client.shop_system.buySpecialSlot({
            account,
            gameId,
          });
          showTransactionToast(transaction_hash);
    
          const tx = await account.waitForTransaction(transaction_hash, {
            retryInterval: 100,
          });
    
          return updateTransactionToast(transaction_hash, tx.isSuccess());
        } catch (e) {
          console.log(e);
          return failedTransactionToast();
        }
      };

      const buyPack = async (
        gameId: number,
        pack_id: number
      ) => {
        try {
          showTransactionToast();
          const { transaction_hash } = await client.shop_system.buyPack({
            account,
            gameId,
            pack_id,
          });
          showTransactionToast(transaction_hash);
    
          const tx = await account.waitForTransaction(transaction_hash, {
            retryInterval: 100,
          });
    
          return updateTransactionToast(transaction_hash, tx.isSuccess());
        } catch (e) {
          console.log(e);
          return failedTransactionToast();
        }
      };

      const selectCardsFromPack = async (
        gameId: number,
        cardIndexes: number[]
      ) => {
        console.log("selectCardsFromPack", cardIndexes);
        try {
          showTransactionToast();
          const { transaction_hash } = await client.shop_system.selectCardsFromPack({
            account,
            gameId,
            cardIndexes,
          });
          showTransactionToast(transaction_hash);
    
          const tx = await account.waitForTransaction(transaction_hash, {
            retryInterval: 100,
          });
    
          return updateTransactionToast(transaction_hash, tx.isSuccess());
        } catch (e) {
          console.log(e);
          return failedTransactionToast();
        }
      };

      const levelUpPokerHand = async (
        gameId: number,
        item_id: number
      ) => {
        try {
          showTransactionToast();
          const { transaction_hash } = await client.shop_system.levelUpPokerHand({
            account,
            gameId,
            item_id,
          });
          showTransactionToast(transaction_hash);
    
          const tx = await account.waitForTransaction(transaction_hash, {
            retryInterval: 100,
          });
    
          return updateTransactionToast(transaction_hash, tx.isSuccess());
        } catch (e) {
          console.log(e);
          return failedTransactionToast();
        }
      };

      const storeReroll = async ( gameId: number) => {
        try {
          showTransactionToast();
          const { transaction_hash } = await client.shop_system.storeReroll({
            account,
            gameId,
          });
          showTransactionToast(transaction_hash);
          const tx = await account.waitForTransaction(transaction_hash, {
            retryInterval: 100,
          });
    
          return updateTransactionToast(transaction_hash, tx.isSuccess());
        } catch (e) {
          console.log(e);
          return failedTransactionToast();
        }
      };

      return {
        skipShop,
        buyCard,
        buyPack,
        selectCardsFromPack,
        levelUpPokerHand,
        storeReroll,
        buySpecialSlot
      };
    };
      
