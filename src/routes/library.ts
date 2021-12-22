import { Router } from "express";
import LibraryController from "../controllers/LibraryController";
import { checkAuthToken } from "../middlewares/checkAuthToken";

const router = Router();

router.get("/", LibraryController.getAll);

router.get("/:id", LibraryController.getOneById);

router.post("/add", [checkAuthToken], LibraryController.add);

router.post("/reset", [checkAuthToken], LibraryController.reset);

export default router;