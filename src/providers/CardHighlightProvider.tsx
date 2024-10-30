import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Card } from "../types/Card";

interface ICardHighlightContext {
  highlightedCard: Card | undefined;
  highlightCard: (card: Card) => void;
  onClose: () => void;
}

const CardHighlightContext = createContext<ICardHighlightContext>({
  highlightedCard: undefined,
  highlightCard: (_) => {},
  onClose: () => {},
});
export const useCardHighlight = () => useContext(CardHighlightContext);

export const CardHighlightProvider = ({ children }: PropsWithChildren) => {
  const [highlightedCard, setHighlightedCard] = useState<Card | undefined>();

  const onClose = () => {
    setHighlightedCard(undefined);
  };

  const highlightCard = (card: Card) => {
    setHighlightedCard(card);
  };

  return (
    <CardHighlightContext.Provider
      value={{
        highlightedCard,
        highlightCard,
        onClose,
      }}
    >
      {children}
    </CardHighlightContext.Provider>
  );
};
