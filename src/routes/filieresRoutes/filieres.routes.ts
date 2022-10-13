import { Router } from "express";
import filiereCtrl from "./filieres.ctrl";
const router = Router();

//MISE EN PLACE DES METHODES
router.post("/", filiereCtrl.createFiliere);
router.get("/", filiereCtrl.getAllFilieres);
router.get("/:_id", filiereCtrl.getFiliereById);
router.put("/:_id", filiereCtrl.updateFiliereById);
router.delete("/:_id", filiereCtrl.deleteFiliereById);
router.delete("/all", filiereCtrl.deleteAllFilieres);

//TODO
export default router;
