import mongodb from "mongodb";
import { Document } from "mongoose";
import { Task } from "../models/task";
import { User } from "../models/user";
import { Role } from "../models/role";
import { Speciality } from "../models/speciality";
import { ClassroomType, CommentType, TaskType, UserType } from "allTypes";
import { ApolloError } from "apollo-server-express";
import { Classroom } from "../models/classroom";
import { Comment } from "../models/comment";

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
    allTasksByUser: async (parent: any, args: any): Promise<Document[]> => {
      const allTasks: any = await Task.find({
        users: { $elemMatch: { $eq: args.id } },
      });
      return allTasks;
    },
  },

  // Définition du resolver nécessaire pour récupérer les infos des utilisateurs liés à une tâche
  Task: {
    users: async (parent: any, args: any): Promise<Document[]> => {
      const task: any = await Task.findById(parent.id);
      const allUserForTask: any = await User.find({ _id: { $in: task.users } });
      return allUserForTask;
    },
  },

  // Définition du resolver permettant de récupérer le role d'un utilisateur
  User: {
    role: async (parent: any, args: any): Promise<any> => {
      const currentUser: any = await User.findById(parent.id);
      const roleUser: any = await Role.findById(currentUser.role);
      return roleUser;
    },
  },

  // Resolver for get data of tasks and User when the Comment is Create
  Comment: {
    task: async (parent: any, args: any): Promise<Document[]> => {
      const task: any = await Task.findById(parent.task);
      return task;
    },
    user: async (parent: any, args: any): Promise<Document[]> => {
      const user: any = await User.findById(parent.user);
      return user;
    },
  },

  Mutation: {
    // Mutation qui permet de créer un utilisateur
    createUser: async (parent: any, args: any): Promise<Document> => {
      //  Find by Id (args.input.role) si n'est pas trouvé , renvoyer une erreur
      //  Find by Id (args.input.speciality) si n'est pas trouvé , renvoyer une erreur
      // sinon les données de l'utilisateur sont valides on peut le créer.
      const roleIsFind = await Role.findById(args.input.role);
      const specialityIsFind = await Speciality.findById(args.input.speciality);

      if (!roleIsFind?._id) {
        console.log("Erreur");
        throw new ApolloError("Role non trouvé", "ROLE_NOT_FOUND");
      } else if (!specialityIsFind?._id) {
        console.log("Erreur");
        throw new ApolloError("Spécialité non trouvé", "SPECIALITY_NOT_FOUND");
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
    },

    // Mutation for create a comment for a Task
    createComment: async (parent: any, args: any): Promise<any> => {
      const userIsFind = await User.findById(args.input.user);
      const taskIsFind = await Task.findById(args.input.task);

      if (!userIsFind?._id) {
        throw new ApolloError("User not found", "USER_NOT_FOUND");
      } else if (!taskIsFind?._id) {
        throw new ApolloError("Task not found", "TASK_NOT_FOUND");
      } else {
        const newComment: CommentType = {
          _id: new ObjectID(),
          user: args.input.user,
          task: args.input.task,
          content: args.input.content,
          creation_date: Date.now(),
        };
        const response = await Comment.create(newComment);
        return response;
      }
    },

    updateComment: async (parent: any, args: any): Promise<any> => {
      let commentIsFind = await Comment.findById(args.id);

      if (!commentIsFind?._id) {
        throw new ApolloError("Comment not found", "COMMENT_NOT_FOUND");
      } else {
        const filter = { _id: commentIsFind };
        const update = { content: args.input.content };

        await Comment.updateOne(filter, update);

        commentIsFind = await Comment.findById(args.id);

        return commentIsFind;
      }
    },

    // Mutation permettant de créer une classe
    createClassroom: async (parent: any, args: any): Promise<any> => {
      try {
        const newClassRoom: ClassroomType = {
          _id: new ObjectID(),
          classname: args.input.classname,
          users: args.input.users,
        };

        const response = await Classroom.create(newClassRoom);
        return response;
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
