"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const typedefs_1 = __importDefault(require("./graphql/typedefs"));
const resolvers_1 = __importDefault(require("./graphql/resolvers"));
require("./mongo/config");
const apolloServer = new apollo_server_express_1.ApolloServer({ typeDefs: typedefs_1.default, resolvers: resolvers_1.default });
const expressServer = express_1.default();
apolloServer.applyMiddleware({ app: expressServer });
expressServer.listen({ port: 8080 }, () => console.log(`🚀 Serveur lancé sur: http://localhost:8080${apolloServer.graphqlPath}`));
//# sourceMappingURL=server.js.map