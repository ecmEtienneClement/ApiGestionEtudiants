import { Router } from "express";
import adminsAutho from "../../authorizations/admins.autho";
import etudiantsAutho from "../../authorizations/etudiants.autho";
import etudiantCtrl from "./etudiants.ctrl";
const router = Router();

//MISE EN PLACE DES METHODES
router.post("/", adminsAutho, etudiantCtrl.createEtudiant);
router.get("/", adminsAutho, etudiantCtrl.getAllEtudiants);
router.get("/:_id", etudiantsAutho, etudiantCtrl.getEtudiantById);
router.put("/:_id", etudiantsAutho, etudiantCtrl.updateEtudiantById);
router.put("/up_pwd/:_id", adminsAutho, etudiantCtrl.updatePwdEtudiantById);
router.delete("/all", adminsAutho, etudiantCtrl.deleteAllEtudiants);
router.delete("/:_id", adminsAutho, etudiantCtrl.deleteEtudiantById);

//TODO
export default router;
