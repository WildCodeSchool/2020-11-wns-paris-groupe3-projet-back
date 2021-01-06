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

  describe("mutation task", () => {
    it("creates and returns a new task", async () => {
      const response = await mutate({
        mutation: `
          mutation {
            createTask(
              input: {
                title: "Maths"
                start: "12/12/2020"
                end: "20/12/2020"
              }
            ) {
              titl
              start
              end
            }
          }
        `,
      });

      expect(await Task.countDocuments()).toEqual(1);
      expect(response.data).toMatchObject({
        createTask: {
          title: "Maths",
          start: "12/12/2020",
          end: "20/12/2020",
        },
      });
    });

    describe("mutation user", () => {
      it("creates and returns a new user", async () => {
        const response = await mutate({
          mutation: `
            mutation {
              createUser(
                input: {
                  name: "Pierre"
                }
              ) {
                name
              }
            }
          `,
        });

        expect(await User.countDocuments()).toEqual(1);
        expect(response.data).toMatchObject({
          createUser: {
            name: "Pierre",
          },
        });
      });
    });
  });

  describe("query users", () => {
    it("returns all users", async () => {
      const user1 = User.create({
        _id: "1",
        name: "Pierre",
      });
      (await user1).save();
      const user2 = User.create({
        _id: "2",
        name: "Julie",
      });
      (await user2).save();

      const response = await query({
        query: `
        {
          users {
            _id
            name
          }
        }
      `,
      });

      expect(response.data).toEqual({
        users: [
          {
            _id: "1",
            name: "Pierre",
          },
          {
            _id: "2",
            name: "Julie",
          },
        ],
      });
    });
  });

  describe("query tasks", () => {
    it("returns all tasks", async () => {
      const task1 = Task.create({
        _id: "1",
        title: "Maths",
        start: "12/12/2020",
        end: "20/12/2020",
      });
      (await task1).save();
      const task2 = Task.create({
        _id: "2",
        title: "Francais",
        start: "12/12/2020",
        end: "20/12/2020",
      });
      (await task2).save();

      const response = await query({
        query: `
        {
          tasks {
            _id
            title
            start
            end
          }
        }
      `,
      });

      expect(response.data).toEqual({
        tasks: [
          {
            _id: "1",
            title: "Maths",
            start: "12/12/2020",
            end: "20/12/2020",
          },
          {
            _id: "2",
            title: "Francais",
            start: "12/12/2020",
            end: "20/12/2020",
          },
        ],
      });
    });
  });
});
