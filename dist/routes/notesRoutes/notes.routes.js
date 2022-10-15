"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admins_autho_1 = __importDefault(require("../../authorizations/admins.autho"));
const notes_ctlr_1 = __importDefault(require("./notes.ctlr"));
const router = (0, express_1.Router)();
//MISE EN PLACE DES METHODES
router.post("/", admins_autho_1.default, notes_ctlr_1.default.createNote);
router.get("/", admins_autho_1.default, notes_ctlr_1.default.getAllNotes);
router.get("/:_id", notes_ctlr_1.default.getNoteById);
router.put("/:_id", admins_autho_1.default, notes_ctlr_1.default.updateNoteById);
router.delete("/all", admins_autho_1.default, notes_ctlr_1.default.deleteAllNotes);
router.delete("/:_id", admins_autho_1.default, notes_ctlr_1.default.deleteNoteById);
//TODO
exports.default = router;
