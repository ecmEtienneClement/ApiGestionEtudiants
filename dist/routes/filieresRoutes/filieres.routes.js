"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admins_autho_1 = __importDefault(require("../../authorizations/admins.autho"));
const filieres_ctrl_1 = __importDefault(require("./filieres.ctrl"));
const router = (0, express_1.Router)();
//MISE EN PLACE DES METHODES
router.post("/", admins_autho_1.default, filieres_ctrl_1.default.createFiliere);
router.get("/", admins_autho_1.default, filieres_ctrl_1.default.getAllFilieres);
router.get("/:_id", filieres_ctrl_1.default.getFiliereById);
router.put("/:_id", admins_autho_1.default, filieres_ctrl_1.default.updateFiliereById);
router.delete("/all", admins_autho_1.default, filieres_ctrl_1.default.deleteAllFilieres);
router.delete("/:_id", admins_autho_1.default, filieres_ctrl_1.default.deleteFiliereById);
//TODO
exports.default = router;
