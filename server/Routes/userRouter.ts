import {
  logoutUserRoute,
  refreshUserTokenRoute,
  registerUserRoute,
  loginUserRoute,
} from "../Utils/Constants/pageRoutes";
import { Router } from "express";
import { userController } from "../Controllers/UserController";
export const userRouter = Router();

userRouter.post(loginUserRoute, userController.login);
userRouter.post(registerUserRoute, userController.register);
userRouter.get(refreshUserTokenRoute, userController.refresh);
userRouter.get(logoutUserRoute, userController.logout);
