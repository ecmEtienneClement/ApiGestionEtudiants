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
const sequelize_1 = require("sequelize");
const admin_model_1 = __importDefault(require("./admin.model"));
const cours_model_1 = __importDefault(require("./cours.model"));
const etudiants_model_1 = __importDefault(require("./etudiants.model"));
const filieres_model_1 = __importDefault(require("./filieres.model"));
const nivoEtudes_model_1 = __importDefault(require("./nivoEtudes.model"));
const notes_model_1 = __importDefault(require("./notes.model"));
class InitModels {
    constructor(sequelize) {
        this.sequelize = sequelize;
    }
    //TODO
    onInitModels() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //TODO
                const tbModelsPromise = yield Promise.all([
                    //ADMINS
                    (0, admin_model_1.default)(this.sequelize, sequelize_1.DataTypes),
                    //ETUDIANTS
                    (0, etudiants_model_1.default)(this.sequelize, sequelize_1.DataTypes),
                    //FILIERES
                    (0, filieres_model_1.default)(this.sequelize, sequelize_1.DataTypes),
                    //NIVOETUDES
                    (0, nivoEtudes_model_1.default)(this.sequelize, sequelize_1.DataTypes),
                    //COURS
                    (0, cours_model_1.default)(this.sequelize, sequelize_1.DataTypes),
                    //NOTES
                    (0, notes_model_1.default)(this.sequelize, sequelize_1.DataTypes),
                ]);
                if (tbModelsPromise) {
                    this.relationsModels();
                    return true;
                }
            }
            catch (error) { }
        });
    }
    //TODO
    relationsModels() {
        //MODELS
        const etudiantModel = this.sequelize.models.Etudiant;
        const filiereModel = this.sequelize.models.Filiere;
        const nivoEtudeModel = this.sequelize.models.NivoEtude;
        const noteModel = this.sequelize.models.Note;
        const courModel = this.sequelize.models.Cour;
        //TODO ETUDIANT RELATION
        //RELATION ETUDIANT AND FILIERE
        filiereModel.hasMany(etudiantModel, {
            foreignKey: {
                allowNull: false,
            },
        });
        etudiantModel.belongsTo(filiereModel);
        //RELATION ETUDIANT AND NIVO_ETUDE
        nivoEtudeModel.hasMany(etudiantModel, {
            foreignKey: {
                allowNull: false,
            },
        });
        etudiantModel.belongsTo(nivoEtudeModel);
        //RELATION ETUDIANT AND NOTE
        etudiantModel.hasMany(noteModel, {
            foreignKey: {
                allowNull: false,
            },
        });
        noteModel.belongsTo(etudiantModel);
        //TODO COUR RELATION
        //RELATION COUR AND FILIERE
        courModel.belongsToMany(filiereModel, { through: "Cours_Filieres" });
        filiereModel.belongsToMany(courModel, { through: "Cours_Filieres" });
        //RELATION COUR AND NIVO_ETUDE
        courModel.belongsToMany(nivoEtudeModel, { through: "Cours_NivoEtudes" });
        nivoEtudeModel.belongsToMany(courModel, { through: "Cours_NivoEtudes" });
        //TODO NOTE RELATION
        //RELATION NOTE AND NIVEAU ETUDE
        nivoEtudeModel.hasMany(noteModel, {
            foreignKey: {
                allowNull: false,
            },
        });
        noteModel.belongsTo(nivoEtudeModel);
        //RELATION NOTE AND COUR
        courModel.hasMany(noteModel, {
            foreignKey: {
                allowNull: false,
            },
        });
        noteModel.belongsTo(courModel);
    }
}
exports.default = InitModels;
