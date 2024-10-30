import { useEffect, useMemo, useState } from "react";
import { useGame } from "../dojo/queries/useGame";
import { useRound } from "../dojo/queries/useRound";

export const useDiscards = () => {
  const round = useRound();
  const game = useGame()
  const discardsLeft = round?.discard ?? 0;
  const [optimisticDiscards, setOptimisticDiscards] = useState<
    number | undefined
  >(undefined);

  const discards = useMemo(() => {
    return optimisticDiscards ?? discardsLeft;
  }, [optimisticDiscards, discardsLeft]);

  // reset optimistic discards when level changes
  useEffect(() => {
    setOptimisticDiscards(undefined)
  }, [game?.level, game?.id])

  const discard = () => {
    setOptimisticDiscards(discards - 1);
  };

  const rollbackDiscard = () => {
    setOptimisticDiscards(discards + 1);
  };

  return {
    discards,
    discard,
    rollbackDiscard,
  };
};
