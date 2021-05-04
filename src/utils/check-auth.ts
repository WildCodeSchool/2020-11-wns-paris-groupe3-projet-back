import { AuthenticationError } from "apollo-server-express";
import jwt from "jsonwebtoken";

type Context = {
  req: {
    headers: {
      authorization: string;
    };
  };
};

export const isAuth = (context: Context): any => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET || "");
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired token");
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]");
  }
  throw new Error("Autorization header must be provided");
};
