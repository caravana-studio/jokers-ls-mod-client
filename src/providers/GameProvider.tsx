import CartridgeConnector from "@cartridge/connector";
import { useAccount, useConnect } from "@starknet-react/core";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import cartridgeConnector from "../cartridgeConnector.tsx";
import { GAME_ID, SORT_BY_SUIT } from "../constants/localStorage";
import {
  discardSfx,
  multiSfx,
  pointsSfx,
  preselectedCardSfx,
} from "../constants/sfx.ts";
import { useGame } from "../dojo/queries/useGame.tsx";
import { Beast } from "../dojo/typescript/models.gen.ts";
import { useDojo } from "../dojo/useDojo.tsx";
import { useGameActions } from "../dojo/useGameActions.tsx";
import { gameExists } from "../dojo/utils/getGame.tsx";
import { getLSGameId } from "../dojo/utils/getLSGameId.tsx";
import { Plays } from "../enums/plays";
import { SortBy } from "../enums/sortBy.ts";
import { useAudio } from "../hooks/useAudio.tsx";
import { useCardAnimations } from "../providers/CardAnimationsProvider";
import { useDiscards } from "../state/useDiscards.tsx";
import { useGameState } from "../state/useGameState.tsx";
import { Card } from "../types/Card";
import { RoundRewards } from "../types/RoundRewards.ts";
import { PlayEvents } from "../types/ScoreData";
import { changeCardSuit } from "../utils/changeCardSuit";
import { GameState } from "../dojo/typescript/models.gen";
interface IGameContext {
  gameId: number;
  preSelectedPlay: Plays;
  points: number;
  multi: number;
  executeCreateGame: () => void;
  gameLoading: boolean;
  preSelectedCards: number[];
  setPreSelectedCards: (cards: number[]) => void;
  play: () => void;
  hand: Card[];
  setHand: (cards: Card[]) => void;
  togglePreselected: (cardIndex: number) => void;
  discardAnimation: boolean;
  playAnimation: boolean;
  discard: () => void;
  discardEffectCard: (
    cardIdx: number
  ) => Promise<{ success: boolean; cards: Card[] }>;
  error: boolean;
  clearPreSelection: () => void;
  preSelectedModifiers: number[];
  roundRewards: RoundRewards | undefined;
  sortBy: SortBy;
  toggleSortBy: () => void;
  onShopSkip: () => void;
  discardSpecialCard: (cardIdx: number) => Promise<boolean>;
  checkOrCreateGame: () => void;
  restartGame: () => void;
  preSelectionLocked: boolean;
  lockRedirection: boolean;
  specialCards: Card[];
  refetchSpecialCards: () => void;
  addSpecialCard: (card: Card) => void;
  removeSpecialCard: (cardId: number) => void;
  playIsNeon: boolean;
  isRageRound: boolean;
  setIsRageRound: (isRageRound: boolean) => void;
  rageCards: Card[];
  setRageCards: (rageCards: Card[]) => void;
  discards: number;
  preSelectCard: (cardIndex: number) => void;
  unPreSelectCard: (cardIndex: number) => void;
  selectDeckType: (deckType: number) => Promise<Card[]>;
  selectSpecialCards: (cardIndex: number[]) => Promise<Card[]>;
  selectModifierCards: (cardIndex: number[]) => Promise<boolean>;
  selectAdventurerCards: (cardIndex: number[]) => Promise<boolean>;
  redirectBasedOnGameState: () => void;
  createNewLevel: () => Promise<any>;
  obstacles: { id: number; completed: boolean }[];
  refetchObstacles: () => void;
  beast: Beast | undefined;
  refetchBeast: () => void;
  attackAnimation: number;
  setAttackAnimation: (point: number) => void;
  togglePreselectedModifier: (cardIndex: number) => void;
  createNewReward: (rewardId: number, mode: string) => Promise<any>;
  selectNewRewards: (cardIndex: number[]) => Promise<any>;
  blisterPackResult: Card[];
  setBlisterPackResult: (cards: Card[]) => void;
  refetchBlisterPackResult: () => void;
  executeEndTurn: () => Promise<any>;
  playsLeft: number;
  consumePlay: () => void;
  discardsLeft: number;
  energyLeft: number;
  consumeDiscard: () => void;
  consumeEnergyPlay: () => void;
  consumeEnergyDiscard: () => void;
  refetchPlaysAndDiscards: () => void;
  refetchEnergy: () => void;
  beastAttack: number;
  setBeastAttack: (beastAttack: number) => void;
  gameOver: boolean;
  setGameOver: (gameOver: boolean) => void;
  skipFailedObstacle: () => Promise<any>;
  rewardsIds: {
    id: number;
  }[];
  refetchRewardsId: () => void;
  levelScore: number;
}

