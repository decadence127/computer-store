import { getAllDevicesRoute } from "../Utils/Constants/pageRoutes";
import { Router } from "express";
import { deviceController } from "../Controllers/DeviceController";
export const deviceRouter = Router();

deviceRouter.get(getAllDevicesRoute, deviceController.getAllDevices);
