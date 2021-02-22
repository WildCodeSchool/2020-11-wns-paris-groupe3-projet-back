import { createTestClient } from "apollo-server-testing";

import { getApolloServer } from "../../server";
import { TaskAssignation, Task, Classroom } from "../../models";

describe("TaskAssignation", () => {
  let query: any;
  beforeEach(async () => {
    const testClient = createTestClient(await getApolloServer());
    query = testClient.query;
  });

  describe("query task assignations", () => {
    it("returns all task assignations", async () => {
      const task1 = Task.create({
        _id: "601eedd63d1d515855169d9e",
        taskname: "React pour les nuls",
        url: "my_url",
        creation_date: "2021-02-17T11:12:00.000Z",
      });
      (await task1).save();
      const task2 = Task.create({
        _id: "601eedd63d13315855169d9e",
        taskname: "Node pour les nuls",
        url: "my_url",
        creation_date: "2021-02-17T11:12:00.000Z",
      });
      (await task2).save();
      const classroom = Classroom.create({
        _id: "601eedd63d1d566855169d9e",
        classname: "Dév Technique",
        users: ["601a727642792911f501be65"],
        creation_date: "2021-02-17T11:12:00.000Z",
      });
      (await classroom).save();
      const taskAssignation1 = TaskAssignation.create({
        _id: "601eedd97d1d515855169d9e",
        task: {
          _id: "601eedd63d1d515855169d9e",
          taskname: "React pour les nuls",
          url: "my_url",
          creation_date: "2021-02-17T11:12:00.000Z",
        },
        end_date: "2021-02-28T11:12:00.000Z",
        affectedTo: {
          _id: "601eedd63d1d566855169d9e",
          classname: "Dév Technique",
          users: ["601a727642792911f501be65"],
          creation_date: "2021-02-17T11:12:00.000Z",
        },
      });
      (await taskAssignation1).save();
      const taskAssignation2 = TaskAssignation.create({
        _id: "5ff492076a3476667d8cedcc",
        task: {
          _id: "601eedd63d13315855169d9e",
          taskname: "Node pour les nuls",
          url: "my_url",
          creation_date: "2021-02-17T11:12:00.000Z",
        },
        end_date: "2021-02-23T11:12:00.000Z",
        affectedTo: {
          _id: "601eedd63d1d566855169d9e",
          classname: "Dév Technique",
          users: ["601a727642792911f501be65"],
          creation_date: "2021-02-17T11:12:00.000Z",
        },
      });
      (await taskAssignation2).save();

      const response = await query({
        query: `
        {
          tasksAssignations {
            _id
            task {
              taskname
            }
            affectedTo {
              classname
            }
          }
        }
      `,
      });
      console.log(response.data.task);
      expect(response.data).toEqual({
        tasksAssignations: [
          {
            _id: "601eedd97d1d515855169d9e",
            task: {
              taskname: "React pour les nuls",
            },
            affectedTo: {
              classname: "Dév Technique",
            },
          },
          {
            _id: "5ff492076a3476667d8cedcc",
            task: {
              taskname: "Node pour les nuls",
            },
            affectedTo: {
              classname: "Dév Technique",
            },
          },
        ],
      });
    });
  });
});
