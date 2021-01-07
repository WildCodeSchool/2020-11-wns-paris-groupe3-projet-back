import { createTestClient } from "apollo-server-testing";
import {
  connect,
  closeDatabase,
  clearDatabase,
} from "./mongo/config_db_testing";

import { getApolloServer } from "./server";
import { Task } from "./models/task";
import { User } from "./models/user";

describe("Apollo server", () => {
  let mutate: any;
  let query: any;
  beforeEach(async () => {
    await connect();
    const testClient = createTestClient(await getApolloServer());
    mutate = testClient.mutate;
    query = testClient.query;
  });

  afterEach(async () => {
    await clearDatabase();
    await closeDatabase();
  });
});
