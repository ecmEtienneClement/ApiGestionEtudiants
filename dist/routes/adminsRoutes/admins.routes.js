"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admins_ctrl_1 = __importDefault(require("./admins.ctrl"));
//
const router = (0, express_1.Router)();
//MISE EN PLACE DES METHODES
router.post("/", admins_ctrl_1.default.createAdmin);
router.get("/", admins_ctrl_1.default.getAllAdmins);
router.get("/:_id", admins_ctrl_1.default.getAdminById);
router.put("/:_id", admins_ctrl_1.default.updateAdminById);
router.put("/up_pwd:_id", admins_ctrl_1.default.updatePwdAdminById);
router.delete("/:_id", admins_ctrl_1.default.deleteAdminById);
router.delete("/all", admins_ctrl_1.default.deleteAllAdmins);
//TODO
exports.default = router;
