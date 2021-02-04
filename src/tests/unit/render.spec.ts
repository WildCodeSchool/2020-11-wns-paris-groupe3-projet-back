import { Render } from "../../models";
import { createNewRender } from "../../resolvers/renderResolvers";

describe("Create a new render", () => {
  describe("When we give a task id, a user id and a string result", () => {
    const task = "5ff733bbf763152f69fa4bad";
    const user = "5ff307772a325013a4389fa2";
    const result = "myurl";

    it("should returns a new render", async () => {
      await createNewRender(task, user, result);
      expect(await Render.countDocuments()).toEqual(1);
    });
  });
});
