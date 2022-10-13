import { Router } from "express";
import noteCtrl from "./notes.ctlr";
const router = Router();

//MISE EN PLACE DES METHODES
router.post("/", noteCtrl.createNote);
router.get("/", noteCtrl.getAllNotes);
router.get("/:_id", noteCtrl.getNoteById);
router.put("/:_id", noteCtrl.updateNoteById);
router.delete("/:_id", noteCtrl.deleteNoteById);
router.delete("/all", noteCtrl.deleteAllNotes);

//TODO
export default router;
