import { CardTypes } from "../enums/cardTypes";

export interface ShopItem  {
    cost: number;
    card_id: number;
    idx: number;
    item_type: CardTypes;
    purchased: boolean;
    temporary: boolean;
}