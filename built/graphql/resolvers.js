"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = __importDefault(require("mongodb"));
const task_1 = require("../models/task");
const users_1 = require("../models/users");
const ObjectID = mongodb_1.default.ObjectID;
const resolvers = {
    Query: {
        getUsers: async () => await users_1.User.find({}).exec(),
        allTasks: async () => await task_1.Task.find({}).exec(),
    },
    Mutation: {
        createTask: async (args) => {
            try {
                const newTask = {
                    title: args.input.title,
                    start: args.input.start,
                    end: args.input.end,
                    _id: new ObjectID(),
                };
                const response = await task_1.Task.create(newTask);
                return response;
            }
            catch (e) {
                return e.message;
            }
        },
    },
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map