import { Request, Response } from "express";
import ConnexionBd from "../../connexionDb/connexionDb";
import RoutesErrorHelper from "../routesErrorHelper";

// METHODE GET MODEL ADMIN
function getModelAdmin() {
  return ConnexionBd.getSequelizeDb().models.Admin;
}
//Message not found 404
const message = "Cet administrateur n'existe pas.";

//******************************      METHODES        ******************************** */

//TODO POSTE CREATE ADMIN
const createAdmin = async (req: Request, res: Response) => {
  //MODEL
  const admin = getModelAdmin();
  try {
    const dataAdmin = await admin.create({ ...req.body });
    res.status(200).json(dataAdmin);
  } catch (error) {
    RoutesErrorHelper.routesErrors(error, res);
  }
};

//TODO GET ALL ADMINS
const getAllAdmins = async (req: Request, res: Response) => {
  //MODEL
  const admin = getModelAdmin();
  try {
    const dataAdmins = await admin.findAll();
    res.status(200).json(dataAdmins);
  } catch (error) {
    RoutesErrorHelper.routesErrors(error, res);
  }
};

//TODO GET ADMIN BY ID
const getAdminById = async (req: Request, res: Response) => {
  //MODEL
  const admin = getModelAdmin();
  try {
    const id = req.params._id;
    const dataAdminById = await admin.findByPk(id);
    if (!dataAdminById) {
      res.status(404).json({ message });
    } else {
      res.status(200).json(dataAdminById);
    }
  } catch (error) {
    RoutesErrorHelper.routesErrors(error, res);
  }
};

//TODO UPDATE ADMIN
const updateAdminById = async (req: Request, res: Response) => {
  //MODEL
  const admin = getModelAdmin();
  try {
    const id = req.params._id;
    const dataAdminById = await admin.findByPk(id);
    if (!dataAdminById) {
      res.status(404).json({ message });
    } else {
      await admin.update({ ...req.body }, { where: { _id: id } });
      res.status(200).json(true);
    }
  } catch (error) {
    RoutesErrorHelper.routesErrors(error, res);
  }
};

//TODO DELETE ADMIN
const deleteAdminById = async (req: Request, res: Response) => {
  //MODEL
  const admin = getModelAdmin();
  try {
    const id = req.params._id;
    const dataAdminById = await admin.findByPk(id);
    if (!dataAdminById) {
      res.status(404).json({ message });
    } else {
      await dataAdminById.destroy();
      res.status(200).json(true);
    }
  } catch (error) {
    RoutesErrorHelper.routesErrors(error, res);
  }
};

//TODO DELETE ALL ADMINS
const deleteAllAdmins = async (req: Request, res: Response) => {
  //MODEL
  const admin = getModelAdmin();
  try {
    const dataAdminsDrop = await admin.drop();
    res.status(200).json({ deleted: true, dataAdminsDrop });
  } catch (error) {
    RoutesErrorHelper.routesErrors(error, res);
  }
};

//******************************     FIN  METHODES        ******************************** */

//MODEL CTRL A EXPOTE
const adminsCtrl = {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdminById,
  deleteAdminById,
  deleteAllAdmins,
};

//TODO
export default adminsCtrl;
