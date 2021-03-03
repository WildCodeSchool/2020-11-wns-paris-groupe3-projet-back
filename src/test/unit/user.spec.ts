import { createTestClient } from "apollo-server-testing";

import { getApolloServer } from "../../server";
import { User } from "../../models";

describe("Get all users", () => {
  let query: any;
  beforeAll(async () => {
    const testClient = createTestClient(await getApolloServer());
    query = testClient.query;
  });

  it("returns all users", async () => {
    const user1 = User.create({
      _id: "5ff492076a3476547d8cedcc",
      firstname: "Pierre",
    });
    (await user1).save();
    const user2 = User.create({
      _id: "5ff49ef46a3476547d8cedcd",
      firstname: "Julie",
    });
    (await user2).save();

    const response = await query({
      query: `
      {
        users {
          _id
          firstname
        }
      }
    `,
    });

    expect(response.data).toEqual({
      users: [
        {
          _id: "5ff492076a3476547d8cedcc",
          firstname: "Pierre",
        },
        {
          _id: "5ff49ef46a3476547d8cedcd",
          firstname: "Julie",
        },
      ],
    });
  });
});
