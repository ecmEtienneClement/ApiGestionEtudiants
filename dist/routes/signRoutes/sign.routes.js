"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sign_ctrl_1 = __importDefault(require("./sign.ctrl"));
const router = (0, express_1.Router)();
//MISE EN PLACE DES METHODES
router.post("/in", sign_ctrl_1.default.signIn);
//TODO
exports.default = router;
