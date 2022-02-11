import { userRoute } from "./../Utils/Constants/pageRoutes";
import { Router } from "express";
import { userRouter } from "./userRouter";
export const router = Router();

router.use(userRoute, userRouter);
