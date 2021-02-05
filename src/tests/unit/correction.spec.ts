import mongodb from "mongodb";

import { Correction } from "../../models";
import { createNewCorrection } from "../../resolvers/correctionResolvers";

describe("Create a new correction", () => {
  describe("When we give a task id, a user id and a string result", () => {
    const task = new mongodb.ObjectID();
    const user = new mongodb.ObjectID();
    const result = "myurl";

    it("should returns a new correction", async () => {
      await createNewCorrection(task, user, result);
      expect(await Correction.countDocuments()).toEqual(1);
    });
  });
});
