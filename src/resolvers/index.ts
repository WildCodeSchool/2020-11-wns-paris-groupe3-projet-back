import { merge } from "lodash";

import { userResolvers } from "./userResolvers";
import { taskResolvers } from "./taskResolvers";
import { taskAssignationResolvers } from "./taskAssignationResolvers";
import { classroomResolvers } from "./classroomResolvers";
import { renderResolvers } from "./renderResolvers";
import { correctionResolvers } from "./correctionResolvers";

const resolvers = merge(
  userResolvers,
  taskResolvers,
  taskAssignationResolvers,
  classroomResolvers,
  renderResolvers,
  correctionResolvers
);

export default resolvers;
