import { GraphQLClient } from "graphql-request";

const endpoint =
  import.meta.env.VITE_GRAPHQL_URL || "http://localhost:8080/graphql";

const graphQLClient = new GraphQLClient(endpoint);

export default graphQLClient;
