import { Router } from "express";
import PaisController from "../controllers/PaisController";

const router = Router();

router.post("/create", PaisController.create);
router.get("/getAll", PaisController.getAll);
router.get("/getById/:id", PaisController.getById);
router.put("/update/:id", PaisController.update);
router.delete("/delete/:id", PaisController.delete);

export default router;
