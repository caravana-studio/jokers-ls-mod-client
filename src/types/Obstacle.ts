
export interface Obstacle {
  description: string;
}

export type ObstacleMap = {
  [key: number]: Obstacle;
};
