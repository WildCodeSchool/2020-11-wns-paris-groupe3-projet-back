import { createTestClient } from "apollo-server-testing";

import { getApolloServer } from "../../server";
import { User } from "../../models";

describe("Apollo server", () => {
  let mutate: any;
  let query: any;
  beforeEach(async () => {
    const testClient = createTestClient(await getApolloServer());
    mutate = testClient.mutate;
    query = testClient.query;
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
