import { useEffect, useMemo, useState } from "react";
import { LOGGED_USER, SORT_BY_SUIT } from "../constants/localStorage";
import { useCurrentHand } from "../dojo/queries/useCurrentHand";
import { useCurrentSpecialCards } from "../dojo/queries/useCurrentSpecialCards";
import { useGame } from "../dojo/queries/useGame";
import { useRound } from "../dojo/queries/useRound";
import { getLSGameId } from "../dojo/utils/getLSGameId";
import { Plays } from "../enums/plays";
import { SortBy } from "../enums/sortBy";
import { useGetPlaysLevelDetail } from "../queries/useGetPlaysLevelDetail";
import { Card } from "../types/Card";
import { RoundRewards } from "../types/RoundRewards";
import { checkHand } from "../utils/checkHand";
import { sortCards } from "../utils/sortCards";
import { getPlayerPokerHands } from "../dojo/getPlayerPokerHands";
import { useDojo } from "../dojo/useDojo";
import { LevelPokerHand } from "../dojo/typescript/models.gen";

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
  const [preSelectedModifiers, setPreSelectedModifiers] = useState<{
    [key: number]: number[];
  }>({});
  const [hand, setHand] = useState<Card[]>([]);
  const [roundRewards, setRoundRewards] = useState<RoundRewards | undefined>(
    undefined
  );
  const [sortBySuit, setSortBySuit] = useState(
    !!localStorage.getItem(SORT_BY_SUIT)
  );
  const [lockedScore, setLockedScore] = useState<number | undefined>(undefined);
  const [lockedCash, setLockedCash] = useState<number | undefined>(undefined);
  const [lockedSpecialCards, setLockedSpecialCards] = useState<Card[]>([]);
  const [isRageRound, setIsRageRound] = useState(false);
  const [rageCards, setRageCards] = useState<Card[]>([]);
  const [plays, setPlays] = useState<LevelPokerHand[]>([]);

  const sortBy: SortBy = useMemo(
    () => (sortBySuit ? SortBy.SUIT : SortBy.RANK),
    [sortBySuit]
  );
  const sortedHand = useMemo(() => sortCards(hand, sortBy), [hand, sortBy]);

  const round = useRound();
  const game = useGame();

  const dojoHand = useCurrentHand(sortBy);
  const {
    setup: {
      client,
      account: { account }
    },
  } = useDojo();

  if (client && account && plays.length == 0) {
    getPlayerPokerHands(client, gameId).then((plays: any)=> {
      if(plays!= undefined)
        setPlays(plays);
    })
  }

  const dojoSpecialCards = useCurrentSpecialCards();

  const specialCards =
    lockedSpecialCards.length > 0 ? lockedSpecialCards : dojoSpecialCards;

  const lsUser = localStorage.getItem(LOGGED_USER);
  const username = lsUser;

  const dojoScore = round?.player_score ?? 0;
  const dojoCash = game?.cash ?? 0;

  const score = lockedScore ?? dojoScore;
  const cash = lockedCash || lockedCash === 0 ? lockedCash : dojoCash;

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

  const setMultiAndPoints = (play: Plays) => {
    const playerPokerHand = plays[play - 1];
    const multi = typeof playerPokerHand.multi === 'number' ? playerPokerHand.multi : 0;
    const points = typeof playerPokerHand.points === 'number' ? playerPokerHand.points : 0;
    setMulti(multi);
    setPoints(points);
  };

  useEffect(() => {
    if (preSelectedCards.length > 0) {
      let play = checkHand(
        hand,
        preSelectedCards,
        specialCards,
        preSelectedModifiers
      );
      setPreSelectedPlay(play);
      if (plays?.length != 0) {
          setMultiAndPoints(play);
      } 
    } else {
      setPreSelectedPlay(Plays.NONE);
      resetMultiPoints();
    }
  }, [preSelectedCards, preSelectedModifiers]);

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
    score,
    apiHand: dojoHand,
    plays,
    sortBy,
    sortedHand,
    username,
    playIsNeon,
    setPlayIsNeon,
    specialCards,
    setLockedSpecialCards,
    setLockedScore,
    isRageRound,
    setIsRageRound,
    cash,
    setLockedCash,
    rageCards,
    setRageCards,
  };
};
