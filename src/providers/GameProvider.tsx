import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { GAME_ID, SORT_BY_SUIT } from "../constants/localStorage";
import {
  discardSfx,
  multiSfx,
  pointsSfx,
  preselectedCardSfx,
} from "../constants/sfx.ts";
import { useGame } from "../dojo/queries/useGame.tsx";
import { useRound } from "../dojo/queries/useRound.tsx";
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
  getModifiers: (preSelectedCardIndex: number) => Card[];
  togglePreselected: (cardIndex: number) => void;
  discardAnimation: boolean;
  playAnimation: boolean;
  discard: () => void;
  discardEffectCard: (
    cardIdx: number
  ) => Promise<{ success: boolean; cards: Card[] }>;
  error: boolean;
  clearPreSelection: () => void;
  preSelectedModifiers: { [key: number]: number[] };
  addModifier: (cardIdx: number, modifierIdx: number) => void;
  roundRewards: RoundRewards | undefined;
  sortBy: SortBy;
  toggleSortBy: () => void;
  onShopSkip: () => void;
  discardSpecialCard: (cardIdx: number) => Promise<boolean>;
  checkOrCreateGame: () => void;
  restartGame: () => void;
  preSelectionLocked: boolean;
  score: number;
  lockRedirection: boolean;
  specialCards: Card[];
  playIsNeon: boolean;
  isRageRound: boolean;
  setIsRageRound: (isRageRound: boolean) => void;
  cash: number;
  setLockedCash: (cash: number | undefined) => void;
  rageCards: Card[];
  setRageCards: (rageCards: Card[]) => void;
  discards: number;
  preSelectCard: (cardIndex: number) => void;
  unPreSelectCard: (cardIndex: number) => void;
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
  getModifiers: (_) => {
    return [];
  },
  togglePreselected: (_) => {},
  discardAnimation: false,
  playAnimation: false,
  discard: () => {},
  discardEffectCard: () =>
    new Promise((resolve) => resolve({ success: false, cards: [] })),
  error: false,
  clearPreSelection: () => {},
  preSelectedModifiers: {},
  addModifier: (_, __) => {},
  roundRewards: undefined,
  sortBy: SortBy.RANK,
  toggleSortBy: () => {},
  onShopSkip: () => {},
  discardSpecialCard: () => new Promise((resolve) => resolve(false)),
  checkOrCreateGame: () => {},
  restartGame: () => {},
  preSelectionLocked: false,
  score: 0,
  lockRedirection: false,
  specialCards: [],
  playIsNeon: false,
  isRageRound: false,
  setIsRageRound: (_) => {},
  cash: 0,
  setLockedCash: (_) => {},
  rageCards: [],
  setRageCards: (_) => {},
  discards: 0,
  preSelectCard: (_) => {},
  unPreSelectCard: (_) => {},
});
export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({ children }: PropsWithChildren) => {
  const state = useGameState();
  const [lockRedirection, setLockRedirection] = useState(false);

  const round = useRound();
  const handsLeft = round?.hands ?? 0;

  const navigate = useNavigate();
  const {
    setup: {
      clientComponents: { Game },
    },
    account: { account },
    syncCall,
  } = useDojo();

  const { createGame, play, discard, discardEffectCard, discardSpecialCard } =
    useGameActions();

  const { discards, discard: stateDiscard, rollbackDiscard } = useDiscards();

  const game = useGame();
  const { play: preselectCardSound } = useAudio(preselectedCardSfx);
  const { play: discardSound } = useAudio(discardSfx, 4);
  const { play: pointsSound } = useAudio(pointsSfx);
  const { play: multiSound } = useAudio(multiSfx);

  const minimumDuration =
    !game?.level || game?.level <= 15 ? 400 : game?.level > 20 ? 300 : 350;

  const playAnimationDuration = Math.max(
    700 - ((game?.level ?? 1) - 1) * 50,
    minimumDuration
  );

  const { setAnimatedCard } = useCardAnimations();

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
    setLockedSpecialCards,
    specialCards,
    setLockedScore,
    score,
    cash,
    setLockedCash,
    setIsRageRound,
  } = state;

  const resetLevel = () => {
    setRoundRewards(undefined);
    setPreSelectionLocked(false);
    setIsRageRound(false);
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

  const executeCreateGame = async () => {
    setError(false);
    setGameLoading(true);
    setIsRageRound(false);
    if (username) {
      console.log("Creating game...");
      createGame(username).then(async (response) => {
        const { gameId: newGameId, hand } = response;
        if (newGameId) {
          resetLevel();
          navigate("/demo");
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
    const newHand = hand
      ?.map((card) => {
        const newCard = cards.find((c) => c.idx === card.idx);
        if (newCard) {
          return newCard;
        } else {
          return card;
        }
      })
      // filter out null cards (represented by card_id 9999)
      .filter((card) => card.card_id !== 9999);
    setHand(newHand);
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
      }, ALL_CARDS_DURATION);

      setTimeout(() => {
        setAnimatedCard(undefined);
        setLockedScore(undefined);

        setPlayAnimation(false);
        clearPreSelection();
        handsLeft > 0 && setPreSelectionLocked(false);
        setPlayIsNeon(false);
        setLockedSpecialCards([]);
        if (playEvents.gameOver) {
          console.log("GAME OVER");
          setTimeout(() => {
            navigate(`/gameover/${gameId}`);
            setLockRedirection(false);
          }, 1000);
        } else if (playEvents.levelPassed && playEvents.detailEarned) {
          const { level } = playEvents.levelPassed;
          setTimeout(() => {
            setRoundRewards({
              ...playEvents.detailEarned!,
              level: level,
            });
            navigate("/rewards");
          }, 1000);
          setPreSelectionLocked(true);
        } else {
          setLockedCash(undefined);
          playEvents.cards && replaceCards(playEvents.cards);
          setRoundRewards(undefined);
          setLockRedirection(false);
        }
      }, ALL_CARDS_DURATION + 500);
    }
  };

  const onPlayClick = () => {
    setPreSelectionLocked(true);
    setLockRedirection(true);
    setLockedSpecialCards(specialCards);
    setLockedScore(score);
    setLockedCash(cash);
    play(gameId, preSelectedCards, preSelectedModifiers)
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
    if (!preSelectionLocked && handsLeft > 0) {
      resetMultiPoints();
      setPreSelectedCards([]);
      setPreSelectedModifiers({});
    }
  };

  const resetMultiPoints = () => {
    setPoints(0);
    setMulti(0);
  };

  const getModifiers = (preSelectedCardIndex: number) => {
    const modifierIndexes = preSelectedModifiers[preSelectedCardIndex];
    return (
      modifierIndexes?.map((modifierIdx) => {
        return hand.find((c) => c.idx === modifierIdx)!;
      }) ?? []
    );
  };

  const cardIsPreselected = (cardIndex: number) => {
    return preSelectedCards.filter((idx) => idx === cardIndex).length > 0;
  };

  const unPreSelectCard = (cardIndex: number) => {
    setPreSelectedModifiers((prev) => {
      return {
        ...prev,
        [cardIndex]: [],
      };
    });
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
    if (!preSelectionLocked && handsLeft > 0) {
      if (cardIsPreselected(cardIndex)) {
        unPreSelectCard(cardIndex);
        preselectCardSound();
      } else if (preSelectedCards.length < 5) {
        preSelectCard(cardIndex);
        preselectCardSound();
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
        if (response.gameOver) {
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

  const addModifier = (cardIdx: number, modifierIdx: number) => {
    const modifiers = preSelectedModifiers[cardIdx] ?? [];
    if (modifiers.length < 1) {
      const newModifiers = [...modifiers, modifierIdx];
      setPreSelectedModifiers((prev) => {
        return {
          ...prev,
          [cardIdx]: newModifiers,
        };
      });
    }
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
    if (!gameId || gameId === 0 || !gameExists(Game, gameId)) {
      setTimeout(() => {
        if (!gameExists(Game, gameId)) {
          executeCreateGame();
        } else {
          setGameLoading(false);
          console.log("Game found (2), no need to create a new one");
        }
      }, 2000);
    } else {
      setGameLoading(false);
      console.log("Game found, no need to create a new one");
    }
  };

  const cleanGameId = () => {
    setGameId(0);
    setIsRageRound(false);
  };

  useEffect(() => {
    if (!lockRedirection) {
      if (game?.state === "FINISHED") {
        navigate(`/gameover/${gameId}`);
      } else if (game?.state === "AT_SHOP") {
        console.log("redirecting to store");
        navigate("/store");
      }
    }
  }, [game?.state, lockRedirection]);

  useEffect(() => {
    // start with redirection unlocked
    setLockRedirection(false);
  }, []);

  const actions = {
    setPreSelectedCards,
    play: onPlayClick,
    setHand,
    getModifiers,
    togglePreselected,
    discard: onDiscardClick,
    discardEffectCard: onDiscardEffectCard,
    clearPreSelection,
    addModifier,
    toggleSortBy,
    onShopSkip,
    discardSpecialCard: onDiscardSpecialCard,
    checkOrCreateGame,
    restartGame: cleanGameId,
    executeCreateGame,
    preSelectCard,
    unPreSelectCard,
  };

  return (
    <GameContext.Provider
      value={{ ...state, ...actions, lockRedirection, discards }}
    >
      {children}
    </GameContext.Provider>
  );
};
