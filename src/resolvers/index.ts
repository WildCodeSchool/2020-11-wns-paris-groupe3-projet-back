import { merge } from "lodash";

import { userResolvers } from "./userResolvers";
import { taskResolvers } from "./taskResolvers";
import { renderResolvers } from "./renderResolvers";
import { correctionResolvers } from "./correctionResolvers";

const resolvers = merge(
  userResolvers,
  taskResolvers,
  renderResolvers,
  correctionResolvers
);

export default resolvers;
