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
function getModelNivoEtude() {
    return connexionDb_1.default.getSequelizeDb().models.NivoEtude;
}
//messageNotFound not found 404
const messageNotFound = "Ce niveau d'étude n'existe pas.";
//******************************     METHODES        ******************************** */
//TODO POSTE CREATE NIVO_ETUDE
const createNivoEtude = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //MODEL
    const nivoEtude = getModelNivoEtude();
    try {
        const dataNivoEtude = yield nivoEtude.create(Object.assign({}, req.body));
        res.status(200).json(dataNivoEtude);
    }
    catch (error) {
        routesErrorHelper_1.default.routesErrors(error, res);
    }
});
//TODO GET ALL NIVO_ETUDE
const getAllNivoEtudes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //MODEL
    const nivoEtude = getModelNivoEtude();
    const cours = connexionDb_1.default.getSequelizeDb().models.Cour;
    const etudiants = connexionDb_1.default.getSequelizeDb().models.Etudiant;
    // const notes = ConnexionBd.getSequelizeDb().models.Note;
    try {
        const dataNivoEtudes = yield nivoEtude.findAll({
            include: [cours, etudiants],
        });
        res.status(200).json(dataNivoEtudes);
    }
    catch (error) {
        routesErrorHelper_1.default.routesErrors(error, res);
    }
});
//TODO GET NIVO_ETUDE BY ID
const getNivoEtudeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //MODEL
    const nivoEtude = getModelNivoEtude();
    try {
        const id = req.params._id;
        const dataNivoEtudeById = yield nivoEtude.findByPk(id);
        if (!dataNivoEtudeById) {
            res.status(404).json({ messageNotFound });
        }
        else {
            res.status(200).json(dataNivoEtudeById);
        }
    }
    catch (error) {
        routesErrorHelper_1.default.routesErrors(error, res);
    }
});
//TODO UPDATE NIVO_ETUDE
const updateNivoEtudeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //MODEL
    const nivoEtude = getModelNivoEtude();
    try {
        const id = req.params._id;
        const dataNivoEtudeById = yield nivoEtude.findByPk(id);
        if (!dataNivoEtudeById) {
            res.status(404).json({ messageNotFound });
        }
        else {
            yield nivoEtude.update(Object.assign({}, req.body), { where: { _id: id } });
            res.status(200).json(true);
        }
    }
    catch (error) {
        routesErrorHelper_1.default.routesErrors(error, res);
    }
});
//TODO DELETE NIVO_ETUDE
const deleteNivoEtudeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //MODEL
    const nivoEtude = getModelNivoEtude();
    try {
        const id = req.params._id;
        const dataNivoEtudeById = yield nivoEtude.findByPk(id);
        if (!dataNivoEtudeById) {
            res.status(404).json({ messageNotFound });
        }
        else {
            yield dataNivoEtudeById.destroy();
            res.status(200).json(true);
        }
    }
    catch (error) {
        routesErrorHelper_1.default.routesErrors(error, res);
    }
});
//TODO DELETE ALL NivoEtude
const deleteAllNivoEtudes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //MODEL
    const nivoEtude = getModelNivoEtude();
    try {
        yield nivoEtude.drop();
        res.status(200).json(true);
    }
    catch (error) {
        routesErrorHelper_1.default.routesErrors(error, res);
    }
});
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
exports.default = nivoEtudesCtrl;
