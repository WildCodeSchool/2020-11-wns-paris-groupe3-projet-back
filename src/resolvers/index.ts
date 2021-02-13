import { merge } from "lodash";

import { userResolvers } from "./userResolvers";
import { taskResolvers } from "./taskResolvers";
import { taskAssignationResolvers } from "./taskAssignationResolvers";

const resolvers = merge(userResolvers, taskResolvers, taskAssignationResolvers);

export default resolvers;
