import { UserToken } from "./../Entities/DatabaseModels/UserTokenFactory";
import { TokenData } from "../Entities/DataTransferObjects/TokenData";
import { UserData } from "../Entities/DataTransferObjects/UserData";
import jwt from "jsonwebtoken";
require("dotenv").config();
class TokenService {
  generateToken(payload: UserData): TokenData {
    try {
      const accessToken = jwt.sign(
        payload,
        process.env.JWT_SECRET_ACCESS_TOKEN,
        {
          expiresIn: "30m",
        }
      );
      const refreshToken = jwt.sign(
        payload,
        process.env.JWT_SECRET_REFRESH_TOKEN,
        {
          expiresIn: "30d",
        }
      );
      return { refreshToken, accessToken };
    } catch (e) {
      throw e;
    }
  }
  async saveToken(userId: string, refreshToken: string) {
    const tokenCandidate = await UserToken.findOne({
      where: { userId },
    });
  }
}
