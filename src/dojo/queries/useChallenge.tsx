import { useEffect, useState } from "react";
import { ChallengePlayer } from "../typescript/models.gen";
import { useDojo } from "../useDojo";
import { getLSGameId } from "../utils/getLSGameId";
import { getChallegePlayer } from "./getChallengePlayer";

export const useChallengePlayer = () => {
  const {
    setup: { client },
  } = useDojo();

  const [playsLeft, setPlaysLeft] = useState(-1);
  const [discardsLeft, setDiscardsLeft] = useState(-1); 

  useEffect(() => {
    fetchPlaysAndDiscards();
  }, []);

  const fetchPlaysAndDiscards = () => {
    getChallegePlayer(client).then((challengePlayer) => {
      setPlaysLeft(challengePlayer.plays)
      setDiscardsLeft(challengePlayer.discards)
    });
  };

  return { playsLeft, discardsLeft, setPlaysLeft, setDiscardsLeft, fetchPlaysAndDiscards}
};

export const useChallenge = () => {
  const {
    setup: { client },
  } = useDojo();

  const [challenges, setChallenges] = useState<
    { id: number; completed: boolean }[]
  >([]);

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = () => {
    getChallenges(client).then((newChallenges) => {
      setChallenges(newChallenges);
    });
  };

  return { challenges, setChallenges, fetchChallenges };
};

export const getChallenges = async (
  client: any
): Promise<{ id: number; completed: boolean }[]> => {
  const result = await client.player_system.get_challenge({
    game_id: getLSGameId(),
  });

  return (result.active_ids as any).map((challenge: any) => {
    const id = challenge[0] ? Number((challenge[0] as number)?.valueOf()) : 0;
    const completed = challenge[1]
      ? Boolean((challenge[1] as boolean)?.valueOf())
      : false;
    return { id, completed };
  });
};
