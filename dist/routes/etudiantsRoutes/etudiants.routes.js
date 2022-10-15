"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admins_autho_1 = __importDefault(require("../../authorizations/admins.autho"));
const etudiants_autho_1 = __importDefault(require("../../authorizations/etudiants.autho"));
const etudiants_ctrl_1 = __importDefault(require("./etudiants.ctrl"));
const router = (0, express_1.Router)();
//MISE EN PLACE DES METHODES
router.post("/", admins_autho_1.default, etudiants_ctrl_1.default.createEtudiant);
router.get("/", admins_autho_1.default, etudiants_ctrl_1.default.getAllEtudiants);
router.get("/:_id", etudiants_autho_1.default, etudiants_ctrl_1.default.getEtudiantById);
router.put("/:_id", etudiants_autho_1.default, etudiants_ctrl_1.default.updateEtudiantById);
router.put("/up_pwd/:_id", admins_autho_1.default, etudiants_ctrl_1.default.updatePwdEtudiantById);
router.delete("/all", admins_autho_1.default, etudiants_ctrl_1.default.deleteAllEtudiants);
router.delete("/:_id", admins_autho_1.default, etudiants_ctrl_1.default.deleteEtudiantById);
//TODO
exports.default = router;
