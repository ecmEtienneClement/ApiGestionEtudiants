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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connexionDb_1 = __importDefault(require("../../connexionDb/connexionDb"));
const routesErrorHelper_1 = __importDefault(require("../routesErrorHelper"));
// METHODE GET MODEL ADMIN
function getModelAdmin() {
    return connexionDb_1.default.getSequelizeDb().models.Admin;
}
// METHODE GET MODEL ETUDIANT
function getModelEtudiant() {
    return connexionDb_1.default.getSequelizeDb().models.Etudiant;
}
//messageNotFound not found 404
let messageNotFound = "Cet utilisateur n'existe pas.";
// METHODE SET MESSAGE NOT FOUND ADMIN
function setMessageNotFoundAdmin() {
    return (messageNotFound = "Cet administrateur n'existe pas.");
}
// METHODE SET MESSAGE NOT FOUND ETUDIANT
function setMessageNotFoundEtudiant() {
    return (messageNotFound = "Cet étudiant n'existe pas.");
}
//TODO POSTE SIGN UP ADMINS OR ETUDIANTS
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Verification si la Requête contient le mdp et email
    if (!req.body.email) {
        return res.status(400).json({
            message: "Désoler votre Requête ne contient pas d'email",
        });
    }
    if (!req.body.mdp) {
        return res.status(400).json({
            message: "Désoler votre Requête ne contient pas de mot de passe",
        });
    }
    const email = req.body.email;
    const pswSign = req.body.mdp;
    //MODEL
    let model;
    if (email.startsWith("$")) {
        model = getModelAdmin();
        setMessageNotFoundAdmin();
    }
    else {
        model = getModelEtudiant();
        setMessageNotFoundEtudiant();
    }
    try {
        const dataAdminOrEtudiant = yield model.findOne({
            where: {
                email: email,
            },
        });
        //USER NOT FOUND
        if (!dataAdminOrEtudiant) {
            res.status(404).json({ messageNotFound });
        }
        else {
            //
            const psw = dataAdminOrEtudiant.getDataValue("mdp");
            //
            const isTrue = yield bcrypt_1.default.compare(pswSign, psw);
            //
            if (!isTrue) {
                res.status(403).json({ message: "Email ou mot de passe incorrect." });
            }
            else {
                //
                const id = dataAdminOrEtudiant.getDataValue("_id");
                const role = dataAdminOrEtudiant.getDataValue("role");
                //*******Connexion de l'utilisateur réussit */
                res.status(200).json({
                    user_id: id,
                    user_role: role,
                    token: jsonwebtoken_1.default.sign({
                        user: { _id: id, _role: role },
                    }, process.env.SECRET_KEY_TOKEN, {
                        expiresIn: "72h",
                    }),
                });
            }
        }
    }
    catch (error) {
        routesErrorHelper_1.default.routesErrors(error, res);
    }
});
const signCtrl = {
    signIn,
};
exports.default = signCtrl;
