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
const bcrypt_1 = __importDefault(require("bcrypt"));
const connexionDb_1 = __importDefault(require("../../connexionDb/connexionDb"));
const routesErrorHelper_1 = __importDefault(require("../routesErrorHelper"));
// METHODE GET MODEL ADMIN
function getModelEtudiant() {
    return connexionDb_1.default.getSequelizeDb().models.Etudiant;
}
//messageNotFound not found 404
const messageNotFound = "Cet étudiant n'existe pas.";
//******************************     METHODES        ******************************** */
//TODO POSTE CREATE ETUDIANT
const createEtudiant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.mdp) {
        return res.status(400).json({
            message: "Désoler votre Requête ne contient pas de mot de passe",
        });
    }
    const isValid = routesErrorHelper_1.default.pwdIsValid(req.body.mdp, res);
    if (!isValid) {
        return false;
    }
    //MODEL
    const etudiant = getModelEtudiant();
    const psw = req.body.mdp;
    try {
        const pswHash = yield bcrypt_1.default.hash(psw, 10);
        const dataEtudiant = yield etudiant.create(Object.assign(Object.assign({}, req.body), { mdp: pswHash }));
        res.status(200).json(dataEtudiant);
    }
    catch (error) {
        routesErrorHelper_1.default.routesErrors(error, res);
    }
});
//TODO GET ALL ETUDIANTS
const getAllEtudiants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //MODEL
    const etudiant = getModelEtudiant();
    const filiere = connexionDb_1.default.getSequelizeDb().models.Filiere;
    const nivoEtude = connexionDb_1.default.getSequelizeDb().models.NivoEtude;
    const notes = connexionDb_1.default.getSequelizeDb().models.Note;
    try {
        const dataEtudiants = yield etudiant.findAll({
            include: [filiere, nivoEtude, notes],
        });
        res.status(200).json(dataEtudiants);
    }
    catch (error) {
        routesErrorHelper_1.default.routesErrors(error, res);
    }
});
//TODO GET ETUDIANT BY ID
const getEtudiantById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //MODEL
    const etudiant = getModelEtudiant();
    const filiere = connexionDb_1.default.getSequelizeDb().models.Filiere;
    const nivoEtude = connexionDb_1.default.getSequelizeDb().models.NivoEtude;
    const notes = connexionDb_1.default.getSequelizeDb().models.Note;
    try {
        const id = req.params._id;
        const dataEtudiantById = yield etudiant.findByPk(id, {
            include: [filiere, nivoEtude, notes],
        });
        if (!dataEtudiantById) {
            return res.status(404).json({ messageNotFound });
        }
        else {
            return res.status(200).json(dataEtudiantById);
        }
    }
    catch (error) {
        routesErrorHelper_1.default.routesErrors(error, res);
    }
});
//TODO UPDATE ETUDIANT
const updateEtudiantById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //MODEL
    const etudiant = getModelEtudiant();
    try {
        const id = req.params._id;
        const dataEtudiantById = yield etudiant.findByPk(id);
        if (!dataEtudiantById) {
            res.status(404).json({ messageNotFound });
        }
        else {
            yield etudiant.update(Object.assign({}, req.body), { where: { _id: id } });
            res.status(200).json(true);
        }
    }
    catch (error) {
        routesErrorHelper_1.default.routesErrors(error, res);
    }
});
//TODO UPDATE PWD ETUDIANT
const updatePwdEtudiantById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Verification si la Requête contient le mdp
    if (!req.body.mdp) {
        return res.status(400).json({
            message: "Désoler votre Requête ne contient pas de mot de passe",
        });
    }
    //MODEL
    const etudiant = getModelEtudiant();
    try {
        const id = req.params._id;
        const dataEtudiantById = yield etudiant.findByPk(id);
        if (!dataEtudiantById) {
            res.status(404).json({ messageNotFound });
        }
        else {
            const pwd = req.body.mdp;
            const pwdHash = yield bcrypt_1.default.hash(pwd, 10);
            yield etudiant.update(Object.assign(Object.assign({}, req.body), { mdp: pwdHash }), { where: { _id: id } });
            res.status(200).json(true);
        }
    }
    catch (error) {
        routesErrorHelper_1.default.routesErrors(error, res);
    }
});
//TODO DELETE ETUDIANT
const deleteEtudiantById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //MODEL
    const etudiant = getModelEtudiant();
    try {
        const id = req.params._id;
        const dataEtudiantById = yield etudiant.findByPk(id);
        if (!dataEtudiantById) {
            res.status(404).json({ messageNotFound });
        }
        else {
            yield dataEtudiantById.destroy();
            res.status(200).json(true);
        }
    }
    catch (error) {
        routesErrorHelper_1.default.routesErrors(error, res);
    }
});
//TODO DELETE ALL Etudiants
const deleteAllEtudiants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //MODEL
    const etudiant = getModelEtudiant();
    try {
        yield etudiant.drop();
        res.status(200).json(true);
    }
    catch (error) {
        routesErrorHelper_1.default.routesErrors(error, res);
    }
});
//******************************   FIN  METHODES        ******************************** */
//MODEL CTRL A EXPOTE
const EtudiantsCtrl = {
    createEtudiant,
    getAllEtudiants,
    getEtudiantById,
    updateEtudiantById,
    updatePwdEtudiantById,
    deleteEtudiantById,
    deleteAllEtudiants,
};
//TODO
exports.default = EtudiantsCtrl;
