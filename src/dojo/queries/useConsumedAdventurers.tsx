import { gql } from "graphql-tag";
import { useQuery } from "react-query";
import graphQLClient from "../../graphQLClient";

export const CONSUMED_ADVENTURERS_QUERY_KEY = "consumedadventurers";

export const CONSUMED_ADVENTURERS_QUERY = gql`
  query {
    jnLootAdventurerConsumedModels(first: 1000) {
      edges {
        node {
          adventurer_id
          consumed
        }
      }
    }
  }
`;

interface ConsumedAdventurerEdge {
  node: {
    adventurer_id: number;
    consumed: boolean;
  };
}

interface ConsumedAdventurersResponse {
  jnLootAdventurerConsumedModels: {
    edges: ConsumedAdventurerEdge[];
  };
}

const fetchGraphQLData = async (): Promise<ConsumedAdventurersResponse> => {
  return await graphQLClient.request(CONSUMED_ADVENTURERS_QUERY);
};

export const useConsumedAdventurers = () => {
  const queryResponse = useQuery<ConsumedAdventurersResponse>(
    [CONSUMED_ADVENTURERS_QUERY_KEY],
    () => fetchGraphQLData()
  );
  const { data } = queryResponse;

  return data?.jnLootAdventurerConsumedModels.edges
    .filter((edge) => {
      return edge.node.consumed;
    })
    .map((edge) => {
      return edge.node.adventurer_id;
    });
};
