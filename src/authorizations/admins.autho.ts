import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export default (req: Request, res: Response, next) => {
  try {
    const token: string = req.headers.authorization.split(" ")[1];
    const tokenVerify: any = jwt.verify(token, process.env.SECRET_KEY_TOKEN);
    const tokenUserRole = tokenVerify.user._role;
    if (tokenUserRole !== "admin") {
      throw new Error();
    } else {
      next();
    }
  } catch (error) {
    res.status(403).json({
      error,
      message:
        "Requête non autorisée ! Vous n'ête pas autorisé a éffectuer cette action",
    });
  }
};
