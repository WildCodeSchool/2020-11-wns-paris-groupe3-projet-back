import "reflect-metadata";
import express from "express";
import { getApolloServer } from "./server";
require("./mongo/config");

const PORT = process.env.PORT || 8080;

const main = async () => {
  const apolloServer = await getApolloServer();

  const expressServer = express();

  expressServer.use(express.json({ limit: "50mb" }));
  expressServer.use(express.urlencoded({ limit: "50mb", extended: true }));

  apolloServer.applyMiddleware({ app: expressServer });

  expressServer.listen(PORT, () =>
    console.log(`🚀 Serveur lancé sur: ${PORT}`)
  );
};

main();
