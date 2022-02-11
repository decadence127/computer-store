import { Request, NextFunction, Response } from "express";
interface IUserController {
  login: (req: Request, res: Response, next: NextFunction) => Response;
  logout: (req: Request, res: Response, next: NextFunction) => Response;
  register: (req: Request, res: Response, next: NextFunction) => Response;
  validate: (req: Request, res: Response, next: NextFunction) => Response;
  refresh: (req: Request, res: Response, next: NextFunction) => Response;
  //Auth region ends
}

class UserController implements IUserController {
  login(req: Request, res: Response, next: NextFunction) {
    return res.send("user");
  }
  logout(req: Request, res: Response, next: NextFunction) {
    return res.send("user");
  }
  register(req: Request, res: Response, next: NextFunction) {
    return res.send("user");
  }
  validate(req: Request, res: Response, next: NextFunction) {
    return res.send("user");
  }
  refresh(req: Request, res: Response, next: NextFunction) {
    return res.send("user");
  }
}
export const userController = new UserController();
