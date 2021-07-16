import { createTestClient } from "apollo-server-testing";

import { getApolloServer } from "../../server";
import { User, Classroom } from "../../models";

describe("Classroom", () => {
  let query: any;
  beforeEach(async () => {
    const testClient = createTestClient(await getApolloServer());
    query = testClient.query;
  });

  describe("query classrooms", () => {
    it("returns all classrooms", async () => {
      const user1 = User.create({
        _id: "5ff307772a325013a4389fa2",
        firstname: "Pierre",
        lastname: "Dupond",
        email: "p@email.com",
        password: "123456",
        role: "5fdb76f200e2c95340a59cc9",
        speciality: "5fdb812a00e2c95340a59ccb",
      });
      (await user1).save();
      const user2 = User.create({
        _id: "5ff4816d653ab339a84574a6",
        firstname: "Julie",
        lastname: "Durand",
        email: "j@email.com",
        password: "123456",
        role: "5fdb76f200e2c95340a59cc9",
        speciality: "5fdb812a00e2c95340a59ccb",
      });
      (await user2).save();
      const classroom1 = Classroom.create({
        _id: "601eedd63d1d515855169d9e",
        classname: "React",
        users: ["5ff307772a325013a4389fa2", "5ff4816d653ab339a84574a6"],
      });
      (await classroom1).save();

      const response = await query({
        query: `
          {
            classrooms {
              _id
              classname
              users {
                _id
                firstname
                lastname
              }
            }
          }
        `,
      });

      expect(response.data).toEqual({
        classrooms: [
          {
            _id: "601eedd63d1d515855169d9e",
            classname: "React",
            users: [
              {
                _id: "5ff307772a325013a4389fa2",
                firstname: "Pierre",
                lastname: "Dupond",
              },
              {
                _id: "5ff4816d653ab339a84574a6",
                firstname: "Julie",
                lastname: "Durand",
              },
            ],
          },
        ],
      });
    });
  });
});
