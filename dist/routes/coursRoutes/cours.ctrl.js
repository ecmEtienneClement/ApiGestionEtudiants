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
function getModelCour() {
    return connexionDb_1.default.getSequelizeDb().models.Cour;
}
//Message not found 404
const message = "Ce cour n'existe pas.";
//******************************     METHODES        ******************************** */
//TODO POSTE CREATE COUR
const createCour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //MODEL
    const cour = getModelCour();
    try {
        const dataCour = yield cour.create(Object.assign({}, req.body));
        res.status(200).json(dataCour);
    }
    catch (error) {
        routesErrorHelper_1.default.routesErrors(error, res);
    }
});
//TODO GET ALL COURS
const getAllCours = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filieres = connexionDb_1.default.getSequelizeDb().models.Filiere;
    const nivoEtudes = connexionDb_1.default.getSequelizeDb().models.NivoEtude;
    const notes = connexionDb_1.default.getSequelizeDb().models.Note;
    //MODEL
    const cour = getModelCour();
    try {
        const dataCours = yield cour.findAll({
            include: [filieres, nivoEtudes, notes],
        });
        res.status(200).json(dataCours);
    }
    catch (error) {
        routesErrorHelper_1.default.routesErrors(error, res);
    }
});
//TODO GET COUR BY ID
const getCourById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //MODEL
    const cour = getModelCour();
    const nivoEtudes = connexionDb_1.default.getSequelizeDb().models.NivoEtude;
    try {
        const id = req.params._id;
        const dataCourById = yield cour.findByPk(id, {
            include: [nivoEtudes],
        });
        if (!dataCourById) {
            res.status(404).json({ message });
        }
        else {
            res.status(200).json(dataCourById);
        }
    }
    catch (error) {
        routesErrorHelper_1.default.routesErrors(error, res);
    }
});
//TODO UPDATE COUR
const updateCourById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //MODEL
    const cour = getModelCour();
    try {
        const id = req.params._id;
        const dataCourById = yield cour.findByPk(id);
        if (!dataCourById) {
            res.status(404).json({ message });
        }
        else {
            yield cour.update(Object.assign({}, req.body), { where: { _id: id } });
            res.status(200).json(true);
        }
    }
    catch (error) {
        routesErrorHelper_1.default.routesErrors(error, res);
    }
});
//TODO DELETE COUR
const deleteCourById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //MODEL
    const cour = getModelCour();
    try {
        const id = req.params._id;
        const dataCourById = yield cour.findByPk(id);
        if (!dataCourById) {
            res.status(404).json({ message });
        }
        else {
            yield dataCourById.destroy();
            res.status(200).json(true);
        }
    }
    catch (error) {
        routesErrorHelper_1.default.routesErrors(error, res);
    }
});
//TODO DELETE ALL COURS
const deleteAllCours = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //MODEL
    const cour = getModelCour();
    try {
        const dataCoursDrop = yield cour.drop();
        res.status(200).json({ deleted: true, dataCoursDrop });
    }
    catch (error) {
        routesErrorHelper_1.default.routesErrors(error, res);
    }
});
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
exports.default = CoursCtrl;
