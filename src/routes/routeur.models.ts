//

import adminsRoutes from "./adminsRoutes/admins.routes";
import etudiantsRoutes from "./etudiantsRoutes/etudiants.routes";
import coursRoutes from "./coursRoutes/cours.routes";
import filieresRoutes from "./filieresRoutes/filieres.routes";
import niveau_etudesRoute from "./nivoEtudesRoutes/nivoEtudes.routes";
import noteRoutes from "./notesRoutes/notes.routes";
import { Request, Response } from "express";
import signRoutes from "./signRoutes/sign.routes";
import authAutho from "../authorizations/auth.autho";
import adminAutho from "../authorizations/admins.autho";

const routeurModels = (app) => {
  app.get("/", (re: Request, res: Response) => {
    res.json({ data: "BIENVENUE DANS API GESTION ETUDIANTS" });
  });
  app.use("/sign", signRoutes);
  app.use("/admins", authAutho, adminAutho, adminsRoutes);
  app.use("/etudiants", authAutho, etudiantsRoutes);
  app.use("/filieres", authAutho, filieresRoutes);
  app.use("/niveau_etudes", authAutho, niveau_etudesRoute);
  app.use("/cours", authAutho, coursRoutes);
  app.use("/notes", authAutho, noteRoutes);

  //
  app.use("/**", (re: Request, res: Response) => {
    res.status(404).json({ messageNotFound: "ressouce notFound !" });
  });
};

export default routeurModels;
