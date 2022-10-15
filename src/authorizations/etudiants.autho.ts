import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export default (req: Request, res: Response, next) => {
  try {
    const token: string = req.headers.authorization.split(" ")[1];
    const tokenVerify: any = jwt.verify(token, process.env.SECRET_KEY_TOKEN);
    const tokenUserId = tokenVerify.user._id;
    const _idParam = req.params._id;
    if (tokenUserId !== _idParam) {
      throw new Error();
    } else {
      next();
    }
  } catch (error) {
    res.status(403).json({
      error,
      message:
        "Vous n'avez pas le droit de consulter les informations d'un étudiant",
    });
  }
};
