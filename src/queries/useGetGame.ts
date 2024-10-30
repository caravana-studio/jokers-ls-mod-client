import { gql } from "graphql-tag";
import { useQuery } from "react-query";
import graphQLClient from "../graphQLClient";

export const GAME_QUERY_KEY = "game";

export const GAME_QUERY = gql`
  query GetGame($gameId: ID!) {
    jokersOfNeonGameModels(where: { idEQ: $gameId }) {
      edges {
        node {
          cash
          state
          round
          len_max_current_special_cards
          len_current_special_cards
          player_score
          max_hands
          max_discard
          owner
        }
      }
    }
  }
`;

interface GameEdge {
  node: {
    cash: number;
    state: string;
    round: number;
    len_max_current_special_cards: number;
    len_current_special_cards: number;
    player_score: number;
    max_hands: number;
    max_discard: number;
    owner: string;
  };
}

interface GameResponse {
  jokersOfNeonGameModels: {
    edges: GameEdge[];
  };
}

const fetchGraphQLData = async (id: number): Promise<GameResponse> => {
  return await graphQLClient.request(GAME_QUERY, { gameId: id });
};

export const useGetGame = (id: number, refetching: boolean = false) => {
  const queryResponse = useQuery<GameResponse>([GAME_QUERY_KEY, id], () =>
    fetchGraphQLData(id),
  {
    refetchInterval: refetching ? 500 : undefined,
  }
  );
  const { data } = queryResponse;

  const game = data?.jokersOfNeonGameModels?.edges[0]?.node;

  return {
    ...queryResponse,
    data: game,
  };
};
