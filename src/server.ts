import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./graphql/typedefs";
import resolvers from "./graphql/resolvers";
require("./mongo/config");
import { User } from "./models/users";

const apolloServer = new ApolloServer({ typeDefs, resolvers });
const expressServer = express();
apolloServer.applyMiddleware({ app: expressServer });

expressServer.listen({ port: 8080 }, () =>
  console.log(
    `🚀 Serveur lancé sur: http://localhost:8080${apolloServer.graphqlPath}`
  )
);


