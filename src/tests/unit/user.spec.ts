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
      _id: "5ff307772a325013a4389fa2",
      firstname: "Pierre",
      lastname: "Dupond",
      email: "p@email.com",
      password: "123456",
      role: "5fdb76f200e2c95340a59cc9",
      speciality: "5fdb812a00e2c95340a59ccb",
    });
    (await user1).save();
    const user2 = User.create({
      _id: "5ff4816d653ab339a84574a6",
      firstname: "Julie",
      lastname: "Durand",
      email: "j@email.com",
      password: "123456",
      role: "5fdb76f200e2c95340a59cc9",
      speciality: "5fdb812a00e2c95340a59ccb",
    });
    (await user2).save();

    const response = await query({
      query: `
      {
        users {
          _id
          firstname
          lastname
          speciality {
            _id
          }
        }
      }
    `,
    });

    expect(response.data).toEqual({
      users: [
        {
          _id: "5ff307772a325013a4389fa2",
          firstname: "Pierre",
          lastname: "Dupond",
          speciality: {
            _id: "5fdb812a00e2c95340a59ccb",
          },
        },
        {
          _id: "5ff4816d653ab339a84574a6",
          firstname: "Julie",
          lastname: "Durand",
          speciality: {
            _id: "5fdb812a00e2c95340a59ccb",
          },
        },
      ],
    });
  });
});

describe("Authenticate", () => {
  let mutate: any;
  beforeAll(async () => {
    const testClient = createTestClient(await getApolloServer());
    mutate = testClient.mutate;
  });

  it("should be null if a field is empty when try to log in", async () => {
    const user = User.create({
      _id: "5ff492076a3476547d8cedcc",
      email: "fred@email.com",
      password: "1234560",
      firstname: "Fred",
      lastname: "Dupond",
    });
    (await user).save();

    const response = await mutate({
      mutation: `
        mutation {
          login(
            email: "fred@email.com"
            password: ""
          ) {
            firstname
            lastname
            email
          }
        }
      `,
    });

    expect(response.data).toBe(null);
  });
});
