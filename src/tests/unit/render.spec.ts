import mongodb from "mongodb";

import { Render } from "../../models";
import { createNewRender } from "../../resolvers/renderResolvers";

describe("Create a new render", () => {
  describe("When we give a task id, a user id and a string result", () => {
    const task = new mongodb.ObjectID();
    const user = new mongodb.ObjectID();
    const result = "myurl";

    it("should returns a new render", async () => {
      await createNewRender(task, user, result);
      expect(await Render.countDocuments()).toEqual(1);
    });
  });
});
