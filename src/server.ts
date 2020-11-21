import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./graphql/typedefs";
import resolvers from "./graphql/resolvers";
require("./mongo/config");

const PORT = process.env.PORT || 8080

const apolloServer = new ApolloServer({ typeDefs, resolvers });
const expressServer = express();
apolloServer.applyMiddleware({ app: expressServer });

expressServer.listen(PORT, () =>
  console.log(
    `🚀 Serveur lancé sur: ${PORT}`
  )
);


