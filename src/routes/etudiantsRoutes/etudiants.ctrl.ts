import { Request, Response } from "express";
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
  //MODEL
  const etudiant = getModelEtudiant();
  try {
    const dataEtudiant = await etudiant.create({ ...req.body });
    res.status(200).json(dataEtudiant);
  } catch (error) {
    RoutesErrorHelper.routesErrors(error, res);
  }
};

//TODO GET ALL ETUDIANTS
const getAllEtudiants = async (req: Request, res: Response) => {
  //MODEL
  const etudiant = getModelEtudiant();
  try {
    const dataEtudiants = await etudiant.findAll();
    res.status(200).json(dataEtudiants);
  } catch (error) {
    RoutesErrorHelper.routesErrors(error, res);
  }
};

//TODO GET ETUDIANT BY ID
const getEtudiantById = async (req: Request, res: Response) => {
  //MODEL
  const etudiant = getModelEtudiant();
  try {
    const id = req.params._id;
    const dataEtudiantById = await etudiant.findByPk(id);
    if (!dataEtudiantById) {
      res.status(404).json({ messageNotFound });
    } else {
      res.status(200).json(dataEtudiantById);
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
  deleteEtudiantById,
  deleteAllEtudiants,
};

//TODO
export default EtudiantsCtrl;
