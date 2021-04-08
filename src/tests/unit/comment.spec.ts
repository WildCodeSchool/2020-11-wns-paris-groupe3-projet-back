import { createTestClient } from "apollo-server-testing";

import { getApolloServer } from "../../server";
import { Comment, Task, User } from "../../models";

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

  describe("Query for get all comments", () => {
    it("allComments", async () => {
      // Create users for testing query
      const userTestOne = User.create({
        _id: "6ff492076a3476547d8cedde",
        username: "Franck",
      });
      (await userTestOne).save();

      const userTestTwo = User.create({
        _id: "6ff492076a3476547d8ceddf",
        username: "Jérémy",
      });
      (await userTestTwo).save();

      const userTestThree = User.create({
        _id: "606d9ea9f5114b189307dc3f",
        username: "Mick",
      });
      (await userTestThree).save();

      // Create some task for testing query
      const taskTestOne = Task.create({
        _id: "5ff739afc976ff15d97eb12f",
        taskname: "Node Pour Débutant",
      });
      (await taskTestOne).save();

      const TaskTestTwo = Task.create({
        _id: "5ff739afc976ff15d97eb12u",
        taskname: "TS pour nul",
      });
      (await TaskTestTwo).save();

      const TaskTestThree = Task.create({
        _id: "5ff739afc976ff15d97eb55f",
        taskname: "Tache de chocolat",
      });
      (await TaskTestThree).save();

      // Create some comments for testing the result
      const commentOne = Comment.create({
        _id: "5ff492076a3476547d8cedcc",
        user: {
          _id: "6ff492076a3476547d8cedde",
          username: "Franck",
        },
        creation_date: "2021-04-07T12:19:04.833Z",
        task: {
          _id: "5ff739afc976ff15d97eb12f",
          taskname: "Node Pour Débutant",
        },
        content: "Test Commentaire 1",
      });
      (await commentOne).save();

      const commentTwo = Comment.create({
        _id: "5ff492076a3476547d8cehuy",
        user: {
          _id: "6ff492076a3476547d8ceddf",
          username: "Jérémy",
        },
        creation_date: "2021-04-07T12:19:04.832Z",
        task: {
          _id: "5ff739afc976ff15d97eb12u",
          taskname: "TS pour nul",
        },
        content: "Test Commentaire 2",
      });
      (await commentTwo).save();

      const commentThree = Comment.create({
        _id: "5ff492076a3476547d8cedcu",
        user: {
          _id: "606d9ea9f5114b189307dc3f",
          username: "Mick",
        },
        creation_date: "2021-04-07T12:19:04.831Z",
        task: {
          _id: "5ff739afc976ff15d97eb55f",
          taskname: "Tache de chocolat",
        },
        content: "Test Commentaire 3",
      });
      (await commentThree).save();

      const response = await query({
        query: `
        {
          allComments
           {_id , content , creation_date ,
             task{_id , taskname} ,
               user{_id , username}
              }
            }
      `,
      });
      expect(await Comment.countDocuments()).toEqual(3);
      expect(response.data).toEqual({
        allComments: [
          {
            _id: "5ff492076a3476547d8cedcc",
            user: {
              _id: "6ff492076a3476547d8cedde",
              username: "Franck",
            },
            creation_date: "2021-04-07T12:19:04.833Z",
            task: {
              _id: "5ff739afc976ff15d97eb12f",
              taskname: "Node Pour Débutant",
            },
            content: "Test Commentaire 1",
          },
          {
            _id: "5ff492076a3476547d8cedcf",
            user: {
              _id: "6ff492076a3476547d8ceddf",
              username: "Jérémy",
            },
            creation_date: "2021-04-07T12:19:04.832Z",
            task: {
              _id: "5ff739afc976ff15d97eb12u",
              taskname: "TS pour nul",
            },
            content: "Test Commentaire 2",
          },
          {
            _id: "5ff492076a3476547d8cedcu",
            user: {
              _id: "606d9ea9f5114b189307dc3f",
              username: "Mick",
            },
            creation_date: "2021-04-07T12:19:04.831Z",
            task: {
              _id: "5ff739afc976ff15d97eb55f",
              taskname: "Tache de chocolat",
            },
            content: "Test Commentaire 3",
          },
        ],
      });
    });
  });
});
