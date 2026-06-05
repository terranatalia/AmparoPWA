import { Router } from "express";
import ContatoEmergenciaController from "../controllers/ContatoEmergenciaController";

const router = Router();

router.post("/create", ContatoEmergenciaController.create);
router.get("/getAll", ContatoEmergenciaController.getAll);
router.get("/getById/:id", ContatoEmergenciaController.getById);
router.put("/update/:id", ContatoEmergenciaController.update);
router.delete("/delete/:id", ContatoEmergenciaController.delete);

export default router;
