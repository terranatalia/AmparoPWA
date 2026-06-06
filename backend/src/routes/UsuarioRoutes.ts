import { Router } from "express";
import UsuarioController from "../controllers/UsuarioController";

const router = Router();

router.post("/create", UsuarioController.create);
router.get("/getAll", UsuarioController.getAll);
router.get("/getById/:id", UsuarioController.getById);
router.put("/update/:id", UsuarioController.update);
router.delete("/delete/:id", UsuarioController.delete);

export default router;
