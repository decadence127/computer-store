import { TokenData } from "./../Entities/DataTransferObjects/TokenData";
import { CartService } from "./CartService";
import { ApiError } from "./../Exceptions/ApiError";
import { DB } from "./../Database/dbConfig";
import {
  UserToken,
  UserTokenAttributes,
  UserTokenModel,
} from "./../Entities/DatabaseModels/UserTokenFactory";
import { UserData } from "../Entities/DataTransferObjects/UserData";
import jwt from "jsonwebtoken";
require("dotenv").config();
export class TokenService {
  constructor(private db: DB, private cartService: CartService) {
    this.saveToken = this.saveToken.bind(this);
    this.findToken = this.findToken.bind(this);
    this.generateToken = this.generateToken.bind(this);
    this.refresh = this.refresh.bind(this);
    this.removeToken = this.removeToken.bind(this);
    this.validateRefreshToken = this.validateRefreshToken.bind(this);
    this.validateAccessToken = this.validateAccessToken.bind(this);
  }
  public generateToken(payload: UserData): TokenData {
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
  public async saveToken(
    userId: number,
    refreshToken: string
  ): Promise<UserTokenModel> {
    try {
      const tokenCandidate = await this.db.UserToken.findOne({
        where: { userId },
      });
      if (tokenCandidate) {
        tokenCandidate.refreshToken = refreshToken;
        return tokenCandidate.save();
      }
      const token = await this.db.UserToken.create({ userId, refreshToken });
      return token;
    } catch (e) {
      throw e;
    }
  }
  public async removeToken(refreshToken: string): Promise<void> {
    try {
      await this.db.UserToken.destroy({
        where: refreshToken as unknown as UserTokenAttributes,
      });
    } catch (e) {
      throw e;
    }
  }
  public async findToken(refreshToken: string): Promise<UserTokenModel> {
    try {
      return await this.db.UserToken.findOne({
        where: refreshToken as unknown as UserTokenAttributes,
      });
    } catch (e) {
      throw e;
    }
  }
  public validateAccessToken(token: string): UserData {
    try {
      return jwt.verify(token, process.env.JWT_SECRET_ACCESS_TOKEN) as UserData;
    } catch (e) {
      return null;
    }
  }
  public validateRefreshToken(token: string): UserData {
    try {
      return jwt.verify(
        token,
        process.env.JWT_SECRET_REFRESH_TOKEN
      ) as UserData;
    } catch (e) {
      return null;
    }
  }
  public async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const decodedToken = this.validateRefreshToken(refreshToken);
    const token = await this.findToken(refreshToken);
    if (!decodedToken || !token) {
      throw ApiError.UnauthorizedError();
    }
    const userModel = await this.db.User.findByPk(decodedToken.id);
    const cartModel = await this.cartService.getCardByUserId(decodedToken.id);
    const userData = { ...userModel, cartId: cartModel.id } as UserData;
    const tokenData = this.generateToken(userData);
    await this.saveToken(userData.id, tokenData.refreshToken);
    return {
      ...tokenData,
      user: userData,
    };
  }
}
