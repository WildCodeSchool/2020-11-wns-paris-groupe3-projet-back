import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongodb from "mongodb";
import { Document } from "mongoose";
import { UserInputError } from "apollo-server-express";

import { validateInputRegister, validateInputLogin } from "../utils/validators";
import { UserType, InputLoginType, InputRegisterType } from "../types/type";
import { User } from "../models";

const ObjectID = mongodb.ObjectID;

const generateToken = (user: UserType) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
    },
    process.env.JWT_SECRET || "",
    {
      expiresIn: "1h",
    }
  );
};

export const createNewUser = (
  firstname: string,
  lastname: string,
  email: string,
  password: string
): Promise<Document> => {
  const newUser: UserType = {
    _id: new ObjectID(),
    firstname,
    lastname,
    email,
    password,
    speciality: null,
    role: null,
    status: false,
    creation_date: Date.now(),
  };
  return User.create(newUser);
};

export const userResolvers = {
  Query: {
    users: async (): Promise<Document[]> =>
      await User.find({}).populate("role").exec(),
  },

  Mutation: {
    login: async (
      parent: undefined,
      { email, password }: InputLoginType
    ): Promise<Document> => {
      const { valid, errors } = validateInputLogin(email, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user: any = await User.findOne({ email }).populate("role").exec();
      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        token,
      };
    },

    register: async (
      parent: undefined,
      {
        input: { firstname, lastname, email, password, confirmPassword },
      }: InputRegisterType
    ): Promise<Document> => {
      const { valid, errors } = validateInputRegister(
        firstname,
        lastname,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ email });
      if (user) {
        throw new UserInputError("Email is already taken", {
          errors: {
            email: "This email is already taken",
          },
        });
      }

      password = await bcrypt.hash(password, 12);
      const newUser: any = await createNewUser(
        firstname,
        lastname,
        email,
        password
      );

      const token = generateToken(newUser);

      return {
        ...newUser._doc,
        token,
      };
    },
  },
};
