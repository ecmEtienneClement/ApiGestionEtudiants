import { Router } from "express";
import nivoEtudeCtrl from "./nivoEtudes.ctrl";
const router = Router();

//MISE EN PLACE DES METHODES
router.post("/", nivoEtudeCtrl.createNivoEtude);
router.get("/", nivoEtudeCtrl.getAllNivoEtudes);
router.get("/:_id", nivoEtudeCtrl.getNivoEtudeById);
router.put("/:_id", nivoEtudeCtrl.updateNivoEtudeById);
router.delete("/:_id", nivoEtudeCtrl.deleteAllNivoEtudes);
router.delete("/all", nivoEtudeCtrl.deleteAllNivoEtudes);

//TODO
export default router;
