import { useEffect, useMemo, useState } from "react";
import { SORT_BY_SUIT } from "../constants/localStorage";
import { PLAYS_DATA } from "../constants/plays";
import { useBeast, useBeastPlayer } from "../dojo/queries/useBeast";
import { useBlisterPackResult } from "../dojo/queries/useBlisterPackResult";
import { useChallenge, useChallengePlayer } from "../dojo/queries/useChallenge";
import { useCurrentHand } from "../dojo/queries/useCurrentHand";
import { useCurrentSpecialCards } from "../dojo/queries/useCurrentSpecialCards";
import { useGame } from "../dojo/queries/useGame";
import { useGetRewards } from "../dojo/queries/useGetRewards";
import { getLSGameId } from "../dojo/utils/getLSGameId";
import { Plays } from "../enums/plays";
import { SortBy } from "../enums/sortBy";
import { Card } from "../types/Card";
import { RoundRewards } from "../types/RoundRewards";
import { checkHand } from "../utils/checkHand";

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
  const [roundRewards, setRoundRewards] = useState<RoundRewards | undefined>(
    undefined
  );
  const [sortBySuit, setSortBySuit] = useState(
    !!localStorage.getItem(SORT_BY_SUIT)
  );
  const [isRageRound, setIsRageRound] = useState(false);
  const [rageCards, setRageCards] = useState<Card[]>([]);
  const { beast, setBeast, fetchBeast } = useBeast();

  const [beastAttack, setBeastAttack] = useState(0);
  const [obstacletAttack, setObstacleAttack] = useState(0);

  const [gameOver, setGameOver] = useState(false);

  const { energyLeft, setEnergyLeft, fetchEnergyLeft } = useBeastPlayer();

  const { game, fetchGame } = useGame();

  const {
    playsLeft,
    setPlaysLeft,
    discardsLeft,
    setDiscardsLeft,
    fetchPlaysAndDiscards,
  } = useChallengePlayer();

  const consumePlay = () => {
    setPlaysLeft((prev) => prev - 1);
  };
  const consumeDiscard = () => {
    setDiscardsLeft((prev) => {
      return prev - 1;
    });
  };
  const consumeEnergyPlay = () => {
    setEnergyLeft((prev) => prev - 2);
  };
  const consumeEnergyDiscard = () => {
    setEnergyLeft((prev) => prev - 1);
  };

  const refetchPlaysAndDiscards = () => {
    fetchPlaysAndDiscards();
  };
  const refetchEnergy = () => {
    fetchEnergyLeft();
  };

  const { specialCards, setSpecialCards, fetchSpecialCards } =
    useCurrentSpecialCards();

  const resetPlaysAndDiscards = () => {
    const hasIncreasePlaysAndDiscardsSpecialCard = !!specialCards.find(
      (card) => card.card_id === 315
    );
    const maxDiscards = hasIncreasePlaysAndDiscardsSpecialCard ? 6 : 5;
    const maxPlays = hasIncreasePlaysAndDiscardsSpecialCard ? 6 : 5;
    const maxEnergy = hasIncreasePlaysAndDiscardsSpecialCard ? 4 : 3;
    setPlaysLeft(maxPlays);
    setDiscardsLeft(maxDiscards);
    setEnergyLeft(maxEnergy);
  };

  const { blisterPackResult, setBlisterPackResult, fetchBlisterPackResult } =
    useBlisterPackResult();

  const refetchBlisterPackResult = () => {
    fetchBlisterPackResult();
  };

  const sortBy: SortBy = useMemo(
    () => (sortBySuit ? SortBy.SUIT : SortBy.RANK),
    [sortBySuit]
  );

  const { hand, setHand, fetchHand } = useCurrentHand(sortBy);

  useEffect(() => {
    fetchHand();
  }, [sortBy]);

  const refetchCurrentHand = () => {
    setPreSelectedCards([]);
    setPreSelectedModifiers([]);
    setPlayAnimation(false);
    setDiscardAnimation(false);
    fetchHand();
  };

  const refetchSpecialCards = () => {
    fetchSpecialCards();
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

  const resetMultiPoints = () => {
    setPoints(0);
    setMulti(0);
  };

  //effects

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

  const {
    challenges: obstacles,
    setChallenges: setObstacles,
    fetchChallenges,
  } = useChallenge();

  const refetchObstacles = () => {
    fetchChallenges();
  };

  const {
    rewardIds: rewardsIds,
    setRewardIds: setRewardsIds,
    fetchRewardIds,
  } = useGetRewards();

  const refetchRewardsId = () => {
    fetchRewardIds();
  };

  const refetchBeast = () => {
    fetchBeast();
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
    roundRewards,
    setRoundRewards,
    sortBySuit,
    setSortBySuit,
    sortBy,
    hand,
    setHand,
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
    fetchBeast,
    obstacles,
    setObstacles,
    refetchObstacles,
    refetchBeast,
    blisterPackResult,
    setBlisterPackResult,
    refetchBlisterPackResult,
    resetSpecialCards,
    playsLeft,
    consumePlay,
    discardsLeft,
    energyLeft,
    consumeDiscard,
    consumeEnergyPlay,
    consumeEnergyDiscard,
    resetPlaysAndDiscards,
    refetchPlaysAndDiscards,
    refetchEnergy,
    beastAttack,
    setBeastAttack,
    gameOver,
    setGameOver,
    obstacletAttack,
    setObstacleAttack,
    rewardsIds,
    setRewardsIds,
    refetchRewardsId,
    refetchCurrentHand,
    game,
    fetchGame,
  };
};
