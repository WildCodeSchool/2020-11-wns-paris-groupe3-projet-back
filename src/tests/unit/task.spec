import { createTestClient } from "apollo-server-testing";

import { getApolloServer } from "../../server";
import { Task } from "../../models";

describe("Creation of a new task", () => {
  let mutate: any;
  beforeAll(async () => {
    const testClient = createTestClient(await getApolloServer());
    mutate = testClient.query;
  });

  it("returns a task", async () => {
    const response = await mutate({
      mutation: `
        mutation {
          createTask(
            input: {
              taskname:  "React for dummies"
              url: "https://res.cloudinary.com/easyhomeworks/image/upload/v1612305515/EasyHomeworks/pjfdxgfbl0jkyl7f9ymw.png"
              user: "5ff492076a3476547d8cedcc"
            }
          ) {
              taskname
              url
              user { _id }
            }
        }
      `
    });

    expect(await Task.countDocuments()).toEqual(1);
    expect(response.data).toMatchObject({
      createTask: {
        taskname: "React for dummies",
        url: "https://res.cloudinary.com/easyhomeworks/image/upload/v1612305515/EasyHomeworks/pjfdxgfbl0jkyl7f9ymw.png",
        user: { _id: "5ff492076a3476547d8cedcc" }
      },
    });
  });
});
