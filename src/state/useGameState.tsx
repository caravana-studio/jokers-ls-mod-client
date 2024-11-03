import { useEffect, useMemo, useState } from "react";
import { LOGGED_USER, SORT_BY_SUIT } from "../constants/localStorage";
import { PLAYS_DATA } from "../constants/plays";
import { useBeast } from "../dojo/queries/useBeast";
import { useBlisterPackResult } from "../dojo/queries/useBlisterPackResult";
import { useChallenge } from "../dojo/queries/useChallenge";
import { useCurrentHand } from "../dojo/queries/useCurrentHand";
import { useCurrentSpecialCards } from "../dojo/queries/useCurrentSpecialCards";
import { useGame } from "../dojo/queries/useGame";
import { Beast } from "../dojo/typescript/models.gen";
import { getLSGameId } from "../dojo/utils/getLSGameId";
import { Plays } from "../enums/plays";
import { SortBy } from "../enums/sortBy";
import { Card } from "../types/Card";
import { RoundRewards } from "../types/RoundRewards";
import { checkHand } from "../utils/checkHand";
import { sortCards } from "../utils/sortCards";

export const useGameState = () => {
  const [gameId, setGameId] = useState<number>(getLSGameId());
  const [preSelectedPlay, setPreSelectedPlay] = useState<Plays>(Plays.NONE);
  const [playIsNeon, setPlayIsNeon] = useState(false);
  const [points, setPoints] = useState(0);
  const [multi, setMulti] = useState(0);
  const [gameLoading, setGameLoading] = useState(true);
  const [preSelectionLocked, setPreSelectionLocked] = useState(false);
  const [discardAnimation, setDiscardAnimation] = useState(false);
  const [playAnimation, setPlayAnimation] = useState(false);
  const [error, setError] = useState(false);
  const [preSelectedCards, setPreSelectedCards] = useState<number[]>([]);
  const [preSelectedModifiers, setPreSelectedModifiers] = useState<number[]>(
    []
  );
  const [hand, setHand] = useState<Card[]>([]);
  const [roundRewards, setRoundRewards] = useState<RoundRewards | undefined>(
    undefined
  );
  const [sortBySuit, setSortBySuit] = useState(
    !!localStorage.getItem(SORT_BY_SUIT)
  );
  const [isRageRound, setIsRageRound] = useState(false);
  const [rageCards, setRageCards] = useState<Card[]>([]);
  const [beast, setBeast] = useState<Beast | undefined>(undefined);
  const [obstacles, setObstacles] = useState<
    { id: number; completed: boolean }[]
  >([]);

  const [specialCards, setSpecialCards] = useState<Card[]>([]);

  const [blisterPackResult, setBlisterPackResult] = useState<Card[]>([]);

  const dojoBlisterPackResult = useBlisterPackResult();

  const refetchBlisterPackResult = () => {
    setBlisterPackResult(dojoBlisterPackResult.cards);
  };

  const sortBy: SortBy = useMemo(
    () => (sortBySuit ? SortBy.SUIT : SortBy.RANK),
    [sortBySuit]
  );
  const sortedHand = useMemo(() => sortCards(hand, sortBy), [hand, sortBy]);

  const game = useGame();

  const dojoHand = useCurrentHand(sortBy);

  const dojoSpecialCards = useCurrentSpecialCards();

  const refetchSpecialCards = () => {
    setSpecialCards(dojoSpecialCards);
  };

  const addSpecialCard = (card: Card) => {
    setSpecialCards((prev) => [...prev, { ...card, idx: prev.length }]);
  };

  const removeSpecialCard = (cardId: number) => {
    setSpecialCards((prev) => {
      return prev
        .filter((card) => card.card_id !== cardId)
        .map((card, index) => {
          return { ...card, idx: index };
        });
    });
  };

  const resetSpecialCards = () => {
    setSpecialCards([]);
  };

  const beastFetchData = useBeast();

  const lsUser = localStorage.getItem(LOGGED_USER);
  const username = lsUser;

  const resetMultiPoints = () => {
    setPoints(0);
    setMulti(0);
  };

  //effects

  useEffect(() => {
    if (dojoHand?.length > 0 && hand.length === 0) {
      setHand(dojoHand);
    }
  }, [dojoHand]);

  useEffect(() => {
    if (
      beastFetchData &&
      beastFetchData?.current_health != beast?.current_health
    )
      setBeast(beastFetchData as unknown as Beast);
  }, [beastFetchData]);

  const setMultiAndPoints = (play: Plays) => {
    const playerPokerHand = PLAYS_DATA[play - 1];
    const multi =
      typeof playerPokerHand.multi === "number" ? playerPokerHand.multi : 0;
    const points =
      typeof playerPokerHand.points === "number" ? playerPokerHand.points : 0;
    setMulti(multi);
    setPoints(points);
  };

  useEffect(() => {
    if (preSelectedCards.length > 0) {
      let play = checkHand(hand, preSelectedCards, specialCards, []);
      setPreSelectedPlay(play);
      setMultiAndPoints(play);
    } else {
      setPreSelectedPlay(Plays.NONE);
      resetMultiPoints();
    }
  }, [preSelectedCards]);

  const challenges = useChallenge();

  const refetchObstacles = () => {
    setObstacles(challenges);
  };

  const refetchBeast = () => {
    setBeast(beastFetchData as unknown as Beast);
  };

  return {
    gameId,
    setGameId,
    preSelectedPlay,
    setPreSelectedPlay,
    points,
    setPoints,
    multi,
    setMulti,
    gameLoading,
    setGameLoading,
    preSelectionLocked,
    setPreSelectionLocked,
    discardAnimation,
    setDiscardAnimation,
    playAnimation,
    setPlayAnimation,
    error,
    setError,
    preSelectedCards,
    setPreSelectedCards,
    preSelectedModifiers,
    setPreSelectedModifiers,
    hand,
    setHand,
    roundRewards,
    setRoundRewards,
    sortBySuit,
    setSortBySuit,
    apiHand: dojoHand,
    sortBy,
    sortedHand,
    username,
    playIsNeon,
    setPlayIsNeon,
    specialCards,
    refetchSpecialCards,
    addSpecialCard,
    removeSpecialCard,
    isRageRound,
    setIsRageRound,
    rageCards,
    setRageCards,
    beast,
    setBeast,
    obstacles,
    setObstacles,
    refetchObstacles,
    refetchBeast,
    blisterPackResult,
    setBlisterPackResult,
    refetchBlisterPackResult,
    resetSpecialCards,
  };
};
