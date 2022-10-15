import { Request, Response } from "express";
import ConnexionBd from "../../connexionDb/connexionDb";
import RoutesErrorHelper from "../routesErrorHelper";

// METHODE GET MODEL ADMIN
function getModelNote() {
  return ConnexionBd.getSequelizeDb().models.Note;
}
//messageNotFound not found 404
const messageNotFound = "Cet note n'existe pas.";

//******************************     METHODES        ******************************** */

//TODO POSTE CREATE NOTE
const createNote = async (req: Request, res: Response) => {
  //MODEL
  const note = getModelNote();
  try {
    const dataNote = await note.create({ ...req.body });
    res.status(200).json(dataNote);
  } catch (error) {
    RoutesErrorHelper.routesErrors(error, res);
  }
};

//TODO GET ALL NOTE
const getAllNotes = async (req: Request, res: Response) => {
  //MODEL
  const note = getModelNote();
  const cour = ConnexionBd.getSequelizeDb().models.Cour;
  const nivoEtude = ConnexionBd.getSequelizeDb().models.NivoEtude;

  try {
    const dataNotes = await note.findAll({
      attributes: [
        "note",
        ["createdAt", "ajouter le"],
        ["updatedAt", "modifier le"],
        "Cour.nom",
      ],
      include: [cour, nivoEtude],
    });
    res.status(200).json(dataNotes);
  } catch (error) {
    RoutesErrorHelper.routesErrors(error, res);
  }
};

//TODO GET NOTE BY ID
const getNoteById = async (req: Request, res: Response) => {
  //MODEL
  const note = getModelNote();
  try {
    const id = req.params._id;
    const dataNoteById = await note.findByPk(id);
    if (!dataNoteById) {
      res.status(404).json({ messageNotFound });
    } else {
      res.status(200).json(dataNoteById);
    }
  } catch (error) {
    RoutesErrorHelper.routesErrors(error, res);
  }
};

//TODO UPDATE NOTE
const updateNoteById = async (req: Request, res: Response) => {
  //MODEL
  const note = getModelNote();
  try {
    const id = req.params._id;
    const dataNoteById = await note.findByPk(id);
    if (!dataNoteById) {
      res.status(404).json({ messageNotFound });
    } else {
      await note.update({ ...req.body }, { where: { _id: id } });
      res.status(200).json(true);
    }
  } catch (error) {
    RoutesErrorHelper.routesErrors(error, res);
  }
};

//TODO DELETE NOTE
const deleteNoteById = async (req: Request, res: Response) => {
  //MODEL
  const note = getModelNote();
  try {
    const id = req.params._id;
    const dataNoteById = await note.findByPk(id);
    if (!dataNoteById) {
      res.status(404).json({ messageNotFound });
    } else {
      await dataNoteById.destroy();
      res.status(200).json(true);
    }
  } catch (error) {
    RoutesErrorHelper.routesErrors(error, res);
  }
};

//TODO DELETE ALL NOTE
const deleteAllNotes = async (req: Request, res: Response) => {
  //MODEL
  const note = getModelNote();
  try {
    await note.drop();
    res.status(200).json(true);
  } catch (error) {
    RoutesErrorHelper.routesErrors(error, res);
  }
};

//******************************   FIN  METHODES        ******************************** */
//MODEL CTRL A EXPOTE
const notesCtrl = {
  createNote,
  getAllNotes,
  getNoteById,
  updateNoteById,
  deleteNoteById,
  deleteAllNotes,
};

//TODO
export default notesCtrl;
