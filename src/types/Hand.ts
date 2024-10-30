import { Plays } from '../enums/plays.ts'

export interface Hand {
  id: string;
  value: Plays;
  name: string;
  description: string;
  order: number;
}
