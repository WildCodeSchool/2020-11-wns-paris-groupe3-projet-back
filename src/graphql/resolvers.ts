import mongodb from "mongodb";
import { Document } from "mongoose";
import { Task } from "../models/task";
import { User } from "../models/user";
import { Role } from "../models/role";
import { Speciality } from "../models/speciality";
import { ApolloError } from "apollo-server-express";
import { UserType } from "allTypes";

// Permet de générer des objectID aléatoire
const ObjectID = mongodb.ObjectID;

const resolvers = {
  Query: {
    // Récupére tous les users de la db
    users: async (): Promise<Document[]> => await User.find({}).exec(),
    // Récupére toutes les tâches de la db
    tasks: async (): Promise<Document[]> => await Task.find({}).exec(),
    // Récupére tout les rôles (Student/Teacher/Admin) de la db
    roles: async (): Promise<Document[]> => await Role.find({}).exec(),
    // Récupére toutes les spécialités (Matières) de la db
    specialities: async (): Promise<Document[]> =>
      await Speciality.find({}).exec(),
  },

  Mutation: {
    // Mutation qui permet de créer un utilisateur
    createUser: async (parent: any, args: any): Promise<Document> => {
      console.log("Args", args);

      const find = await Role.findById("5fdb766b00e2c95340a59cc8");

      if (!!find) {
        throw new ApolloError(
          "The x-api-key:12345 doesn't have sufficient privileges."
        );
      }

      console.log("Find", find);
      //  Find by Id (args.input.role) si n'est pas trouvé , renvoyer une erreur
      //  Find by Id (args.input.speciality) si n'est pas trouvé , renvoyer une erreur
      // sinon les données de l'utilisateur sont valides on peut le créer.
      try {
        // On définit un nouvel utilisateur avec ses diffèrents attributs (Id générer automatiquement)
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
      } catch (e) {
        return e.message;
      }
    },

    // Mutation permettant de créer une tâche
    createTask: async (parent: any, args: any): Promise<Document> => {
      console.log(parent);
      try {
        // 0n définit ce qui va correspondre à une nouvelle tâche et on le stock dans la variable newTask
        const newTask = {
          _id: new ObjectID(),
          taskname: args.input.taskname,
          creation_date: args.input.creation_date,
          user_id: new ObjectID(),
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
