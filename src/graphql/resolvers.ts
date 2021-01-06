import mongodb from "mongodb";
import { Document } from "mongoose";
import { Task } from "../models/task";
import { User } from "../models/user";
import { Role } from "../models/role";
import { Speciality } from "../models/speciality";
import { ErrorType, TaskType, UserType } from "allTypes";
import { createError, formatError } from "apollo-errors";
import { GraphQLError } from "graphql";
import { ApolloError } from "apollo-server-express";

// Permet de générer des objectID aléatoire
const ObjectID = mongodb.ObjectID;

const resolvers = {
  Query: {
    // Récupére un utilisateur via son ID
    userById: async (parent: any, args: any): Promise<any> =>
      await User.findById(args.id).exec(),
    // Récupére une tâche via son ID
    taskById: async (parent: any, args: any): Promise<any> =>
      await Task.findById(args.id).exec(),
    // Récupére tous les users de la db
    users: async (): Promise<Document[]> => await User.find({}).exec(),
    // Récupére toutes les tâches de la db
    tasks: async (): Promise<Document[]> => await Task.find({}).exec(),
    // Récupére tout les rôles (Student/Teacher/Admin) de la db
    roles: async (): Promise<Document[]> => await Role.find({}).exec(),
    // Récupére toutes les spécialités (Matières) de la db
    specialities: async (): Promise<Document[]> =>
      await Speciality.find({}).exec(),

    // Récupére toutes les tâches d'un utilisateur via son ID
    allTasksByUser: async (
      parent: any,
      args: any,
      context: any,
      info: any
    ): Promise<Document[]> => {
      let allTasks: any = await Task.find({
        users: { $elemMatch: { $eq: args.id } },
      });
      return allTasks;
    },
  },

  // Définition du resolver nécessaire pour récupérer les infos des utilisateurs liés à une tâche
  Task: {
    users: async (
      parent: any,
      args: any,
      context: any,
      info: any
    ): Promise<Document[]> => {
      let task: any = await Task.findById(parent.id);
      let allUserForTask: any = await User.find({ _id: { $in: task.users } });
      return allUserForTask;
    },
  },

  // Définition du resolver permettant de récupérer le role d'un utilisateur
  User: {
    role: async (
      parent: any,
      args: any,
      context: any,
      info: any
    ): Promise<any> => {
      let currentUser: any = await User.findById(parent.id);
      let roleUser: any = await Role.findById(currentUser.role);
      return roleUser;
    },
  },

  Mutation: {
    // Mutation qui permet de créer un utilisateur
    createUser: async (parent: any, args: any): Promise<Document> => {
      try {
        //  Find by Id (args.input.role) si n'est pas trouvé , renvoyer une erreur
        //  Find by Id (args.input.speciality) si n'est pas trouvé , renvoyer une erreur
        // sinon les données de l'utilisateur sont valides on peut le créer.
        const roleIsFind = await Role.findById(args.input.role);

        if (!roleIsFind?._id) {
          console.log("Erreur");
          throw new GraphQLError("Role non trouvé");
        } else {
          const newUser: UserType = {
            _id: new ObjectID(),
            username: args.input.username,
            role: args.input.role,
            speciality: args.input.speciality,
          };
          //  On stock dans response , le résultat attendu de la création a partir du model User.
          //  et avec les paramètres contenu dans newUser
          const response = await User.create(newUser);
          return response;
        }
      } catch (e) {
        return e.message;
      }
    },

    // Mutation permettant de créer une tâche
    createTask: async (parent: any, args: any): Promise<Document> => {
      console.log("args", args);
      try {
        // 0n définit ce qui va correspondre à une nouvelle tâche et on le stock dans la variable newTask
        const newTask: TaskType = {
          _id: new ObjectID(),
          taskname: args.input.taskname,
          creation_date: Date.now(),
          users: args.input.users,
        };
        //  On stock dans response , le résultat attendu de la création a partir du model Task.
        //  et avec les paramètres contenu dans newTask
        const response = await Task.create(newTask);
        return response;
      } catch (e) {
        return e.message;
      }
    },
  },
};

export default resolvers;
