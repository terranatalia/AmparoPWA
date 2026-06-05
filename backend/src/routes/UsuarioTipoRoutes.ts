import { Router } from "express";
import UsuarioTipoController from "../controllers/UsuarioTipoController";

const router = Router();

router.post("/create", UsuarioTipoController.create);
router.get("/getAll", UsuarioTipoController.getAll);
router.get("/getById/:id", UsuarioTipoController.getById);
router.put("/update/:id", UsuarioTipoController.update);
router.delete("/delete/:id", UsuarioTipoController.delete);

export default router;
