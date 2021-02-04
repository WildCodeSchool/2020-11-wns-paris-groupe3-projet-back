import { merge } from "lodash";

import { userResolvers } from "./userResolvers";
import { taskResolvers } from "./taskResolvers";

const resolvers = merge(userResolvers, taskResolvers);

export default resolvers;
