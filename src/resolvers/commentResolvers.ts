import { ApolloError } from "apollo-server-express";
import mongodb from "mongodb";
import { Document } from "mongoose";

import { User, Comment, Task } from "../models";
import {
  CommentType,
  DeleteCommentType,
  InputCommentType,
  InputUpdateCommentType,
  TaskType,
  UserType,
} from "../types/type";

const ObjectID = mongodb.ObjectID;

export const commentResolvers = {
  Comment: {
    task: async (
      parent: CommentType,
      args: undefined
    ): Promise<Document | null> => {
      const task: TaskType | Document | null = await Task.findById(parent.task);

      return task;
    },
    user: async (
      parent: CommentType,
      args: undefined
    ): Promise<Document | null> => {
      const user: UserType | Document | null = await User.findById(parent.user);

      return user;
    },
  },

  Query: {
    allComments: async (): Promise<Document[]> =>
      await Comment.find({}).populate("user").populate("task").exec(),
    allCommentsForOneTask: async (
      parent: undefined,
      args: CommentType
    ): Promise<Document[]> => {
      // Final Array of comments is empty for start
      let finalArrayOfComments: Document[] = [];

      // Get id of task selected
      const idTaskSelected: mongodb.ObjectID = args._id;

      // Get all Comments where id of task is equal to variable idTaskSelected
      finalArrayOfComments = await Comment.find({
        task: { $eq: idTaskSelected },
      });

      // Return Array Filtered with all comments for the task
      return finalArrayOfComments;
    },
  },

  Mutation: {
    createComment: async (
      parent: undefined,
      { input: { user, task, content } }: InputCommentType
    ): Promise<Document | undefined> => {
      const userIsFind: UserType | Document | null = await User.findById(user);
      const taskIsFind: TaskType | Document | null = await Task.findById(task);

      try {
        const newComment: CommentType = {
          _id: new ObjectID(),
          user: user,
          task: task,
          content: content,
          creation_date: Date.now(),
        };
        const response: Document = await Comment.create(newComment);
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
    updateComment: async (
      parent: undefined,
      { _id, input: { content } }: InputUpdateCommentType
    ): Promise<Document | null> => {
      let commentIsFind: CommentType | Document | null = await Comment.findById(
        _id
      );

      try {
        const filter = { _id: commentIsFind };
        const update = { content: content };

        await Comment.updateOne(filter, update);
        commentIsFind = await Comment.findById(_id);
        return commentIsFind;
      } catch {
        throw new ApolloError("Comment not found", "COMMENT_NOT_FOUND");
      }
    },

    deleteComment: async (
      parent: undefined,
      { _id }: DeleteCommentType
    ): Promise<Document | null> => {
      const commentIsFind:
        | CommentType
        | Document
        | null = await Comment.findById(_id);

      try {
        await Comment.deleteOne({ _id: commentIsFind?._id });
        return commentIsFind;
      } catch {
        throw new ApolloError("Comment not found", "COMMENT_NOT_FOUND");
      }
    },
  },
};
