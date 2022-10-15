import { Router } from "express";
import adminAutho from "../../authorizations/admins.autho";
import noteCtrl from "./notes.ctlr";
const router = Router();

//MISE EN PLACE DES METHODES
router.post("/", adminAutho, noteCtrl.createNote);
router.get("/", adminAutho, noteCtrl.getAllNotes);
router.get("/:_id", noteCtrl.getNoteById);
router.put("/:_id", adminAutho, noteCtrl.updateNoteById);
router.delete("/all", adminAutho, noteCtrl.deleteAllNotes);
router.delete("/:_id", adminAutho, noteCtrl.deleteNoteById);

//TODO
export default router;
