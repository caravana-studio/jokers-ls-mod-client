import { gql } from "graphql-tag";
import { useQuery } from "react-query";
import { decodeString } from "../dojo/utils/decodeString";
import graphQLClient from "../graphQLClient";

export const LEADERBOARD_QUERY_KEY = "leaderboard";

export const LEADERBOARD_QUERY = gql`
  query {
    jokersOfNeonGameModels(
      first: 10000
      order: { field: "LEVEL", direction: "DESC" }
    ) {
      edges {
        node {
          player_score
          level
          player_name
          id
        }
      }
    }
  }
`;

interface GameEdge {
  node: {
    player_score: number;
    level: number;
    player_name: string;
    id: number;
  };
}

interface LeaderboardResponse {
  jokersOfNeonGameModels: {
    edges: GameEdge[];
  };
}

const getPrize = (position: number): number => {
  if (position > 3 && position < 11) {
    return 100;
  }
  switch (position) {
    case 1:
      return 1000;
    case 2:
      return 500;
    case 3:
      return 200;
    default:
      return 0;
  }
};

export const CURRENT_LEADER_NAME_KEY = "current_leader_name";

const fetchGraphQLData = async (): Promise<LeaderboardResponse> => {
  return await graphQLClient.request(LEADERBOARD_QUERY);
};

export const useGetLeaderboard = (gameId?: number) => {
  const queryResponse = useQuery<LeaderboardResponse>(
    [LEADERBOARD_QUERY_KEY],
    () => fetchGraphQLData()
  );
  const { data } = queryResponse;

  const dojoLeaders = data?.jokersOfNeonGameModels?.edges
    ?.filter((edge) => edge.node.player_score > 0)
    .sort((a, b) => {
      if (a.node.level !== b.node.level) {
        return b.node.level - a.node.level;
      }
      return b.node.player_score - a.node.player_score;
    })
    .reduce((acc, leader) => {
      const playerName = decodeString(leader.node.player_name ?? "");
      const playerScore = leader.node.player_score;
      const playerLevel = leader.node.level;

      if (leader.node.id === gameId) {
        acc.set(CURRENT_LEADER_NAME_KEY, {
          ...leader.node,
          player_name: playerName,
        });
      } else if (!acc.has(playerName)) {
        acc.set(playerName, { ...leader.node, player_name: playerName });
      } else {
        const existingLeader = acc.get(playerName)!;

        if (
          playerLevel > existingLeader.level ||
          (playerLevel === existingLeader.level &&
            playerScore > existingLeader.player_score)
        ) {
          acc.set(playerName, { ...leader.node, player_name: playerName });
        }
      }

      return acc;
    }, new Map<string, { id: number; player_name: string; player_score: number; level: number }>());

  const leaderboard = Array.from(dojoLeaders?.values() ?? []).map(
    (leader, index) => ({
      ...leader,
      position: index + 1,
      prize: getPrize(index + 1),
    })
  );

  return {
    ...queryResponse,
    data: leaderboard,
  };
};
