import { Router } from "express";
import adminAutho from "../../authorizations/admins.autho";
import filiereCtrl from "./filieres.ctrl";
const router = Router();

//MISE EN PLACE DES METHODES
router.post("/", adminAutho, filiereCtrl.createFiliere);
router.get("/", adminAutho, filiereCtrl.getAllFilieres);
router.get("/:_id", filiereCtrl.getFiliereById);
router.put("/:_id", adminAutho, filiereCtrl.updateFiliereById);
router.delete("/all", adminAutho, filiereCtrl.deleteAllFilieres);
router.delete("/:_id", adminAutho, filiereCtrl.deleteFiliereById);

//TODO
export default router;
