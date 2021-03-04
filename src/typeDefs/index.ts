import {
  comment,
  classroom,
  correction,
  grade,
  group,
  user,
  render,
  role,
  speciality,
  task,
  taskAssignation,
} from "./types";
import { mutation } from "./mutation";
import { query } from "./query";
import { shared } from "./shared";

const typeDefs = [
  query,
  mutation,
  shared,
  comment,
  classroom,
  correction,
  grade,
  group,
  user,
  render,
  role,
  speciality,
  task,
  taskAssignation,
];

export default typeDefs;
