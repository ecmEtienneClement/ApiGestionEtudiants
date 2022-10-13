import { Response } from "express";

export default class RoutesErrorHelper {
  //TODO
  public static routesErrors(error: Error, res: Response) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      const messageErrors = error.message.split("\n");
      return res.status(400).json({ messageErrors, error });
    } else if (error.name === "SequelizeDatabaseError") {
      return res.status(400).json({
        error,
        message:
          "Une erreur c'est produite veillez vérifier les données saisis.",
      });
    } else {
      return res.status(500).json({
        error,
        message:
          "Une erreur c'est produite veillez réessayer dans quelques instant ...",
      });
    }
  }
}
