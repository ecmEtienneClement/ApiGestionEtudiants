import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export default (req: Request, res: Response, next) => {
  try {
    const token: string = req.headers.authorization.split(" ")[1];
    const tokenVerify: any = jwt.verify(token, process.env.SECRET_KEY_TOKEN);
    const tokenUserId = tokenVerify.user._id;
    const tokenUserRole = tokenVerify.user._role;
    if (req.query._id && req.query._id !== tokenUserId) {
      throw new Error();
    } else if (req.query.role && req.query.role !== tokenUserRole) {
      throw new Error();
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({
      error,
      message: "Requête non autorisée ! Veillez générer un nouveau token",
    });
  }
};
