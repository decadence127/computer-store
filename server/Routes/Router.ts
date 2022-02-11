import { deviceRoute, userRoute } from "../Utils/Constants/pageRoutes";
import { Router } from "express";
import { userRouter } from "./userRouter";
import { deviceRouter } from "./deviceRouter";
export const router = Router();

router.use(userRoute, userRouter);
router.use(deviceRoute, deviceRouter);
