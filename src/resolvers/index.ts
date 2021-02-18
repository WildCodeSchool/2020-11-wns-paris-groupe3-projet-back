import { merge } from "lodash";

import { userResolvers } from "./userResolvers";
import { taskResolvers } from "./taskResolvers";
import { taskAssignationResolvers } from "./taskAssignationResolvers";
import { classroomResolvers } from "./classroomResolvers";

const resolvers = merge(
  userResolvers,
  taskResolvers,
  taskAssignationResolvers,
  classroomResolvers
);

export default resolvers;
