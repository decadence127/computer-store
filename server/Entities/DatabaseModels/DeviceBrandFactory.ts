import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export type DeviceBrandAttributes = {
  id: number;
  title: string;
};

export interface DeviceBrandModel
  extends Model<DeviceBrandAttributes>,
    DeviceBrandAttributes {}
export class DeviceBrand extends Model<
  DeviceBrandModel,
  DeviceBrandAttributes
> {}
export type DeviceBrandStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): DeviceBrandModel;
};

export function DeviceBrandFactory(sequelize: Sequelize): DeviceBrandStatic {
  return <DeviceBrandStatic>sequelize.define("deviceBrands", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });
}
