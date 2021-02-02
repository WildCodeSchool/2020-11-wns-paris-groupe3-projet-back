import mongodb from "mongodb";
import cloudinary from "cloudinary";

import { Document } from "mongoose";
import { Task } from "../models/task";
import { User } from "../models/user";
import { Render } from "../models/render";
// import { Role } from "../models/role";
// import { Speciality } from "../models/speciality";
// import { Classroom } from "../models/classroom";
// import { ClassroomType, TaskType, UserType } from "allTypes";
// import { ApolloError } from "apollo-server-express";
import { RenderType, TaskType } from "allTypes";

const cloudinaryConfig = () => {
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

// Permet de générer des objectID aléatoire
const ObjectID = mongodb.ObjectID;

const resolvers = {
  Query: {
    // Récupére un utilisateur via son ID
    // userById: async (parent: any, args: any): Promise<any> =>
    //   await User.findById(args.id).exec(),
    // Récupére une tâche via son ID
    // taskById: async (parent: any, args: any): Promise<any> =>
    //   await Task.findById(args.id).exec(),
    // Récupére tous les users de la db
    users: async (): Promise<Document[]> => await User.find({}).exec(),
    // Récupére toutes les tâches de la db
    // tasks: async (): Promise<Document[]> => await Task.find({}).exec(),
    // Récupére tout les rôles (Student/Teacher/Admin) de la db
    // roles: async (): Promise<Document[]> => await Role.find({}).exec(),
    // Récupére toutes les spécialités (Matières) de la db
    // specialities: async (): Promise<Document[]> =>
    //   await Speciality.find({}).exec(),
  },

  // Récupére toutes les tâches d'un utilisateur via son ID
  //   allTasksByUser: async (parent: any, args: any): Promise<Document[]> => {
  //     const allTasks: any = await Task.find({
  //       users: { $elemMatch: { $eq: args.id } },
  //     });
  //     return allTasks;
  //   },
  // },

  // Définition du resolver nécessaire pour récupérer les infos des utilisateurs liés à une tâche
  // Task: {
  //   users: async (parent: any, args: any): Promise<Document[]> => {
  //     const task: any = await Task.findById(parent.id);
  //     const allUserForTask: any = await User.find({ _id: { $in: task.users } });
  //     return allUserForTask;
  //   },
  // },

  // Définition du resolver permettant de récupérer le role d'un utilisateur
  // User: {
  //   role: async (parent: any, args: any): Promise<any> => {
  //     const currentUser: any = await User.findById(parent.id);
  //     const roleUser: any = await Role.findById(currentUser.role);
  //     return roleUser;
  //   },
  // },

  Mutation: {
    // Création d'un rendu :
    createRender: async (parent: any, args: any): Promise<Document> => {
      const newRender: RenderType = {
        _id: new ObjectID(),
        user: args.input.user,
        task: args.input.task,
        url: args.input.url,
        creation_date: Date.now(),
      };
      //  On stock dans response , le résultat attendu de la création a partir du model User.
      //  et avec les paramètres contenu dans newUser
      const response = await Render.create(newRender);
      console.log(args);
      return response;
    },

    createTask: async (parent: any, args: any): Promise<Document> => {
      cloudinaryConfig();
      try {
        const result = await cloudinary.v2.uploader.upload(args.input.url, {
          allowed_formats: ["jpg", "png"],
          folder: "EasyHomeworks",
        });
        const newTask: TaskType = {
          _id: new ObjectID(),
          taskname: args.input.taskname,
          url: result.secure_url,
          creation_date: Date.now(),
          users: args.input.users,
        };
        const response = await Task.create(newTask);
        return response;
      } catch (e) {
        return e.message;
      }
    },

    // Mutation qui permet de créer un utilisateur
    // createUser: async (parent: any, args: any): Promise<Document> => {
    //  Find by Id (args.input.role) si n'est pas trouvé , renvoyer une erreur
    //  Find by Id (args.input.speciality) si n'est pas trouvé , renvoyer une erreur
    // sinon les données de l'utilisateur sont valides on peut le créer.
    //   const roleIsFind = await Role.findById(args.input.role);
    //   const specialityIsFind = await Speciality.findById(args.input.speciality);

    //   if (!roleIsFind?._id) {
    //     console.log("Erreur");
    //     throw new ApolloError("Role non trouvé", "ROLE_NOT_FOUND");
    //   } else if (!specialityIsFind?._id) {
    //     console.log("Erreur");
    //     throw new ApolloError("Spécialité non trouvé", "SPECIALITY_NOT_FOUND");
    //   } else {
    //     const newUser: UserType = {
    //       _id: new ObjectID(),
    //       username: args.input.username,
    //       role: args.input.role,
    //       speciality: args.input.speciality,
    //     };
    //     //  On stock dans response , le résultat attendu de la création a partir du model User.
    //     //  et avec les paramètres contenu dans newUser
    //     const response = await User.create(newUser);
    //     return response;
    //   }
    // },

    // Mutation permettant de créer une classe
    // createClassroom: async (parent: any, args: any): Promise<any> => {
    //   try {
    //     const newClassRoom: ClassroomType = {
    //       _id: new ObjectID(),
    //       classname: args.input.classname,
    //       users: args.input.users,
    //     };

    //     const response = await Classroom.create(newClassRoom);
    //     return response;
    //   } catch (e) {
    //     return e.message;
    //   }
    // },
  },
};

export default resolvers;
