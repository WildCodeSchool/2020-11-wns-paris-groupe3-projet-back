import { createTestClient } from "apollo-server-testing";
import {
  connect,
  closeDatabase,
  clearDatabase,
} from "./mongo/config_db_testing";

import { getApolloServer } from "./server";
import { User } from "./models/user";

describe("Apollo server", () => {
  let query: any;
  beforeEach(async () => {
    await connect();
    const testClient = createTestClient(await getApolloServer());
    query = testClient.query;
  });

  afterEach(async () => {
    await clearDatabase();
    await closeDatabase();
  });

  describe("query users", () => {
    it("returns all users", async () => {
      const user1 = User.create({
        _id: "5ff492076a3476547d8cedcc",
        username: "Pierre",
      });
      (await user1).save();
      const user2 = User.create({
        _id: "5ff49ef46a3476547d8cedcd",
        username: "Julie",
      });
      (await user2).save();

      const response = await query({
        query: `
        {
          users {
            _id
            username
          }
        }
      `,
      });

      expect(response.data).toEqual({
        users: [
          {
            _id: "5ff492076a3476547d8cedcc",
            username: "Pierre",
          },
          {
            _id: "5ff49ef46a3476547d8cedcd",
            username: "Julie",
          },
        ],
      });
    });
  });
});
