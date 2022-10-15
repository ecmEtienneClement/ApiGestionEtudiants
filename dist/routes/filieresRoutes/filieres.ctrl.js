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
function getModelFiliere() {
    return connexionDb_1.default.getSequelizeDb().models.Filiere;
}
//messageNotFound not found 404
const messageNotFound = "Ce filiere n'existe pas.";
//******************************     METHODES        ******************************** */
//TODO POSTE CREATE FILIERE
const createFiliere = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //MODEL
    const filiere = getModelFiliere();
    try {
        const dataFiliere = yield filiere.create(Object.assign({}, req.body));
        res.status(200).json(dataFiliere);
    }
    catch (error) {
        routesErrorHelper_1.default.routesErrors(error, res);
    }
});
//TODO GET ALL FILIERE
const getAllFilieres = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //MODEL
    const filiere = getModelFiliere();
    const cours = connexionDb_1.default.getSequelizeDb().models.Cour;
    const etudiants = connexionDb_1.default.getSequelizeDb().models.Etudiant;
    try {
        const dataFilieres = yield filiere.findAll({
            include: [cours, etudiants],
        });
        res.status(200).json(dataFilieres);
    }
    catch (error) {
        routesErrorHelper_1.default.routesErrors(error, res);
    }
});
//TODO GET FILIERE BY ID
const getFiliereById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //MODEL
    const filiere = getModelFiliere();
    const cours = connexionDb_1.default.getSequelizeDb().models.Cour;
    try {
        const id = req.params._id;
        const dataFiliereById = yield filiere.findByPk(id, {
            include: [cours],
        });
        if (!dataFiliereById) {
            res.status(404).json({ messageNotFound });
        }
        else {
            res.status(200).json(dataFiliereById);
        }
    }
    catch (error) {
        routesErrorHelper_1.default.routesErrors(error, res);
    }
});
//TODO UPDATE FILIERE
const updateFiliereById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //MODEL
    const filiere = getModelFiliere();
    try {
        const id = req.params._id;
        const dataFiliereById = yield filiere.findByPk(id);
        if (!dataFiliereById) {
            res.status(404).json({ messageNotFound });
        }
        else {
            yield filiere.update(Object.assign({}, req.body), { where: { _id: id } });
            res.status(200).json(true);
        }
    }
    catch (error) {
        routesErrorHelper_1.default.routesErrors(error, res);
    }
});
//TODO DELETE FILIERE
const deleteFiliereById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //MODEL
    const filiere = getModelFiliere();
    try {
        const id = req.params._id;
        const dataFiliereById = yield filiere.findByPk(id);
        if (!dataFiliereById) {
            res.status(404).json({ messageNotFound });
        }
        else {
            yield dataFiliereById.destroy();
            res.status(200).json(true);
        }
    }
    catch (error) {
        routesErrorHelper_1.default.routesErrors(error, res);
    }
});
//TODO DELETE ALL FILIERE
const deleteAllFilieres = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //MODEL
    const filiere = getModelFiliere();
    try {
        yield filiere.drop();
        res.status(200).json(true);
    }
    catch (error) {
        routesErrorHelper_1.default.routesErrors(error, res);
    }
});
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
exports.default = FilieresCtrl;
