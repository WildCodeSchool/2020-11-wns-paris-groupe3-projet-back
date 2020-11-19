import { Task } from "../models/task";
import { User } from "../models/users";
var ObjectID = require("mongodb").ObjectID;

const resolvers = {
  Query: {
    getUsers: async () => await User.find({}).exec(),
    allTasks: async () => await Task.find({}).exec(),
  },
  Mutation: {
    createTask: async (parent, args, context, info) => {
      try {
        let newTask = {
          title: args.input.title,
          start: args.input.start,
          end: args.input.end,
          _id: new ObjectID(),
        };
        let response = await Task.create(newTask);
        return response;
      } catch (e) {
        return e.message;
      }
    },
  },
};

export default resolvers;
