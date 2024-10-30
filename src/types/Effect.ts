import { Suits } from "../enums/suits";

export interface Effect {
  id: number;
  points?: number;
  multi_add?: number;
  multi_multi?: number;
  suit?: Suits;
}
