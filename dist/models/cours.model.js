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
    return sequelize.define("Cour", {
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
                notEmpty: { msg: "Le nom du cour ne peut étre vide." },
                notNull: { msg: "Le nom du cour  est requise." },
                len: {
                    args: [2, 50],
                    msg: "Le nom du cour doit être comprise entre 2 à 50 lettres.",
                },
            },
            unique: {
                name: "nom",
                msg: "Désoler ce cour existe déja.",
            },
            allowNull: false,
        },
    }, {
        timestamps: true,
    });
});
