import {
  connect,
  closeDatabase,
  clearDatabase,
} from "../mongo/config_db_testing";

beforeAll(async () => {
  await connect();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeDatabase();
});
