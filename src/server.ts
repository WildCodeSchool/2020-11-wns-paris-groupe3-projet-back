import { ApolloServer } from "apollo-server-express";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typedefs";

export async function getApolloServer(): Promise<ApolloServer> {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  return apolloServer;
}
