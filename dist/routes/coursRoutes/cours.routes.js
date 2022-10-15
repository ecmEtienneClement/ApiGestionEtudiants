"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admins_autho_1 = __importDefault(require("../../authorizations/admins.autho"));
const cours_ctrl_1 = __importDefault(require("./cours.ctrl"));
const router = (0, express_1.Router)();
//MISE EN PLACE DES METHODES
router.post("/", admins_autho_1.default, cours_ctrl_1.default.createCour);
router.get("/", admins_autho_1.default, cours_ctrl_1.default.getAllCours);
router.get("/:_id", cours_ctrl_1.default.getCourById);
router.put("/:_id", admins_autho_1.default, cours_ctrl_1.default.updateCourById);
router.delete("/all", admins_autho_1.default, cours_ctrl_1.default.deleteAllCours);
router.delete("/:_id", admins_autho_1.default, cours_ctrl_1.default.deleteCourById);
//TODO
exports.default = router;
