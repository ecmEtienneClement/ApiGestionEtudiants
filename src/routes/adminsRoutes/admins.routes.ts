import { Router } from "express";
import adminsCtrl from "./admins.ctrl";
//
const router = Router();

//MISE EN PLACE DES METHODES
router.post("/", adminsCtrl.createAdmin);
router.get("/", adminsCtrl.getAllAdmins);
router.get("/:_id", adminsCtrl.getAdminById);
router.put("/:_id", adminsCtrl.updateAdminById);
router.put("/up_pwd:_id", adminsCtrl.updatePwdAdminById);
router.delete("/:_id", adminsCtrl.deleteAdminById);
router.delete("/all", adminsCtrl.deleteAllAdmins);
//TODO
export default router;
