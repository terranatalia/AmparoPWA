import { Router } from "express";
import MensagemController from "../controllers/MensagemController";

const router = Router();

router.post("/create", MensagemController.create);
router.get("/getAll", MensagemController.getAll);
router.get("/getById/:id", MensagemController.getById);
router.put("/update/:id", MensagemController.update);
router.delete("/delete/:id", MensagemController.delete);

export default router;
