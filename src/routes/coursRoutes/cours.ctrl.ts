import { Request, Response } from "express";
import ConnexionBd from "../../connexionDb/connexionDb";
import RoutesErrorHelper from "../routesErrorHelper";

// METHODE GET MODEL ADMIN
function getModelCour() {
  return ConnexionBd.getSequelizeDb().models.Cour;
}
//Message not found 404
const message = "Ce cour n'existe pas.";

//******************************     METHODES        ******************************** */

//TODO POSTE CREATE COUR
const createCour = async (req: Request, res: Response) => {
  //MODEL
  const cour = getModelCour();
  try {
    const dataCour = await cour.create({ ...req.body });
    res.status(200).json(dataCour);
  } catch (error) {
    RoutesErrorHelper.routesErrors(error, res);
  }
};

//TODO GET ALL COURS
const getAllCours = async (req: Request, res: Response) => {
  const filieres = ConnexionBd.getSequelizeDb().models.Filiere;
  const nivoEtudes = ConnexionBd.getSequelizeDb().models.NivoEtude;
  const notes = ConnexionBd.getSequelizeDb().models.Note;

  //MODEL
  const cour = getModelCour();
  try {
    const dataCours = await cour.findAll({
      include: [filieres, nivoEtudes, notes],
    });
    res.status(200).json(dataCours);
  } catch (error) {
    RoutesErrorHelper.routesErrors(error, res);
  }
};

//TODO GET COUR BY ID
const getCourById = async (req: Request, res: Response) => {
  //MODEL
  const cour = getModelCour();
  const nivoEtudes = ConnexionBd.getSequelizeDb().models.NivoEtude;

  try {
    const id = req.params._id;
    const dataCourById = await cour.findByPk(id, {
      include: [nivoEtudes],
    });
    if (!dataCourById) {
      res.status(404).json({ message });
    } else {
      res.status(200).json(dataCourById);
    }
  } catch (error) {
    RoutesErrorHelper.routesErrors(error, res);
  }
};

//TODO UPDATE COUR
const updateCourById = async (req: Request, res: Response) => {
  //MODEL
  const cour = getModelCour();
  try {
    const id = req.params._id;
    const dataCourById = await cour.findByPk(id);
    if (!dataCourById) {
      res.status(404).json({ message });
    } else {
      await cour.update({ ...req.body }, { where: { _id: id } });
      res.status(200).json(true);
    }
  } catch (error) {
    RoutesErrorHelper.routesErrors(error, res);
  }
};

//TODO DELETE COUR
const deleteCourById = async (req: Request, res: Response) => {
  //MODEL
  const cour = getModelCour();
  try {
    const id = req.params._id;
    const dataCourById = await cour.findByPk(id);
    if (!dataCourById) {
      res.status(404).json({ message });
    } else {
      await dataCourById.destroy();
      res.status(200).json(true);
    }
  } catch (error) {
    RoutesErrorHelper.routesErrors(error, res);
  }
};

//TODO DELETE ALL COURS
const deleteAllCours = async (req: Request, res: Response) => {
  //MODEL
  const cour = getModelCour();
  try {
    const dataCoursDrop = await cour.drop();
    res.status(200).json({ deleted: true, dataCoursDrop });
  } catch (error) {
    RoutesErrorHelper.routesErrors(error, res);
  }
};

//******************************   FIN  METHODES        ******************************** */
//MODEL CTRL A EXPOTE
const CoursCtrl = {
  createCour,
  getAllCours,
  getCourById,
  updateCourById,
  deleteCourById,
  deleteAllCours,
};

//TODO
export default CoursCtrl;
