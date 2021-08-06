import * as controller from "../controllers/userController";
import { Router } from "express";

const router = Router();

router.post("/sign-up", controller.signup);

export { router as userRouter};