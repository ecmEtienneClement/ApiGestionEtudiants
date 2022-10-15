"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admins_autho_1 = __importDefault(require("../../authorizations/admins.autho"));
const nivoEtudes_ctrl_1 = __importDefault(require("./nivoEtudes.ctrl"));
const router = (0, express_1.Router)();
//MISE EN PLACE DES METHODES
router.post("/", admins_autho_1.default, nivoEtudes_ctrl_1.default.createNivoEtude);
router.get("/", admins_autho_1.default, nivoEtudes_ctrl_1.default.getAllNivoEtudes);
router.get("/:_id", nivoEtudes_ctrl_1.default.getNivoEtudeById);
router.put("/:_id", admins_autho_1.default, nivoEtudes_ctrl_1.default.updateNivoEtudeById);
router.delete("/all", admins_autho_1.default, nivoEtudes_ctrl_1.default.deleteAllNivoEtudes);
router.delete("/:_id", admins_autho_1.default, nivoEtudes_ctrl_1.default.deleteAllNivoEtudes);
//TODO
exports.default = router;
