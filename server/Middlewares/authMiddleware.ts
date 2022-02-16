import { ApiError } from "../Exceptions/ApiError";
import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(ApiError.UnauthorizedError());
    }
    const accessToken = authHeader.split(" ")[1];
    // const userData = tokenService.validateAccessToken(accessToken);
    // if (!userData) {
    //   return next(ApiError.UnauthorizedError());
    // }
  } catch (error) {
    return next(ApiError.UnauthorizedError());
  }
};
