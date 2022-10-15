import { Request, Response } from "express";
import bcrypt from "bcrypt";
import ConnexionBd from "../../connexionDb/connexionDb";
import RoutesErrorHelper from "../routesErrorHelper";

// METHODE GET MODEL ADMIN
function getModelEtudiant() {
  return ConnexionBd.getSequelizeDb().models.Etudiant;
}
//messageNotFound not found 404
const messageNotFound = "Cet étudiant n'existe pas.";

//******************************     METHODES        ******************************** */

//TODO POSTE CREATE ETUDIANT
const createEtudiant = async (req: Request, res: Response) => {
  if (!req.body.mdp) {
    return res.status(400).json({
      message: "Désoler votre Requête ne contient pas de mot de passe",
    });
  }
  const isValid: boolean = RoutesErrorHelper.pwdIsValid(req.body.mdp, res);
  if (!isValid) {
    return false;
  }
  //MODEL
  const etudiant = getModelEtudiant();
  const psw: string = req.body.mdp;
  try {
    const pswHash: string = await bcrypt.hash(psw, 10);
    const dataEtudiant = await etudiant.create({ ...req.body, mdp: pswHash });
    res.status(200).json(dataEtudiant);
  } catch (error) {
    RoutesErrorHelper.routesErrors(error, res);
  }
};

//TODO GET ALL ETUDIANTS
const getAllEtudiants = async (req: Request, res: Response) => {
  //MODEL
  const etudiant = getModelEtudiant();
  const filiere = ConnexionBd.getSequelizeDb().models.Filiere;
  const nivoEtude = ConnexionBd.getSequelizeDb().models.NivoEtude;
  const notes = ConnexionBd.getSequelizeDb().models.Note;

  try {
    const dataEtudiants = await etudiant.findAll({
      include: [filiere, nivoEtude, notes],
    });
    res.status(200).json(dataEtudiants);
  } catch (error) {
    RoutesErrorHelper.routesErrors(error, res);
  }
};

//TODO GET ETUDIANT BY ID
const getEtudiantById = async (req: Request, res: Response) => {
  //MODEL
  const etudiant = getModelEtudiant();
  const filiere = ConnexionBd.getSequelizeDb().models.Filiere;
  const nivoEtude = ConnexionBd.getSequelizeDb().models.NivoEtude;
  const notes = ConnexionBd.getSequelizeDb().models.Note;

  try {
    const id = req.params._id;
    const dataEtudiantById = await etudiant.findByPk(id, {
      include: [filiere, nivoEtude, notes],
    });

    if (!dataEtudiantById) {
      return res.status(404).json({ messageNotFound });
    } else {
      return res.status(200).json(dataEtudiantById);
    }
  } catch (error) {
    RoutesErrorHelper.routesErrors(error, res);
  }
};

//TODO UPDATE ETUDIANT
const updateEtudiantById = async (req: Request, res: Response) => {
  //MODEL
  const etudiant = getModelEtudiant();
  try {
    const id = req.params._id;
    const dataEtudiantById = await etudiant.findByPk(id);
    if (!dataEtudiantById) {
      res.status(404).json({ messageNotFound });
    } else {
      await etudiant.update({ ...req.body }, { where: { _id: id } });
      res.status(200).json(true);
    }
  } catch (error) {
    RoutesErrorHelper.routesErrors(error, res);
  }
};

//TODO UPDATE PWD ETUDIANT
const updatePwdEtudiantById = async (req: Request, res: Response) => {
  //Verification si la Requête contient le mdp
  if (!req.body.mdp) {
    return res.status(400).json({
      message: "Désoler votre Requête ne contient pas de mot de passe",
    });
  }
  //MODEL
  const etudiant = getModelEtudiant();
  try {
    const id = req.params._id;
    const dataEtudiantById = await etudiant.findByPk(id);
    if (!dataEtudiantById) {
      res.status(404).json({ messageNotFound });
    } else {
      const pwd = req.body.mdp;
      const pwdHash: string = await bcrypt.hash(pwd, 10);
      await etudiant.update(
        { ...req.body, mdp: pwdHash },
        { where: { _id: id } }
      );
      res.status(200).json(true);
    }
  } catch (error) {
    RoutesErrorHelper.routesErrors(error, res);
  }
};

//TODO DELETE ETUDIANT
const deleteEtudiantById = async (req: Request, res: Response) => {
  //MODEL
  const etudiant = getModelEtudiant();
  try {
    const id = req.params._id;
    const dataEtudiantById = await etudiant.findByPk(id);
    if (!dataEtudiantById) {
      res.status(404).json({ messageNotFound });
    } else {
      await dataEtudiantById.destroy();
      res.status(200).json(true);
    }
  } catch (error) {
    RoutesErrorHelper.routesErrors(error, res);
  }
};

//TODO DELETE ALL Etudiants
const deleteAllEtudiants = async (req: Request, res: Response) => {
  //MODEL
  const etudiant = getModelEtudiant();
  try {
    await etudiant.drop();
    res.status(200).json(true);
  } catch (error) {
    RoutesErrorHelper.routesErrors(error, res);
  }
};

//******************************   FIN  METHODES        ******************************** */
//MODEL CTRL A EXPOTE
const EtudiantsCtrl = {
  createEtudiant,
  getAllEtudiants,
  getEtudiantById,
  updateEtudiantById,
  updatePwdEtudiantById,
  deleteEtudiantById,
  deleteAllEtudiants,
};

//TODO
export default EtudiantsCtrl;
