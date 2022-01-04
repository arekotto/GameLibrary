import { Router } from "express";
import UserController from "../controllers/UserController";
import { checkAuthToken } from "../middlewares/checkAuthToken";

const router = Router();

router.get("/", [checkAuthToken], UserController.getAll);

router.get("/:id", [checkAuthToken], UserController.getOneById);

router.post("/add", [checkAuthToken], UserController.add);

router.post("/:userId/addGame/:gameId", [checkAuthToken], UserController.addGame);

router.delete("/:userId/removeGame/:gameId", [checkAuthToken], UserController.removeGame);

export default router;