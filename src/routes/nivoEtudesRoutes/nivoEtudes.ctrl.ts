import { Request, Response } from "express";
import ConnexionBd from "../../connexionDb/connexionDb";
import RoutesErrorHelper from "../routesErrorHelper";

// METHODE GET MODEL ADMIN
function getModelNivoEtude() {
  return ConnexionBd.getSequelizeDb().models.NivoEtude;
}
//messageNotFound not found 404
const messageNotFound = "Ce niveau d'étude n'existe pas.";

//******************************     METHODES        ******************************** */

//TODO POSTE CREATE NIVO_ETUDE
const createNivoEtude = async (req: Request, res: Response) => {
  //MODEL
  const nivoEtude = getModelNivoEtude();
  try {
    const dataNivoEtude = await nivoEtude.create({ ...req.body });
    res.status(200).json(dataNivoEtude);
  } catch (error) {
    RoutesErrorHelper.routesErrors(error, res);
  }
};

//TODO GET ALL NIVO_ETUDE
const getAllNivoEtudes = async (req: Request, res: Response) => {
  //MODEL
  const nivoEtude = getModelNivoEtude();
  try {
    const dataNivoEtudes = await nivoEtude.findAll();
    res.status(200).json(dataNivoEtudes);
  } catch (error) {
    RoutesErrorHelper.routesErrors(error, res);
  }
};

//TODO GET NIVO_ETUDE BY ID
const getNivoEtudeById = async (req: Request, res: Response) => {
  //MODEL
  const nivoEtude = getModelNivoEtude();
  try {
    const id = req.params._id;
    const dataNivoEtudeById = await nivoEtude.findByPk(id);
    if (!dataNivoEtudeById) {
      res.status(404).json({ messageNotFound });
    } else {
      res.status(200).json(dataNivoEtudeById);
    }
  } catch (error) {
    RoutesErrorHelper.routesErrors(error, res);
  }
};

//TODO UPDATE NIVO_ETUDE
const updateNivoEtudeById = async (req: Request, res: Response) => {
  //MODEL
  const nivoEtude = getModelNivoEtude();
  try {
    const id = req.params._id;
    const dataNivoEtudeById = await nivoEtude.findByPk(id);
    if (!dataNivoEtudeById) {
      res.status(404).json({ messageNotFound });
    } else {
      await nivoEtude.update({ ...req.body }, { where: { _id: id } });
      res.status(200).json(true);
    }
  } catch (error) {
    RoutesErrorHelper.routesErrors(error, res);
  }
};

//TODO DELETE NIVO_ETUDE
const deleteNivoEtudeById = async (req: Request, res: Response) => {
  //MODEL
  const nivoEtude = getModelNivoEtude();
  try {
    const id = req.params._id;
    const dataNivoEtudeById = await nivoEtude.findByPk(id);
    if (!dataNivoEtudeById) {
      res.status(404).json({ messageNotFound });
    } else {
      await dataNivoEtudeById.destroy();
      res.status(200).json(true);
    }
  } catch (error) {
    RoutesErrorHelper.routesErrors(error, res);
  }
};

//TODO DELETE ALL NivoEtude
const deleteAllNivoEtudes = async (req: Request, res: Response) => {
  //MODEL
  const nivoEtude = getModelNivoEtude();
  try {
    await nivoEtude.drop();
    res.status(200).json(true);
  } catch (error) {
    RoutesErrorHelper.routesErrors(error, res);
  }
};

//******************************   FIN  METHODES        ******************************** */
//MODEL CTRL A EXPOTE
const nivoEtudesCtrl = {
  createNivoEtude,
  getAllNivoEtudes,
  getNivoEtudeById,
  updateNivoEtudeById,
  deleteNivoEtudeById,
  deleteAllNivoEtudes,
};

//TODO
export default nivoEtudesCtrl;
