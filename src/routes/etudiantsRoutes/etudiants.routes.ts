import { Router } from "express";
import etudiantCtrl from "./etudiants.ctrl";
const router = Router();

//MISE EN PLACE DES METHODES
router.post("/", etudiantCtrl.createEtudiant);
router.get("/", etudiantCtrl.getAllEtudiants);
router.get("/:_id", etudiantCtrl.getEtudiantById);
router.put("/:_id", etudiantCtrl.updateEtudiantById);
router.delete("/:_id", etudiantCtrl.deleteEtudiantById);
router.delete("/all", etudiantCtrl.deleteAllEtudiants);

//TODO
export default router;
