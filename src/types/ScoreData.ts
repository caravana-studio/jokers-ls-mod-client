import { Suits } from "../enums/suits";
import { Card } from "./Card";

export interface PlayEvents {
  play: MultiPoints;
  cardScore: CardScore[];
  gameOver: boolean;
  levelPassed?: LevelPassedEvent;
  detailEarned?: DetailEarned;
  specialCards?: CardScore[];
  levelEvent?: LevelEvent;
  globalEvents?: LevelEvent[];
  specialSuitEvents?: SpecialSuitEvent[];
  neonPlayEvent?: NeonPlayEvent;
  modifierSuitEvents?: ModifierSuitEvent[];
  cards: Card[];
  score: number;
  cashEvents?: CashEvent[];
}

export interface LevelPassedEvent {
  level: number;
  score: number;
}

export interface LevelEvent {
  special_idx: number;
  multi: number;
  points: number;
}

export interface MultiPoints {
  multi?: number;
  points?: number;
}

export interface CardScore extends MultiPoints {
  idx: number;
  special_idx?: number;
}

export interface NeonPlayEvent extends MultiPoints {
  neon_cards_idx: number[];
}

export interface SpecialSuitEvent {
  suit: Suits;
  special_idx?: number;
  idx: number[];
}

export interface ModifierSuitEvent {
  suit: Suits;
  idx: number;
}

export interface DetailEarned {
  round_defeat: number;
  level_bonus: number;
  hands_left: number;
  hands_left_cash: number;
  discard_left: number;
  discard_left_cash: number;
  rage_card_defeated: number;
  rage_card_defeated_cash: number;
  total: number;
}

export interface CashEvent {
  cash: number;
  idx: number;
  special_idx: number;
}
