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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const initModels_1 = __importDefault(require("../models/initModels"));
dotenv_1.default.config();
//TODO
class ConnexionBd {
    //TODO
    static iniDefaultAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            //MISE EN PLACE DE L'ADMINISTRATEUR PAR DEFAUT
            const modelDefaultAdmin = this.getSequelizeDb().models.Admin;
            const dataDefautlAdmin = yield modelDefaultAdmin.findOne({
                where: { nom: "ADMIN", prenom: "FIRST" },
            });
            if (!dataDefautlAdmin) {
                const pwdHash = yield bcrypt_1.default.hash("Firstadmin01", 10);
                const newDataDefautlAdmin = yield modelDefaultAdmin.create({
                    nom: "ADMIN",
                    prenom: "FIRST",
                    numeroTelephone: "000000000",
                    address: "API",
                    email: "$FIRST.ADMIN@uvs.edu.sn",
                    mdp: pwdHash,
                });
                if (!newDataDefautlAdmin) {
                    throw new Error("Une erreut c'est produite avec le default ADMIN");
                }
            }
        });
    }
    //TODO
    static getSequelizeDb() {
        return this.sequelizeDb;
    }
}
exports.default = ConnexionBd;
_a = ConnexionBd;
//TODO
ConnexionBd.connexionBdDev = () => __awaiter(void 0, void 0, void 0, function* () {
    const sequelizeDbConnexion = new sequelize_1.Sequelize(process.env.bdName, process.env.user, process.env.pwd, {
        host: process.env.host,
        dialect: "mysql",
    });
    try {
        yield sequelizeDbConnexion.authenticate();
        console.log("[mode Dev] Connexion à la base de donnée reussit");
        const initModels = new initModels_1.default(sequelizeDbConnexion);
        const promiseInitModels = yield initModels.onInitModels();
        if (promiseInitModels) {
            try {
                const data = yield sequelizeDbConnexion.sync({ force: false });
                _a.sequelizeDb = data;
                if (data) {
                    _a.iniDefaultAdmin();
                }
                return _a.sequelizeDb;
            }
            catch (error) {
                console.log("Une erreut c'est produite avec la synchronisation de la base de donnée." +
                    error);
                return false;
            }
        }
        else {
            throw new Error("Une erreut c'est produite avec l'initialisation des models");
        }
    }
    catch (error) {
        console.log("error ==>" + error);
        return false;
    }
});
