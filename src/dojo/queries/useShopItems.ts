import { Component, Entity, getComponentValue } from "@dojoengine/recs";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useMemo } from "react";
import { CardTypes, NumericCardTypes } from "../../enums/cardTypes";
import { Card } from "../../types/Card";
import { PokerHandItem } from "../../types/PokerHandItem";
import { BlisterPackItem } from "../typescript/models.gen";
import { useDojo } from "../useDojo";
import { useGame } from "./useGame";
import { useShop } from "./useShop";

export interface ShopItems {
  specialCards: Card[];
  modifierCards: Card[];
  commonCards: Card[];
  pokerHandItems: PokerHandItem[];
  packs: BlisterPackItem[];
}

const sortByCardId = (a: Card, b: Card) => {
  return (a.card_id ?? 0) - (b.card_id ?? 0);
};
const sortByPackId = (a: BlisterPackItem, b: BlisterPackItem) => {
  return (Number(a.blister_pack_id) ?? 0) - (Number(b.blister_pack_id) ?? 0);
};
const sortByPokerHand = (a: PokerHandItem, b: PokerHandItem) => {
  return a.poker_hand.localeCompare(b.poker_hand);
};

const getBlisterPack = (gameId: number, index: number, entity: Component) => {
  const entityId = getEntityIdFromKeys([
    BigInt(gameId),
    BigInt(index),
  ]) as Entity;
  const item = getComponentValue(entity, entityId) as any;
  return item;
};

const getCard = (
  gameId: number,
  index: number,
  type: NumericCardTypes,
  entity: Component
) => {
  const entityId = getEntityIdFromKeys([
    BigInt(gameId),
    BigInt(index),
    BigInt(type),
  ]) as Entity;
  const card = getComponentValue(entity, entityId);
  return {
    ...card,
    price: card?.cost,
    isModifier: card?.item_type === CardTypes.MODIFIER,
    isSpecial: card?.item_type === CardTypes.SPECIAL,
    id: card?.idx.toString() ?? "",
    idx: card?.idx ?? 0,
    purchased: card?.purchased,
    img: `${card?.card_id}.png`,
  };
};

const getPokerHandItem = (gameId: number, index: number, entity: Component) => {
  const entityId = getEntityIdFromKeys([
    BigInt(gameId),
    BigInt(index),
  ]) as Entity;
  const item = getComponentValue(entity, entityId) as any;
  return {
    game_id: item?.game_id ?? 0,
    idx: item?.idx ?? 0,
    poker_hand: item?.poker_hand ?? "",
    level: item?.level ?? 0,
    cost: item?.cost ?? 200,
    purchased: item?.purchased ?? false,
  };
};

export const useShopItems = () => {
  const {
    setup: {
      clientComponents: { CardItem, PokerHandItem, BlisterPackItem },
    },
  } = useDojo();

  const game = useGame();
  const shop = useShop();
  const gameId = game?.id ?? 0;

  const commonCards: Card[] = useMemo(() => {
    const commonCardsIds = Array.from(
      { length: shop?.len_item_common_cards ?? 0 },
      (_, index) => index
    );
    return commonCardsIds.map((index) =>
      getCard(gameId, index, NumericCardTypes.COMMON, CardItem)
    );
  }, [shop?.len_item_common_cards, game?.level, shop?.reroll_executed]);

  const modifierCards: Card[] = useMemo(() => {
    const modifierCardsIds = Array.from(
      { length: shop?.len_item_modifier_cards ?? 0 },
      (_, index) => index
    );
    return modifierCardsIds.map((index) =>
      getCard(gameId, index, NumericCardTypes.MODIFIER, CardItem)
    );
  }, [shop?.len_item_modifier_cards, game?.level, shop?.reroll_executed]);

  const specialCards: Card[] = useMemo(() => {
    const specialCardsIds = Array.from(
      { length: shop?.len_item_special_cards ?? 0 },
      (_, index) => index
    );
    return specialCardsIds.map((index) =>
      getCard(gameId, index, NumericCardTypes.SPECIAL, CardItem)
    );
  }, [shop?.len_item_special_cards, game?.level, shop?.reroll_executed]);

  const pokerHandItems: PokerHandItem[] = useMemo(() => {
    const pokerHandIds = Array.from(
      { length: shop?.len_item_poker_hands ?? 0 },
      (_, index) => index
    );
    return pokerHandIds.map((index) =>
      getPokerHandItem(gameId, index, PokerHandItem)
    );
  }, [shop?.len_item_poker_hands, game?.level, shop?.reroll_executed]);

  const blisterPackItems: BlisterPackItem[] = useMemo(() => {
    const blisterPackIds = Array.from(
      { length: shop?.len_item_blister_pack ?? 0 },
      (_, index) => index
    );
    return blisterPackIds.map((index) =>
      getBlisterPack(gameId, index, BlisterPackItem)
    );
  }, [shop?.len_item_blister_pack, game?.level, shop?.reroll_executed]);


  const shopItems: ShopItems = {
    specialCards: specialCards.sort(sortByCardId),
    modifierCards: modifierCards.sort(sortByCardId),
    commonCards: commonCards.sort(sortByCardId),
    pokerHandItems: pokerHandItems.sort(sortByPokerHand),
    packs: blisterPackItems.sort(sortByPackId),
  };

  return shopItems;
};
