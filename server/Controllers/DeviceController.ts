import { Request, NextFunction, Response } from "express";
interface IDeviceController {
  getAllDevices: (req: Request, res: Response, next: NextFunction) => Response;
}

class DeviceController implements IDeviceController {
  getAllDevices(req: Request, res: Response, next: NextFunction) {
    return res.send(["sdd", "dsad"]);
  }
}
export const deviceController = new DeviceController();
