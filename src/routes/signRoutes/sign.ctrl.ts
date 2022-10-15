import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import ConnexionBd from "../../connexionDb/connexionDb";
import RoutesErrorHelper from "../routesErrorHelper";

// METHODE GET MODEL ADMIN
function getModelAdmin() {
  return ConnexionBd.getSequelizeDb().models.Admin;
}
// METHODE GET MODEL ETUDIANT
function getModelEtudiant() {
  return ConnexionBd.getSequelizeDb().models.Etudiant;
}
//messageNotFound not found 404
let messageNotFound = "Cet utilisateur n'existe pas.";

// METHODE SET MESSAGE NOT FOUND ADMIN
function setMessageNotFoundAdmin() {
  return (messageNotFound = "Cet administrateur n'existe pas.");
}
// METHODE SET MESSAGE NOT FOUND ETUDIANT
function setMessageNotFoundEtudiant() {
  return (messageNotFound = "Cet étudiant n'existe pas.");
}

//TODO POSTE SIGN UP ADMINS OR ETUDIANTS
const signIn = async (req: Request, res: Response) => {
  //Verification si la Requête contient le mdp et email
  if (!req.body.email) {
    return res.status(400).json({
      message: "Désoler votre Requête ne contient pas d'email",
    });
  }
  if (!req.body.mdp) {
    return res.status(400).json({
      message: "Désoler votre Requête ne contient pas de mot de passe",
    });
  }

  const email: string = req.body.email;
  const pswSign: string = req.body.mdp;
  //MODEL
  let model: any;
  if (email.startsWith("$")) {
    model = getModelAdmin();
    setMessageNotFoundAdmin();
  } else {
    model = getModelEtudiant();
    setMessageNotFoundEtudiant();
  }

  try {
    const dataAdminOrEtudiant = await model.findOne({
      where: {
        email: email,
      },
    });
    //USER NOT FOUND
    if (!dataAdminOrEtudiant) {
      res.status(404).json({ messageNotFound });
    } else {
      //
      const psw = dataAdminOrEtudiant.getDataValue("mdp");
      //
      const isTrue: boolean = await bcrypt.compare(pswSign, psw);
      //
      if (!isTrue) {
        res.status(403).json({ message: "Email ou mot de passe incorrect." });
      } else {
        //
        const id: string = dataAdminOrEtudiant.getDataValue("_id");
        const role: string = dataAdminOrEtudiant.getDataValue("role");

        //*******Connexion de l'utilisateur réussit */
        res.status(200).json({
          user_id: id,
          user_role: role,
          token: jwt.sign(
            {
              user: { _id: id, _role: role },
            },
            process.env.SECRET_KEY_TOKEN,
            {
              expiresIn: "72h",
            }
          ),
        });
      }
    }
  } catch (error) {
    RoutesErrorHelper.routesErrors(error, res);
  }
};

const signCtrl = {
  signIn,
};

export default signCtrl;
