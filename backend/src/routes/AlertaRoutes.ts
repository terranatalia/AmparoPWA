import { Router } from "express";
import AlertaController from "../controllers/AlertaController";

const router = Router();

router.post("/create", AlertaController.create);
router.get("/getAll", AlertaController.getAll);
router.get("/getById/:id", AlertaController.getById);
router.put("/update/:id", AlertaController.update);
router.delete("/delete/:id", AlertaController.delete);

export default router;
