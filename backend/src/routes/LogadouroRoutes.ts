import { Router } from "express";
import LogadouroController from "../controllers/LogadouroController";

const router = Router();

router.post("/create", LogadouroController.create);
router.get("/getAll", LogadouroController.getAll);
router.get("/getById/:id", LogadouroController.getById);
router.put("/update/:id", LogadouroController.update);
router.delete("/delete/:id", LogadouroController.delete);

export default router;
