import { Router } from "express";
import adminAutho from "../../authorizations/admins.autho";
import coursCtrl from "./cours.ctrl";

const router = Router();

//MISE EN PLACE DES METHODES
router.post("/", adminAutho, coursCtrl.createCour);
router.get("/", adminAutho, coursCtrl.getAllCours);
router.get("/:_id", coursCtrl.getCourById);
router.put("/:_id", adminAutho, coursCtrl.updateCourById);
router.delete("/all", adminAutho, coursCtrl.deleteAllCours);
router.delete("/:_id", adminAutho, coursCtrl.deleteCourById);

//TODO
export default router;
