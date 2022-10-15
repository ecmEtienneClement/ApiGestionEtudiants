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
const bcrypt_1 = __importDefault(require("bcrypt"));
// METHODE GET MODEL ADMIN
function getModelAdmin() {
    return connexionDb_1.default.getSequelizeDb().models.Admin;
}
//Message not found 404
const message = "Cet administrateur n'existe pas.";
//******************************      METHODES        ******************************** */
//TODO POSTE CREATE ADMIN
const createAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const admin = getModelAdmin();
    const psw = req.body.mdp;
    try {
        const pswHash = yield bcrypt_1.default.hash(psw, 10);
        const dataAdmin = yield admin.create(Object.assign(Object.assign({}, req.body), { mdp: pswHash }));
        res.status(200).json(dataAdmin);
    }
    catch (error) {
        routesErrorHelper_1.default.routesErrors(error, res);
    }
});
//TODO GET ALL ADMINS
const getAllAdmins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //MODEL
    const admin = getModelAdmin();
    try {
        const dataAdmins = yield admin.findAll();
        res.status(200).json(dataAdmins);
    }
    catch (error) {
        routesErrorHelper_1.default.routesErrors(error, res);
    }
});
//TODO GET ADMIN BY ID
const getAdminById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //MODEL
    const admin = getModelAdmin();
    try {
        const id = req.params._id;
        const dataAdminById = yield admin.findByPk(id);
        if (!dataAdminById) {
            res.status(404).json({ message });
        }
        else {
            res.status(200).json(dataAdminById);
        }
    }
    catch (error) {
        routesErrorHelper_1.default.routesErrors(error, res);
    }
});
//TODO UPDATE ADMIN
const updateAdminById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //MODEL
    const admin = getModelAdmin();
    try {
        const id = req.params._id;
        const dataAdminById = yield admin.findByPk(id);
        if (!dataAdminById) {
            res.status(404).json({ message });
        }
        else {
            yield admin.update(Object.assign({}, req.body), { where: { _id: id } });
            res.status(200).json(true);
        }
    }
    catch (error) {
        routesErrorHelper_1.default.routesErrors(error, res);
    }
});
//TODO UPDATE  PWD ADMIN
const updatePwdAdminById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Verification si la Requête contient le mdp
    if (!req.body.mdp) {
        return res.status(400).json({
            message: "Désoler votre Requête ne contient pas de mot de passe",
        });
    }
    //MODEL
    const admin = getModelAdmin();
    try {
        const id = req.params._id;
        const dataAdminById = yield admin.findByPk(id);
        if (!dataAdminById) {
            res.status(404).json({ message });
        }
        else {
            const pwd = req.body.mdp;
            const pwdHash = yield bcrypt_1.default.hash(pwd, 10);
            yield admin.update(Object.assign(Object.assign({}, req.body), { mdp: pwdHash }), { where: { _id: id } });
            res.status(200).json(true);
        }
    }
    catch (error) {
        routesErrorHelper_1.default.routesErrors(error, res);
    }
});
//TODO DELETE ADMIN
const deleteAdminById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //MODEL
    const admin = getModelAdmin();
    try {
        const id = req.params._id;
        const dataAdminById = yield admin.findByPk(id);
        if (!dataAdminById) {
            res.status(404).json({ message });
        }
        else {
            yield dataAdminById.destroy();
            res.status(200).json(true);
        }
    }
    catch (error) {
        routesErrorHelper_1.default.routesErrors(error, res);
    }
});
//TODO DELETE ALL ADMINS
const deleteAllAdmins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //MODEL
    const admin = getModelAdmin();
    try {
        const dataAdminsDrop = yield admin.drop();
        res.status(200).json({ deleted: true, dataAdminsDrop });
    }
    catch (error) {
        routesErrorHelper_1.default.routesErrors(error, res);
    }
});
//******************************     FIN  METHODES        ******************************** */
//MODEL CTRL A EXPOTE
const adminsCtrl = {
    createAdmin,
    getAllAdmins,
    getAdminById,
    updateAdminById,
    updatePwdAdminById,
    deleteAdminById,
    deleteAllAdmins,
};
//TODO
exports.default = adminsCtrl;
