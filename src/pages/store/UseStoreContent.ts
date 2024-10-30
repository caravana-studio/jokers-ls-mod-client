import { useEffect, useState } from "react";
import { useGameContext } from "../../providers/GameProvider.tsx";
import { useGame } from "../../dojo/queries/useGame.tsx";
import { useShop } from "../../dojo/queries/useShop.tsx";
import { useCurrentSpecialCards } from "../../dojo/queries/useCurrentSpecialCards.tsx";
import { useShopActions } from "../../dojo/useShopActions.tsx";
import { useStore } from "../../providers/StoreProvider.tsx";
import { useShopItems } from "../../dojo/queries/useShopItems.ts";

const useStoreContent = () => {
  const { gameId, setHand, onShopSkip } = useGameContext();
  const game = useGame();
  const cash = game?.cash ?? 0;
  const store = useShop();
  const rerollCost = store?.reroll_cost ?? 0;
  const notEnoughCash = cash < rerollCost;

  const [rerolled, setRerolled] = useState(store?.reroll_executed ?? false);
  const [loading, setLoading] = useState(false);
  const [specialCardsModalOpen, setSpecialCardsModalOpen] = useState(false);
  const specialCards = useCurrentSpecialCards();
  const { skipShop } = useShopActions();

  const [run, setRun] = useState(false);
  const { reroll, locked } = useStore();
  const shopItems = useShopItems();

  useEffect(() => {
    store && setRerolled(store.reroll_executed);
  }, [store?.reroll_executed]);

  return {
    cash,
    rerollCost,
    notEnoughCash,
    rerolled,
    setRerolled,
    loading,
    setLoading,
    specialCardsModalOpen,
    setSpecialCardsModalOpen,
    specialCards,
    skipShop,
    run,
    setRun,
    reroll,
    locked,
    shopItems,
    onShopSkip,
    gameId,
    setHand,
  };
};

export default useStoreContent;
