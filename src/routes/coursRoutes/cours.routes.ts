import { Router } from "express";
import coursCtrl from "./cours.ctrl";

const router = Router();

//MISE EN PLACE DES METHODES
router.post("/", coursCtrl.createCour);
router.get("/", coursCtrl.getAllCours);
router.get("/:_id", coursCtrl.getCourById);
router.put("/:_id", coursCtrl.updateCourById);
router.delete("/:_id", coursCtrl.deleteCourById);
router.delete("/all", coursCtrl.deleteAllCours);

//TODO
export default router;