const GameContext = createContext<IGameContext>({
  gameId: getLSGameId(),
  preSelectedPlay: Plays.NONE,
  points: 0,
  multi: 0,
  executeCreateGame: () => {},
  gameLoading: false,
  preSelectedCards: [],
  setPreSelectedCards: (_) => {},
  play: () => {},
  hand: [],
  setHand: (_) => {},
  togglePreselected: (_) => {},
  discardAnimation: false,
  playAnimation: false,
  discard: () => {},
  discardEffectCard: () =>
    new Promise((resolve) => resolve({ success: false, cards: [] })),
  error: false,
  clearPreSelection: () => {},
  preSelectedModifiers: [],
  roundRewards: undefined,
  sortBy: SortBy.RANK,
  toggleSortBy: () => {},
  onShopSkip: () => {},
  discardSpecialCard: () => new Promise((resolve) => resolve(false)),
  checkOrCreateGame: () => {},
  restartGame: () => {},
  preSelectionLocked: false,
  lockRedirection: false,
  specialCards: [],
  refetchSpecialCards: () => {},
  addSpecialCard: (_) => {},
  removeSpecialCard: (_) => {},
  playIsNeon: false,
  isRageRound: false,
  setIsRageRound: (_) => {},
  rageCards: [],
  setRageCards: (_) => {},
  discards: 0,
  preSelectCard: (_) => {},
  unPreSelectCard: (_) => {},
  selectDeckType: (_) => new Promise((resolve) => resolve([])),
  selectSpecialCards: (_) => new Promise((resolve) => resolve([])),
  selectModifierCards: (_) => new Promise((resolve) => resolve(false)),
  selectAdventurerCards: (_) => new Promise((resolve) => resolve(false)),
  redirectBasedOnGameState: () => {},
  createNewLevel: () => new Promise((resolve) => resolve(undefined)),
  obstacles: [],
  refetchObstacles: () => {},
  beast: undefined,
  refetchBeast: () => {},
  attackAnimation: 0,
  setAttackAnimation: () => {},
  togglePreselectedModifier: (_) => {},
  createNewReward: (rewardId: number, mode: string) =>
    new Promise((resolve) => resolve(undefined)),
  selectNewRewards: (_) => new Promise((resolve) => resolve(undefined)),
  blisterPackResult: [],
  setBlisterPackResult: () => {},
  refetchBlisterPackResult: () => {},
  executeEndTurn: () => new Promise((resolve) => resolve(undefined)),
  playsLeft: -1,
  consumePlay: () => {},
  discardsLeft: -1,
  energyLeft: -1,
  consumeDiscard: () => {},
  consumeEnergyPlay: () => {},
  consumeEnergyDiscard: () => {},
  refetchPlaysAndDiscards: () => {},
  refetchEnergy: () => {},
  beastAttack: 0,
  setBeastAttack: () => {},
  gameOver: false,
  setGameOver: () => {},
  skipFailedObstacle: () => new Promise((resolve) => resolve(undefined)),
  rewardsIds: [],
  refetchRewardsId: () => {},
  levelScore: 0,
});
export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({ children }: PropsWithChildren) => {
  const state = useGameState();
  const [lockRedirection, setLockRedirection] = useState(false);

  const [levelScore, setLevelScore] = useState(0);

  const { account: controllerAccount } = useAccount();
  const { connect, connectors } = useConnect();

  const reconnectController = () => {
    if (!controllerAccount) {
      connect({ connector: connectors[0] });
      return;
    }
  };

  useEffect(() => {
    reconnectController();
  }, []);

  const navigate = useNavigate();
  const {
    setup: {
      clientComponents: { Game },
    },
    syncCall,
  } = useDojo();

  const {
    createGame,
    play,
    discard,
    discardEffectCard,
    discardSpecialCard,
    selectDeck,
    selectSpecials,
    selectModifiers,
    createLevel,
    selectAdventurerCs,
    createReward,
    selectRewards,
    endTurn,
    skipFailedLevel,
  } = useGameActions();

  const { discards, discard: stateDiscard, rollbackDiscard } = useDiscards();

  const game = useGame();
  const { play: preselectCardSound } = useAudio(preselectedCardSfx);
  const { play: discardSound } = useAudio(discardSfx, 4);
  const { play: pointsSound } = useAudio(pointsSfx);
  const { play: multiSound } = useAudio(multiSfx);

  const minimumDuration =
    !game?.level || game?.level.valueOf() <= 15
      ? 400
      : game?.level.valueOf() > 20
        ? 300
        : 350;

  const playAnimationDuration = Math.max(
    700 - ((game?.level.valueOf() ?? 1) - 1) * 50,
    minimumDuration
  );

  const { setAnimatedCard } = useCardAnimations();

  const [attackAnimation, setAttackAnimation] = useState(0);

  const {
    gameId,
    setGameId,
    preSelectedCards,
    setPreSelectedCards,
    hand,
    setHand,
    points,
    setPoints,
    multi,
    setMulti,
    setRoundRewards,
    preSelectedModifiers,
    setPreSelectedModifiers,
    preSelectionLocked,
    setPreSelectionLocked,
    setGameLoading,
    setDiscardAnimation,
    setPlayAnimation,
    setError,
    sortBySuit,
    setSortBySuit,
    username,
    setPlayIsNeon,
    specialCards,
    setIsRageRound,
    beast,
    setBeast,
    obstacles,
    setObstacles,
    refetchObstacles,
    refetchBeast,
    setBlisterPackResult,
    resetSpecialCards,
    consumePlay,
    consumeDiscard,
    consumeEnergyPlay,
    consumeEnergyDiscard,
    resetPlaysAndDiscards,
    setBeastAttack,
    setGameOver,
    setObstacleAttack,
    rewardsIds,
    setRewardsIds,
    refetchRewardsId,
    refetchPlaysAndDiscards,
  } = state;

  const resetLevel = () => {
    setRoundRewards(undefined);
    setPreSelectionLocked(false);
    setIsRageRound(false);
    resetSpecialCards();
    resetPlaysAndDiscards();
  };

  const toggleSortBy = () => {
    if (sortBySuit) {
      localStorage.removeItem(SORT_BY_SUIT);
      setSortBySuit(false);
    } else {
      setSortBySuit(true);
      localStorage.setItem(SORT_BY_SUIT, "true");
    }
  };

  const selectDeckType = async (deckType: number) => {
    const selectDeckPromise = selectDeck(gameId, deckType);
    selectDeckPromise.then((response) => {
      if (response.length > 0) {
        setLockRedirection(true);
        setBlisterPackResult(response);
        navigate("/choose-specials");
      }
    });
    return selectDeckPromise;
  };

  const selectSpecialCards = async (cardIndex: number[]) => {
    const specialPromise = selectSpecials(gameId, cardIndex);

    specialPromise.then((response) => {
      if (response.length > 0) {
        setLockRedirection(true);
        setBlisterPackResult(response);
        navigate("/choose-modifiers");
      }
    });

    return specialPromise;
  };

  const selectAdventurerCards = async (cardIndex: number[]) => {
    const promise = selectAdventurerCs(gameId, cardIndex);

    promise.then((response) => {
      if (response) {
        setLockRedirection(true);
        createNewLevel();
      }
    });

    return promise;
  };

  const selectModifierCards = async (cardIndex: number[]) => {
    const modifiersPromise = selectModifiers(gameId, cardIndex);
    modifiersPromise.then(async (response) => {
      if (response) {
        setLockRedirection(true);
        navigate("/adventurers");
      }
    });

    return modifiersPromise;
  };

  const executeEndTurn = async () => {
    const endTurnPromise = endTurn(gameId).then((response) => {
      if (response?.success) {
        response.beastAttack && setBeastAttack(response.beastAttack);
        if (response.gameOver) {
          setGameOver(true);
          setTimeout(() => {
            navigate(`/gameover/${gameId}`);
          }, 1000);
        } else {
          resetPlaysAndDiscards();
        }
      }
    });
    return endTurnPromise;
  };

  const createNewLevel = async () => {
    const nextLevelPromise = createLevel(gameId);
    nextLevelPromise.then((response) => {
      console.log("createLevelEvents", response);
      response?.cards && replaceCards(response.cards);
      resetPlaysAndDiscards();
      if (response?.isBeast && response?.beast) {
        setBeast({ ...response.beast, game_id: gameId });
        navigate("/game/beast");
      } else if (response?.isObstacle && response?.obstacles) {
        setObstacles(response?.obstacles);
        navigate("/game/obstacle");
      }
    });
    return nextLevelPromise;
  };

  const skipFailedObstacle = async () => {
    const nextLevelPromise = skipFailedLevel(gameId);
    nextLevelPromise.then((response) => {
      response?.cards && replaceCards(response.cards);
      resetPlaysAndDiscards();
      if (response?.isBeast && response?.beast) {
        setBeast({ ...response.beast, game_id: gameId });
        navigate("/game/beast");
      } else if (response?.isObstacle && response?.obstacles) {
        setObstacles(response?.obstacles);
        navigate("/game/obstacle");
      }
    });
    return nextLevelPromise;
  };

  const createNewReward = async (rewardId: number, mode: string) => {
    // console.log(rewardId);
    // console.log(mode);
    const createNewRewardPromise = createReward(gameId, rewardId);

    createNewRewardPromise.then(async (response) => {
      if (response?.healed) {
        createNewLevel();
      } else if (response?.blisterPackResult) {
        setBlisterPackResult(response.blisterPackResult);
        navigate(`/rewards/${mode}`);
      }
    });
  };

  const selectNewRewards = async (cardIndex: number[]) => {
    const createRewardPromise = selectRewards(gameId, cardIndex);

    createRewardPromise.then((response) => {
      response?.cards && replaceCards(response.cards);
      resetPlaysAndDiscards();
      if (response?.isBeast && response?.beast) {
        setBeast({ ...response.beast, game_id: gameId });
        navigate("/game/beast");
      } else if (response?.isObstacle && response?.obstacles) {
        setObstacles(response?.obstacles);
        navigate("/game/obstacle");
      }
    });

    return createRewardPromise;
  };

  const executeCreateGame = async () => {
    const username = await (
      cartridgeConnector as CartridgeConnector
    ).username();
    console.log("username", username);
    setError(false);
    setGameLoading(true);
    setIsRageRound(false);
    console.log("executing create game for username ", username);
    if (username) {
      console.log("Creating game...");
      createGame(username).then(async (response) => {
        const { gameId: newGameId, hand } = response;
        if (newGameId) {
          resetLevel();
          setLockRedirection(true);
          navigate("/choose-class");
          setHand(hand);
          setGameId(newGameId);
          clearPreSelection();
          localStorage.setItem(GAME_ID, newGameId.toString());
          console.log(`game ${newGameId} created`);
          await syncCall();
          setGameLoading(false);
          setPreSelectionLocked(false);
          setRoundRewards(undefined);
        } else {
          setError(true);
        }
      });
    }
  };

  const replaceCards = (cards: Card[]) => {
    if (hand.length === 0) {
      setHand(cards);
      return;
    }

    const filteredHand = hand.filter(
      (card) => !cards.some((newCard) => newCard.idx === card.idx)
    );

    // Add the new cards to the filtered hand
    const updatedHand = [...filteredHand, ...cards].filter(
      (card) => card.card_id !== 9999 // Remove placeholder cards
    );
    setHand(updatedHand);
  };

  const setObstaclesCompleted = (ids: number[]) => {
    setObstacles(
      obstacles.map((obstacle) => ({
        ...obstacle,
        completed: ids.includes(obstacle.id) ? true : obstacle.completed,
      }))
    );
  };

  const animatePlay = (playEvents: PlayEvents) => {
    if (playEvents) {
      console.log(playEvents);
      const NEON_PLAY_DURATION = playEvents.neonPlayEvent
        ? playAnimationDuration
        : 0;
      const MODIFIER_SUIT_CHANGE_DURATION =
        (playEvents.modifierSuitEvents?.length ?? 0) * playAnimationDuration;
      const SPECIAL_SUIT_CHANGE_DURATION =
        (playEvents.specialSuitEvents?.length ?? 0) * playAnimationDuration;
      const GLOBAL_BOOSTER_DURATION =
        (playEvents.globalEvents?.length ?? 0) * playAnimationDuration * 2;
      const LEVEL_BOOSTER_DURATION = playEvents.levelEvent
        ? playAnimationDuration * 2
        : 0;
      const COMMON_CARDS_DURATION =
        playAnimationDuration * playEvents.cardScore.length;
      const CASH_DURATION =
        playAnimationDuration * (playEvents.cashEvents?.length ?? 0);
      const SPECIAL_CARDS_DURATION =
        playAnimationDuration * (playEvents.specialCards?.length ?? 0);
      const ALL_CARDS_DURATION =
        NEON_PLAY_DURATION +
        MODIFIER_SUIT_CHANGE_DURATION +
        SPECIAL_SUIT_CHANGE_DURATION +
        LEVEL_BOOSTER_DURATION +
        GLOBAL_BOOSTER_DURATION +
        COMMON_CARDS_DURATION +
        SPECIAL_CARDS_DURATION +
        CASH_DURATION +
        500;

      setPreSelectionLocked(true);

      if (playEvents.neonPlayEvent) {
        setPlayIsNeon(true);

        setAnimatedCard({
          animationIndex: -1,
          suit: 5,
          idx: playEvents.neonPlayEvent.neon_cards_idx,
        });
        pointsSound();
        playEvents.neonPlayEvent.points &&
          setPoints(playEvents.neonPlayEvent.points);
        multiSound();
        playEvents.neonPlayEvent.multi &&
          setMulti(playEvents.neonPlayEvent.multi);
      }

      if (playEvents.modifierSuitEvents) {
        playEvents.modifierSuitEvents.forEach((event, index) => {
          setTimeout(
            () => {
              pointsSound();
              setAnimatedCard({
                suit: event.suit,
                idx: [event.idx],
                animationIndex: index,
              });
              setHand((prev) => {
                const newHand = prev?.map((card) => {
                  if (event.idx === card.idx) {
                    return {
                      ...card,
                      suit: event.suit,
                      img: `${changeCardSuit(card.card_id!, event.suit)}.png`,
                    };
                  }
                  return card;
                });
                return newHand;
              });
            },
            playAnimationDuration * index + NEON_PLAY_DURATION
          );
        });
      }
      setTimeout(() => {
        if (playEvents.specialSuitEvents) {
          playEvents.specialSuitEvents.forEach((event, index) => {
            pointsSound();
            setAnimatedCard({
              suit: event.suit,
              special_idx: event.special_idx,
              idx: event.idx,
              animationIndex: 10 + index,
            });
            setHand((prev) => {
              const newHand = prev?.map((card) => {
                if (event.idx.includes(card.idx)) {
                  return {
                    ...card,
                    img: `${changeCardSuit(card.card_id!, event.suit)}.png`,
                  };
                }
                return card;
              });
              return newHand;
            });
          });
        }

        setTimeout(() => {
          //global boosters
          if (playEvents.globalEvents) {
            playEvents.globalEvents.forEach((event, index) => {
              setTimeout(() => {
                const { special_idx, multi, points } = event;
                if (points) {
                  pointsSound();
                  setAnimatedCard({
                    special_idx,
                    points,
                    animationIndex: 20 + index,
                  });
                  setPoints((prev) => prev + points);
                }
                if (multi) {
                  setTimeout(() => {
                    multiSound();
                    //animate multi
                    setAnimatedCard({
                      special_idx,
                      multi,
                      animationIndex: 31 + index,
                    });
                    setMulti((prev) => prev + multi);
                  }, playAnimationDuration);
                }
              }, playAnimationDuration * index);
            });
          }

          setTimeout(() => {
            //level boosters
            if (playEvents.levelEvent) {
              const {
                special_idx,
                multi: eventMulti,
                points: eventPoints,
              } = playEvents.levelEvent;
              //animate points
              if (eventPoints) {
                pointsSound();
                setAnimatedCard({
                  special_idx,
                  points: eventPoints - points,
                  animationIndex: 31,
                });
                setPoints(eventPoints);
              }
              if (eventMulti) {
                multiSound();
                setTimeout(() => {
                  //animate multi
                  setAnimatedCard({
                    special_idx,
                    multi: eventMulti - multi,
                    animationIndex: 41,
                  });
                  setMulti(eventMulti);
                }, playAnimationDuration);
              }
            }

            setTimeout(() => {
              //traditional cards and modifiers
              playEvents.cardScore.forEach((card, index) => {
                setTimeout(() => {
                  const { idx, points, multi } = card;

                  setAnimatedCard({
                    idx: [idx],
                    points,
                    multi,
                    animationIndex: 50 + index,
                  });
                  if (points) pointsSound();
                  points && setPoints((prev) => prev + points);
                  if (multi) multiSound();
                  multi && setMulti((prev) => prev + multi);
                }, playAnimationDuration * index);
              });

              // cash events
              setTimeout(() => {
                playEvents.cashEvents?.forEach((event, index) => {
                  setTimeout(() => {
                    const { idx, special_idx, cash } = event;
                    setAnimatedCard({
                      idx: [idx],
                      special_idx,
                      cash,
                      animationIndex: 60 + index,
                    });
                  }, playAnimationDuration * index);
                });

                //special cards
                setTimeout(() => {
                  playEvents.specialCards?.forEach((event, index) => {
                    setTimeout(() => {
                      const { idx, points, multi, special_idx } = event;
                      setAnimatedCard({
                        idx: [idx],
                        points,
                        multi,
                        special_idx,
                        animationIndex: 70 + index,
                      });
                      if (points) pointsSound();
                      points && setPoints((prev) => prev + points);
                      if (multi) multiSound();
                      multi && setMulti((prev) => prev + multi);
                    }, playAnimationDuration * index);
                  });
                }, CASH_DURATION);
              }, COMMON_CARDS_DURATION);
            }, LEVEL_BOOSTER_DURATION);
          }, GLOBAL_BOOSTER_DURATION);
        }, SPECIAL_SUIT_CHANGE_DURATION);
      }, MODIFIER_SUIT_CHANGE_DURATION + NEON_PLAY_DURATION);

      setTimeout(() => {
        setPlayAnimation(true);
        if (playEvents.playerAttack) {
          setAttackAnimation(playEvents.playerAttack.valueOf());
        }
        setLevelScore(points * multi);
        setTimeout(() => {
          setLevelScore(0);
        }, 2500);
      }, ALL_CARDS_DURATION + 500);

      setTimeout(() => {
        setAnimatedCard(undefined);

        setPlayAnimation(false);
        clearPreSelection();
        setPreSelectionLocked(false);
        setPlayIsNeon(false);

        consumeEnergyPlay();
        consumePlay();

        if (playEvents.beastAttack) {
          setBeastAttack(playEvents.beastAttack);
          resetPlaysAndDiscards();
        }

        if (playEvents.itemChallengeCompleted) {
          setObstaclesCompleted(playEvents.itemChallengeCompleted);
        }
        if (playEvents.gameOver) {
          setGameOver(true);
          console.log("GAME OVER");
          setTimeout(() => {
            navigate(`/gameover/${gameId}`);
            setLockRedirection(false);
          }, 1500);
        } else if (
          playEvents.levelPassed ||
          playEvents.obstacleDefeated ||
          playEvents.playWinGameEvent
        ) {
          if (playEvents.rewards) {
            const rewards = [playEvents.rewards[1], playEvents.rewards[2]];
            setRewardsIds(rewards.map((id) => ({ id })));
          }
          setTimeout(
            () => {
              navigate("/rewards");
            },
            playEvents.playWinGameEvent ? 2000 : 1000
          );
        } else if (playEvents.obstacleAttack) {
          navigate("/rewards");
          setObstacleAttack(playEvents.obstacleAttack);
        } else {
          playEvents.cards && replaceCards(playEvents.cards);
          setRoundRewards(undefined);
          setLockRedirection(false);
        }
      }, ALL_CARDS_DURATION + 1000);
    }
  };

  const onPlayClick = () => {
    setPreSelectionLocked(true);
    setLockRedirection(true);

    const newModifiers = [
      ...preSelectedModifiers,
      ...Array(preSelectedCards.length - preSelectedModifiers.length).fill(100),
    ];

    play(gameId, preSelectedCards, newModifiers)
      .then((response) => {
        if (response) {
          animatePlay(response);
        } else {
          setPreSelectionLocked(false);
          clearPreSelection();
        }
      })
      .catch(() => {
        setLockRedirection(false);
        setPreSelectionLocked(false);
      });
  };

  const clearPreSelection = () => {
    if (!preSelectionLocked) {
      resetMultiPoints();
      setPreSelectedCards([]);
      setPreSelectedModifiers([]);
    }
  };

  const resetMultiPoints = () => {
    setPoints(0);
    setMulti(0);
  };

  const cardIsPreselected = (cardIndex: number) => {
    return preSelectedCards.filter((idx) => idx === cardIndex).length > 0;
  };

  const unPreSelectCard = (cardIndex: number) => {
    setPreSelectedCards((prev) => {
      return prev.filter((idx) => cardIndex !== idx);
    });
  };

  const preSelectCard = (cardIndex: number) => {
    if (!preSelectedCards.includes(cardIndex) && preSelectedCards.length < 5) {
      setPreSelectedCards((prev) => {
        return [...prev, cardIndex];
      });
    }
  };

  const togglePreselected = (cardIndex: number) => {
    if (!preSelectionLocked) {
      if (cardIsPreselected(cardIndex)) {
        unPreSelectCard(cardIndex);
        preselectCardSound();
      } else if (preSelectedCards.length < 5) {
        preSelectCard(cardIndex);
        preselectCardSound();
      }
    }
  };

  const togglePreselectedModifier = (cardIndex: number) => {
    if (!preSelectionLocked) {
      if (preSelectedModifiers.includes(cardIndex)) {
        setPreSelectedModifiers(
          preSelectedModifiers.filter((idx) => idx !== cardIndex)
        );
      } else if (preSelectedModifiers.length < 2) {
        setPreSelectedModifiers([...preSelectedModifiers, cardIndex]);
      }
    }
  };

  const onDiscardClick = () => {
    discardSound();
    setPreSelectionLocked(true);
    setDiscardAnimation(true);
    stateDiscard();
    discard(gameId, preSelectedCards, preSelectedModifiers).then((response) => {
      if (response.success) {
        consumeEnergyDiscard();
        consumeDiscard();

        if (response.beastAttack) {
          setBeastAttack(response.beastAttack);
          resetPlaysAndDiscards();
        }

        if (response.gameOver) {
          setGameOver(true);
          setTimeout(() => {
            navigate(`/gameover/${gameId}`);
          }, 1000);
        } else {
          replaceCards(response.cards);
        }
      } else {
        rollbackDiscard();
      }
      setPreSelectionLocked(false);
      clearPreSelection();
      setDiscardAnimation(false);
    });
  };

  const onDiscardEffectCard = (cardIdx: number) => {
    setPreSelectionLocked(true);
    const newHand = hand?.map((card) => {
      if (card.idx === cardIdx) {
        return {
          ...card,
          discarded: true,
        };
      }
      return card;
    });
    setHand(newHand);
    const rollback = () => {
      // rollback, remove discarded boolean from all cards
      const newHand = hand?.map((card) => {
        return {
          ...card,
          discarded: false,
        };
      });
      setHand(newHand);
    };
    const discardPromise = discardEffectCard(gameId, cardIdx);
    discardPromise
      .then((response): void => {
        if (response.success) {
          replaceCards(response.cards);
        } else {
          rollback();
        }
      })
      .catch(() => {
        rollback();
      })
      .finally(() => {
        setPreSelectionLocked(false);
      });
    return discardPromise;
  };

  const onShopSkip = () => {
    resetLevel();
  };

  const onDiscardSpecialCard = (cardIdx: number) => {
    setPreSelectionLocked(true);
    return discardSpecialCard(gameId, cardIdx).finally(() => {
      setPreSelectionLocked(false);
    });
  };

  const checkOrCreateGame = () => {
    console.log("checking game exists", gameId);
    if (!gameId || gameId === 0) {
      console.log("no game id, creating new game");
      return executeCreateGame();
    } else if (!gameExists(Game, gameId)) {
      console.log("game doesn't exist (first try)");
      setTimeout(() => {
        if (!gameExists(Game, gameId)) {
          console.log("game still doesn't exist - creating new game");
          executeCreateGame();
        } else {
          setGameLoading(false);
          setLockRedirection(false);
          redirectBasedOnGameState();
          console.log("Game found (2), no need to create a new one");
        }
      }, 2000);
    } else {
      setGameLoading(false);
      setLockRedirection(false);
      redirectBasedOnGameState();
      console.log("Game found, no need to create a new one");
    }
  };

  const cleanGameId = () => {
    setGameId(0);
    setIsRageRound(false);
  };

  const redirectBasedOnGameState = () => {
    if (!lockRedirection) {
      if (game?.state.type === "FINISHED") {
        return navigate(`/gameover/${gameId}`);
      } else {
        if (game?.substate.type === "DRAFT_DECK") {
          console.log("redirecting to SELECT_DECK");
          return navigate("/choose-class");
        } else if (game?.substate.type === "DRAFT_SPECIALS") {
          console.log("redirecting to SELECT_SPECIAL_CARDS");
          return navigate("/choose-specials");
        } else if (game?.substate.type === "DRAFT_MODIFIERS") {
          console.log("redirecting to SELECT_MODIFIER_CARDS");
          return navigate("/choose-modifiers");
        } else if (game?.substate.type === "DRAFT_ADVENTURER") {
          return navigate("/adventurers");
        } else if (game?.substate.type === "OBSTACLE") {
          return navigate("/game/obstacle");
        } else if (game?.substate.type === "BEAST") {
          return navigate("/game/beast");
        } else if (
          game?.substate.type === "CREATE_REWARD" ||
          game?.substate.type === "UNPASSED_OBSTACLE"
        ) {
          return navigate("/rewards");
        } else if (game?.substate.type === "REWARD_CARDS_PACK") {
          return navigate("/rewards/pack");
        } else if (game?.substate.type === "REWARD_SPECIALS") {
          return navigate("/rewards/specials");
        }
      }
      console.log("default redirect to select deck");
      return navigate("/choose-class");
    }
  };

  useEffect(() => {
    // start with redirection unlocked
    setLockRedirection(false);
  }, []);

  const actions = {
    setPreSelectedCards,
    play: onPlayClick,
    setHand,
    togglePreselected,
    togglePreselectedModifier,
    discard: onDiscardClick,
    discardEffectCard: onDiscardEffectCard,
    clearPreSelection,
    toggleSortBy,
    onShopSkip,
    discardSpecialCard: onDiscardSpecialCard,
    checkOrCreateGame,
    restartGame: cleanGameId,
    executeCreateGame,
    preSelectCard,
    unPreSelectCard,
    selectDeckType,
    selectSpecialCards,
    selectModifierCards,
    createNewLevel,
    selectAdventurerCards,
    createNewReward,
    selectNewRewards,
    executeEndTurn,
    skipFailedObstacle,
  };

  return (
    <GameContext.Provider
      value={{
        ...state,
        ...actions,
        lockRedirection,
        discards,
        redirectBasedOnGameState,
        attackAnimation,
        setAttackAnimation,
        levelScore,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
