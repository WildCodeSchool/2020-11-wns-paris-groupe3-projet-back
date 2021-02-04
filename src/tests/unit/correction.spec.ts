import { Correction } from "../../models";
import { createNewCorrection } from "../../resolvers/correctionResolvers";

describe("Create a new correction", () => {
  describe("When we give a task id, a user id and a string result", () => {
    const task = "5ff733bbf763152f69fa4bad";
    const user = "5ff307772a325013a4389fa2";
    const result = "myurl";

    it("should returns a new correction", async () => {
      await createNewCorrection(task, user, result);
      expect(await Correction.countDocuments()).toEqual(1);
    });
  });
});
