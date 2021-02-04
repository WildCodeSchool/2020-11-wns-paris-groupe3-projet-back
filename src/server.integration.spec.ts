import { createTestClient } from "apollo-server-testing";

import {
  connect,
  closeDatabase,
  clearDatabase,
} from "./mongo/config_db_testing";

import { getApolloServer } from "./server";
import { User } from "./models/user";
import { Comment } from "./models/comment";

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

  describe("Mutation for create a comment for a task", () => {
    it("Create a comment and return it", async () => {
      const response = await mutate({
        mutation: `
            mutation {
              createComment(
                input: {
                  user: "5ff307772a325013a4389fa2"
                  task: "5ff739afc976ff15d97eb12f"
                  content: "TacheDeTest1"
                }
              ) {
                _id
                content
              }
            }
          `,
      });

      expect(response.data).toMatchObject({
        createComment: {
          content: "TacheDeTest1",
        },
      });
    });
  });

  describe("Mutation for update a comment with his ID", () => {
    it("update a comment and return it", async () => {
      const commentOne = Comment.create({
        _id: "5ff492076a3476547d8cedcc",
        user: "6ff492076a3476547d8cedde",
        task: "5ff739afc976ff15d97eb12f",
        content: "Pierre",
      });
      (await commentOne).save();

      const response = await mutate({
        mutation: `
            mutation {
              updateComment(
                _id : "5ff492076a3476547d8cedcc"
                input: {
                  content: "TacheDeTest1"
                }
              ) {
                _id
                content
              }
            }
          `,
      });

      expect(response.data).toMatchObject({
        updateComment: {
          _id: "5ff492076a3476547d8cedcc",
          content: "TacheDeTest1",
        },
      });
    });
  });

  describe("Mutation for delete a comment", () => {
    it("delete a comment", async () => {
      const commentOne = Comment.create({
        _id: "5ff492076a3476547d8cedcc",
        user: "6ff492076a3476547d8cedde",
        task: "5ff739afc976ff15d97eb12f",
        content: "Pierre",
      });
      (await commentOne).save();

      const response = await mutate({
        mutation: `
            mutation {
              deleteComment(
                _id : "5ff492076a3476547d8cedcc"
              ) {
                _id
                content
              }
            }
          `,
      });

      expect(response.data).toMatchObject({
        deleteComment: {
          _id: "5ff492076a3476547d8cedcc",
          content: "Pierre",
        },
      });
    });
  });
});
