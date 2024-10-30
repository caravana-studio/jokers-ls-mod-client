import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Suits } from "../enums/suits";

interface ICardAnimationsContext {
  animatedCard: IAnimatedCard | undefined;
  setAnimatedCard: (card: IAnimatedCard | undefined) => void;
}

interface IAnimatedCard {
  idx?: number[];
  points?: number;
  multi?: number;
  suit?: Suits;
  special_idx?: number;
  animationIndex: number;
  cash?: number;
}

const CardAnimationsContext = createContext<ICardAnimationsContext>({
  animatedCard: undefined,
  setAnimatedCard: (_) => {},
});
export const useCardAnimations = () => useContext(CardAnimationsContext);

export const CardAnimationsProvider = ({ children }: PropsWithChildren) => {
  const [animatedCard, setAnimatedCard] = useState<IAnimatedCard | undefined>();
  return (
    <CardAnimationsContext.Provider
      value={{
        animatedCard,
        setAnimatedCard,
      }}
    >
      {children}
    </CardAnimationsContext.Provider>
  );
};
