import 'reflect-metadata';
import express from 'express';
import { getApolloServer } from './server';
require("./mongo/config");

const PORT = process.env.PORT || 8080

const main = async () => {
  const apolloServer = await getApolloServer();

  const expressServer = express();
  apolloServer.applyMiddleware({ app: expressServer });

  expressServer.listen(PORT, () =>
    console.log(
      `🚀 Serveur lancé sur: ${PORT}`
    )
  );
};

main();
