import { Task } from "../../models";
import { createNewTask } from "../../resolvers/taskResolvers";

describe("Create a new task", () => {
  describe("When we give a string taskname and a string result", () => {
    const taskname = "test tasks";
    const result = "myurl";

    it("should returns a new task", async () => {
      await createNewTask(taskname, result);
      expect(await Task.countDocuments()).toEqual(1);
    });
  });
});
