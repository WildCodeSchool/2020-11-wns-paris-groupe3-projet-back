import { createTestClient } from 'apollo-server-testing';
import { connect, closeDatabase, clearDatabase }from './mongo/config_db_testing';

import { getApolloServer } from './server';
import { Task } from './models/task';

describe('Apollo server', () => {
  let mutate: any;
  beforeEach(async () => {
    await connect();
    const testClient = createTestClient(await getApolloServer());
    mutate = testClient.mutate;
  });

  afterEach(async () => {
    await clearDatabase();
    await closeDatabase()
  });
  
  describe('mutation task', () => {
    it('creates and returns a new task', async () => {
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
              title
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
          end: "20/12/2020"
        },
      });
    })
  })
});
