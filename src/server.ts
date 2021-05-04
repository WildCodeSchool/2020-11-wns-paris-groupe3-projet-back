import { ApolloServer } from "apollo-server-express";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";

export async function getApolloServer(): Promise<ApolloServer> {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  return apolloServer;
}
