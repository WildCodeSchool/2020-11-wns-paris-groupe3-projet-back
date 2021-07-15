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

  describe("Mutation to create a comment for a task", () => {
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

  describe("Mutation to update a comment with his ID", () => {
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

  describe("Mutation to delete a comment", () => {
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

  describe("Query to get all comments", () => {
    it("allComments", async () => {
      // Create users to testing query
      const userTestOne = User.create({
        _id: "6ff492076a3476547d8cedde",
        firstname: "Franck",
        lastname: "Ribery",
        email: "fribery@gmail.fr",
        password: "123456",
      });
      (await userTestOne).save();

      const userTestTwo = User.create({
        _id: "6ff492076a3476547d8ceddf",
        firstname: "Sebastien",
        lastname: "Chabal",
        email: "schabal@gmail.fr",
        password: "charaaal",
      });
      (await userTestTwo).save();

      const userTestThree = User.create({
        _id: "606d9ea9f5114b189307dc3f",
        firstname: "Mike",
        lastname: "Tyson",
        email: "mtyson@gmail.fr",
        password: "123456",
      });
      (await userTestThree).save();

      // Create some task to testing query
      const taskTestOne = Task.create({
        _id: "5ff739afc976ff15d97eb12f",
        taskname: "Node Pour Débutant",
        creation_date: "2021-04-07T12:19:04.833Z",
        url: "www.wildcodeschool.fr",
      });
      (await taskTestOne).save();

      const TaskTestTwo = Task.create({
        _id: "601eedd63d1d566855169d9e",
        taskname: "TS pour nul",
        creation_date: "2021-04-07T12:19:04.833Z",
        url: "www.wildcodeschool.fr",
      });
      (await TaskTestTwo).save();

      const TaskTestThree = Task.create({
        _id: "5ff739afc976ff15d97eb55f",
        taskname: "Tache de chocolat",
        creation_date: "2021-04-07T12:19:04.833Z",
        url: "www.wildcodeschool.fr",
      });
      (await TaskTestThree).save();

      // Create some comments to testing the result
      const commentOne = Comment.create({
        _id: "5ff492076a3476547d8cedcc",
        user: {
          _id: "6ff492076a3476547d8cedde",
          firstname: "Franck",
        },
        creation_date: "2021-04-07T12:19:04.833Z",
        task: {
          _id: "5ff739afc976ff15d97eb12f",
          taskname: "Node Pour Débutant",
          creation_date: "2021-04-07T12:19:04.833Z",
          url: "www.wildcodeschool.fr",
        },
        content: "Test Commentaire 1",
      });
      (await commentOne).save();

      const commentTwo = Comment.create({
        _id: "606ebf0aec9fa927191e839f",
        user: {
          _id: "6ff492076a3476547d8ceddf",
          firstname: "Sebastien",
        },
        creation_date: "2021-04-07T12:19:04.832Z",
        task: {
          _id: "601eedd63d1d566855169d9e",
          taskname: "TS pour nul",
          creation_date: "2021-04-07T12:19:04.833Z",
          url: "www.wildcodeschool.fr",
        },
        content: "Test Commentaire 2",
      });
      (await commentTwo).save();

      const commentThree = Comment.create({
        _id: "606db62c2cc14f3911caf667",
        user: {
          _id: "606d9ea9f5114b189307dc3f",
          firstname: "Mike",
        },
        creation_date: "2021-04-07T12:19:04.831Z",
        task: {
          _id: "5ff739afc976ff15d97eb55f",
          taskname: "Tache de chocolat",
          creation_date: "2021-04-07T12:19:04.833Z",
          url: "www.wildcodeschool.fr",
        },
        content: "Test Commentaire 3",
      });
      (await commentThree).save();

      const response = await query({
        query: `
        {
          allComments
            {_id , content , 
              task{_id , taskname} ,
                user{_id , firstname}
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
              firstname: "Franck",
            },
            task: {
              _id: "5ff739afc976ff15d97eb12f",
              taskname: "Node Pour Débutant",
            },
            content: "Test Commentaire 1",
          },
          {
            _id: "606ebf0aec9fa927191e839f",
            user: {
              _id: "6ff492076a3476547d8ceddf",
              firstname: "Sebastien",
            },
            task: {
              _id: "601eedd63d1d566855169d9e",
              taskname: "TS pour nul",
            },
            content: "Test Commentaire 2",
          },
          {
            _id: "606db62c2cc14f3911caf667",
            user: {
              _id: "606d9ea9f5114b189307dc3f",
              firstname: "Mike",
            },
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

  describe("Query to get all comments for one task", () => {
    it("Comments for a task", async () => {
      // Create some tasks for query testing
      const taskTest = Task.create({
        _id: "5ff739afc976ff15d97eb12f",
        taskname: "Node Pour Débutant",
        creation_date: "2021-04-07T12:19:04.833Z",
        url: "www.wildcodeschool.fr",
      });
      (await taskTest).save();

      const userTest = User.create({
        _id: "6ff492076a3476547d8ceddf",
        firstname: "Sebastien",
        lastname: "Chabal",
        email: "schabal@gmail.fr",
        password: "charaaal",
      });
      (await userTest).save();

      // Create some comments to testing the result
      const commentOne = Comment.create({
        _id: "5ff492076a3476547d8cedcc",
        user: {
          _id: "6ff492076a3476547d8ceddf",
          firstname: "Sebastien",
        },
        task: {
          _id: "5ff739afc976ff15d97eb12f",
          taskname: "Node Pour Débutant",
        },
        content: "Test Commentaire 1",
      });
      (await commentOne).save();

      const commentTwo = Comment.create({
        _id: "606ebf0aec9fa927191e839f",
        user: {
          _id: "6ff492076a3476547d8ceddf",
          firstname: "Sebastien",
        },
        task: {
          _id: "5ff739afc976ff15d97eb12f",
          taskname: "Node Pour Débutant",
        },
        content: "Test Commentaire 2",
      });
      (await commentTwo).save();

      const commentThree = Comment.create({
        _id: "606db62c2cc14f3911caf667",
        user: {
          _id: "6ff492076a3476547d8ceddf",
          firstname: "Sebastien",
        },
        task: {
          _id: "5ff739afc976ff15d97eb12f",
          taskname: "Node Pour Débutant",
        },
        content: "Test Commentaire 3",
      });
      (await commentThree).save();

      const response = await query({
        query: `
        {
          allCommentsForOneTask(_id : "5ff739afc976ff15d97eb12f")
        {
          _id, content,
            user{_id, firstname},
              task{_id,taskname}
        }
      }
      `,
      });

      expect(await Comment.countDocuments()).toEqual(3);
      expect(response.data).toEqual({
        allCommentsForOneTask: [
          {
            _id: "5ff492076a3476547d8cedcc",
            user: {
              _id: "6ff492076a3476547d8ceddf",
              firstname: "Sebastien",
            },
            task: {
              _id: "5ff739afc976ff15d97eb12f",
              taskname: "Node Pour Débutant",
            },
            content: "Test Commentaire 1",
          },
          {
            _id: "606ebf0aec9fa927191e839f",
            user: {
              _id: "6ff492076a3476547d8ceddf",
              firstname: "Sebastien",
            },
            task: {
              _id: "5ff739afc976ff15d97eb12f",
              taskname: "Node Pour Débutant",
            },
            content: "Test Commentaire 2",
          },
          {
            _id: "606db62c2cc14f3911caf667",
            user: {
              _id: "6ff492076a3476547d8ceddf",
              firstname: "Sebastien",
            },
            task: {
              _id: "5ff739afc976ff15d97eb12f",
              taskname: "Node Pour Débutant",
            },
            content: "Test Commentaire 3",
          },
        ],
      });
    });
  });
});
