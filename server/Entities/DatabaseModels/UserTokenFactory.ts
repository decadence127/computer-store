import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export type UserTokenAttributes = {
  id: number;
  refreshToken: string;
  userId?: number;
};

export interface UserTokenModel
  extends Model<UserTokenAttributes>,
    UserTokenAttributes {}
export class UserToken extends Model<UserTokenModel, UserTokenAttributes> {}
export type UserTokenStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserTokenModel;
};

export function UserTokenFactory(sequelize: Sequelize): UserTokenStatic {
  return <UserTokenStatic>sequelize.define("userTokens", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });
}
