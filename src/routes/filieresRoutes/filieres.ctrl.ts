import { Request, Response } from "express";
import ConnexionBd from "../../connexionDb/connexionDb";
import RoutesErrorHelper from "../routesErrorHelper";

// METHODE GET MODEL ADMIN
function getModelFiliere() {
  return ConnexionBd.getSequelizeDb().models.Filiere;
}
//messageNotFound not found 404
const messageNotFound = "Ce filiere n'existe pas.";

//******************************     METHODES        ******************************** */

//TODO POSTE CREATE FILIERE
const createFiliere = async (req: Request, res: Response) => {
  //MODEL
  const filiere = getModelFiliere();
  try {
    const dataFiliere = await filiere.create({ ...req.body });
    res.status(200).json(dataFiliere);
  } catch (error) {
    RoutesErrorHelper.routesErrors(error, res);
  }
};

//TODO GET ALL FILIERE
const getAllFilieres = async (req: Request, res: Response) => {
  //MODEL
  const filiere = getModelFiliere();
  const cours = ConnexionBd.getSequelizeDb().models.Cour;
  const etudiants = ConnexionBd.getSequelizeDb().models.Etudiant;

  try {
    const dataFilieres = await filiere.findAll({
      include: [cours, etudiants],
    });
    res.status(200).json(dataFilieres);
  } catch (error) {
    RoutesErrorHelper.routesErrors(error, res);
  }
};

//TODO GET FILIERE BY ID
const getFiliereById = async (req: Request, res: Response) => {
  //MODEL
  const filiere = getModelFiliere();
  const cours = ConnexionBd.getSequelizeDb().models.Cour;
  try {
    const id = req.params._id;
    const dataFiliereById = await filiere.findByPk(id, {
      include: [cours],
    });
    if (!dataFiliereById) {
      res.status(404).json({ messageNotFound });
    } else {
      res.status(200).json(dataFiliereById);
    }
  } catch (error) {
    RoutesErrorHelper.routesErrors(error, res);
  }
};

//TODO UPDATE FILIERE
const updateFiliereById = async (req: Request, res: Response) => {
  //MODEL
  const filiere = getModelFiliere();
  try {
    const id = req.params._id;
    const dataFiliereById = await filiere.findByPk(id);
    if (!dataFiliereById) {
      res.status(404).json({ messageNotFound });
    } else {
      await filiere.update({ ...req.body }, { where: { _id: id } });
      res.status(200).json(true);
    }
  } catch (error) {
    RoutesErrorHelper.routesErrors(error, res);
  }
};

//TODO DELETE FILIERE
const deleteFiliereById = async (req: Request, res: Response) => {
  //MODEL
  const filiere = getModelFiliere();
  try {
    const id = req.params._id;
    const dataFiliereById = await filiere.findByPk(id);
    if (!dataFiliereById) {
      res.status(404).json({ messageNotFound });
    } else {
      await dataFiliereById.destroy();
      res.status(200).json(true);
    }
  } catch (error) {
    RoutesErrorHelper.routesErrors(error, res);
  }
};

//TODO DELETE ALL FILIERE
const deleteAllFilieres = async (req: Request, res: Response) => {
  //MODEL
  const filiere = getModelFiliere();
  try {
    await filiere.drop();
    res.status(200).json(true);
  } catch (error) {
    RoutesErrorHelper.routesErrors(error, res);
  }
};

//******************************   FIN  METHODES        ******************************** */
//MODEL CTRL A EXPOTE
const FilieresCtrl = {
  createFiliere,
  getAllFilieres,
  getFiliereById,
  updateFiliereById,
  deleteFiliereById,
  deleteAllFilieres,
};

//TODO
export default FilieresCtrl;
