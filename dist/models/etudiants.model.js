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
Object.defineProperty(exports, "__esModule", { value: true });
//TODO
exports.default = (sequelize, dataTypes) => __awaiter(void 0, void 0, void 0, function* () {
    return sequelize.define("Etudiant", {
        //TODO
        _id: {
            type: dataTypes.UUID,
            primaryKey: true,
            defaultValue: dataTypes.UUIDV4,
        },
        //TODO
        nom: {
            type: dataTypes.STRING,
            validate: {
                notEmpty: { msg: "Le nom de l'étudiant ne peut étre vide." },
                notNull: { msg: "Le nom de l'étudiant est requise." },
                len: [2, 10],
            },
            allowNull: false,
        },
        //TODO
        prenom: {
            type: dataTypes.STRING,
            validate: {
                notEmpty: { msg: "Le prénom de l'étudiant ne peut étre vide." },
                notNull: { msg: "Le prénom de l'étudiant est requise." },
                len: [2, 25],
            },
            allowNull: false,
        },
        //TODO
        ine: {
            type: dataTypes.STRING,
            validate: {
                notEmpty: { msg: "L'ine de l'étudiant ne peut étre vide." },
                notNull: { msg: "L'ine de l'étudiant est requise." },
                len: [10, 10],
                validateIne(value) {
                    if (!value.startsWith("N")) {
                        throw new Error("Format INE invalide.");
                    }
                },
            },
            unique: { name: "ine", msg: "Désoler cet INE existe déja." },
            allowNull: false,
        },
        //TODO
        numeroTelephone: {
            type: dataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "Le numéro de téléphone de l'étudiant ne peut étre vide.",
                },
                notNull: { msg: "Le numéro de téléphone de l'étudiant est requise." },
                len: [9, 9],
            },
            unique: {
                name: "numeroTelephone",
                msg: "Désoler ce numéro de téléphone  existe déja.",
            },
            allowNull: false,
        },
        //TODO
        address: {
            type: dataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "L'address de l'étudiant ne peut étre vide.",
                },
                notNull: { msg: "L'address de l'étudiant est requise." },
                len: [2, 30],
            },
            allowNull: false,
        },
        //TODO
        email: {
            type: dataTypes.STRING,
            validate: {
                notNull: { msg: "L'email de l'étudiant est requise." },
                len: [10, 50],
                validateMail(value) {
                    let prenom = this.prenom.trim();
                    while (prenom.includes(" ")) {
                        const prenomReplace = prenom.replace(" ", "");
                        prenom = prenomReplace;
                    }
                    if (!value.startsWith(prenom + "." + this.nom)) {
                        throw new Error("Format email invalide");
                    }
                    if (!value.endsWith("@uvs.edu.sn")) {
                        throw new Error("Format email invalide: ... @uvs.edu.sn");
                    }
                },
            },
            unique: { name: "email", msg: "Désoler cet email existe déja." },
            allowNull: false,
        },
        //TODO
        mdp: {
            type: dataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "Le mot de passe de l'étudiant ne peut étre vide.",
                },
                notNull: { msg: "Le mot de passe de l'étudiant est requise." },
                len: {
                    args: [6, 250],
                    msg: "Le mot de passe de l'étudiant doit être comprise entre 6 à 250 caractères.",
                },
            },
            allowNull: false,
        },
        //TODO
        role: {
            type: dataTypes.STRING,
            defaultValue: "etudiant",
            allowNull: false,
        },
    }, {
        timestamps: true,
    });
});
