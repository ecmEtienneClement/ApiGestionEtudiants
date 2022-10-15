import { Router } from "express";
import adminAutho from "../../authorizations/admins.autho";
import nivoEtudeCtrl from "./nivoEtudes.ctrl";
const router = Router();

//MISE EN PLACE DES METHODES
router.post("/", adminAutho, nivoEtudeCtrl.createNivoEtude);
router.get("/", adminAutho, nivoEtudeCtrl.getAllNivoEtudes);
router.get("/:_id", nivoEtudeCtrl.getNivoEtudeById);
router.put("/:_id", adminAutho, nivoEtudeCtrl.updateNivoEtudeById);
router.delete("/all", adminAutho, nivoEtudeCtrl.deleteAllNivoEtudes);
router.delete("/:_id", adminAutho, nivoEtudeCtrl.deleteAllNivoEtudes);

//TODO
export default router;
