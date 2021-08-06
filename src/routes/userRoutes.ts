import * as controller from "../controllers/userController";
import { Router } from "express";

const router = Router();

router.post("/sign-up", controller.signup);
router.post("/sign-in", controller.signin);

export { router as userRouter};