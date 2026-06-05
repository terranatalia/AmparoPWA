import { Router } from "express";
import CidadeController from "../controllers/CidadeController";

const router = Router();

router.post("/create", CidadeController.create);
router.get("/getAll", CidadeController.getAll);
router.get("/getById/:id", CidadeController.getById);
router.put("/update/:id", CidadeController.update);
router.delete("/delete/:id", CidadeController.delete);

export default router;
