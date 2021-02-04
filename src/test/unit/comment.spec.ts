import { createTestClient } from "apollo-server-testing";

import { getApolloServer } from "../../server";
import { Comment } from "../../models";

describe("Comment", () => {
  let mutate: any;
  let query: any;
  beforeEach(async () => {
    const testClient = createTestClient(await getApolloServer());
    mutate = testClient.mutate;
    query = testClient.query;
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
