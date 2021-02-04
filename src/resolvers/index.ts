import { merge } from "lodash";
import { commentResolvers } from "./commentResolvers";
import { userResolvers } from "./userResolvers";
import { taskResolvers } from "./taskResolvers";

const resolvers = merge(userResolvers, taskResolvers, commentResolvers);

export default resolvers;
