import { Router } from "express";
import EstadoController from "../controllers/EstadoController";

const router = Router();

router.post("/create", EstadoController.create);
router.get("/getAll", EstadoController.getAll);
router.get("/getById/:id", EstadoController.getById);
router.put("/update/:id", EstadoController.update);
router.delete("/delete/:id", EstadoController.delete);

export default router;
