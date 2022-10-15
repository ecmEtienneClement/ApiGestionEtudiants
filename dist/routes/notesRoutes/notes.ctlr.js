"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connexionDb_1 = __importDefault(require("../../connexionDb/connexionDb"));
const routesErrorHelper_1 = __importDefault(require("../routesErrorHelper"));
// METHODE GET MODEL ADMIN
function getModelNote() {
    return connexionDb_1.default.getSequelizeDb().models.Note;
}
//messageNotFound not found 404
const messageNotFound = "Cet note n'existe pas.";
//******************************     METHODES        ******************************** */
//TODO POSTE CREATE NOTE
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //MODEL
    const note = getModelNote();
    try {
        const dataNote = yield note.create(Object.assign({}, req.body));
        res.status(200).json(dataNote);
    }
    catch (error) {
        routesErrorHelper_1.default.routesErrors(error, res);
    }
});
//TODO GET ALL NOTE
const getAllNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //MODEL
    const note = getModelNote();
    const cour = connexionDb_1.default.getSequelizeDb().models.Cour;
    const nivoEtude = connexionDb_1.default.getSequelizeDb().models.NivoEtude;
    try {
        const dataNotes = yield note.findAll({
            attributes: [
                "note",
                ["createdAt", "ajouter le"],
                ["updatedAt", "modifier le"],
                "Cour.nom",
            ],
            include: [cour, nivoEtude],
        });
        res.status(200).json(dataNotes);
    }
    catch (error) {
        routesErrorHelper_1.default.routesErrors(error, res);
    }
});
//TODO GET NOTE BY ID
const getNoteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //MODEL
    const note = getModelNote();
    try {
        const id = req.params._id;
        const dataNoteById = yield note.findByPk(id);
        if (!dataNoteById) {
            res.status(404).json({ messageNotFound });
        }
        else {
            res.status(200).json(dataNoteById);
        }
    }
    catch (error) {
        routesErrorHelper_1.default.routesErrors(error, res);
    }
});
//TODO UPDATE NOTE
const updateNoteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //MODEL
    const note = getModelNote();
    try {
        const id = req.params._id;
        const dataNoteById = yield note.findByPk(id);
        if (!dataNoteById) {
            res.status(404).json({ messageNotFound });
        }
        else {
            yield note.update(Object.assign({}, req.body), { where: { _id: id } });
            res.status(200).json(true);
        }
    }
    catch (error) {
        routesErrorHelper_1.default.routesErrors(error, res);
    }
});
//TODO DELETE NOTE
const deleteNoteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //MODEL
    const note = getModelNote();
    try {
        const id = req.params._id;
        const dataNoteById = yield note.findByPk(id);
        if (!dataNoteById) {
            res.status(404).json({ messageNotFound });
        }
        else {
            yield dataNoteById.destroy();
            res.status(200).json(true);
        }
    }
    catch (error) {
        routesErrorHelper_1.default.routesErrors(error, res);
    }
});
//TODO DELETE ALL NOTE
const deleteAllNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //MODEL
    const note = getModelNote();
    try {
        yield note.drop();
        res.status(200).json(true);
    }
    catch (error) {
        routesErrorHelper_1.default.routesErrors(error, res);
    }
});
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
exports.default = notesCtrl;
