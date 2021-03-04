import { ApolloError } from "apollo-server-express";
import mongodb from "mongodb";
import { Document } from "mongoose";

import { User, Comment, Task } from "../models";
import { CommentType } from "../types/type";

const ObjectID = mongodb.ObjectID;

export const commentResolvers = {
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
    createComment: async (parent: any, args: any): Promise<any> => {
      const userIsFind = await User.findById(args.input.user);
      const taskIsFind = await Task.findById(args.input.task);

      try {
        const newComment: CommentType = {
          _id: new ObjectID(),
          user: args.input.user,
          task: args.input.task,
          content: args.input.content,
          creation_date: Date.now(),
        };
        const response = await Comment.create(newComment);
        return response;
      } catch {
        if (!userIsFind) {
          throw new ApolloError("User not found", "USER_NOT_FOUND");
        } else if (!taskIsFind) {
          throw new ApolloError("Task not found", "TASK_NOT_FOUND");
        }
      }
    },

    // Mutation for update a comment
    updateComment: async (parent: any, args: any): Promise<any> => {
      let commentIsFind = await Comment.findById(args._id);

      try {
        const filter = { _id: commentIsFind };
        const update = { content: args.input.content };

        await Comment.updateOne(filter, update);
        commentIsFind = await Comment.findById(args._id);
        return commentIsFind;
      } catch {
        throw new ApolloError("Comment not found", "COMMENT_NOT_FOUND");
      }
    },

    deleteComment: async (parent: any, args: any): Promise<any> => {
      const commentIsFind = await Comment.findById(args._id);

      try {
        await Comment.deleteOne({ _id: commentIsFind?._id });
        return commentIsFind;
      } catch {
        throw new ApolloError("Comment not found", "COMMENT_NOT_FOUND");
      }
    },
  },
};
