import { Router } from "express";
import signCtrl from "./sign.ctrl";
const router = Router();

//MISE EN PLACE DES METHODES
router.post("/in", signCtrl.signIn);

//TODO
export default router;
