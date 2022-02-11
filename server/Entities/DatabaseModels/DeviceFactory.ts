import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export type DeviceAttributes = {
  id: number;
  title: string;
  price: string;
  img: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface DeviceModel
  extends Model<DeviceAttributes>,
    DeviceAttributes {}
export class Device extends Model<DeviceModel, DeviceAttributes> {}
export type DeviceStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): DeviceModel;
};

export function DeviceFactory(sequelize: Sequelize): DeviceStatic {
  return <DeviceStatic>sequelize.define("devices", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      unique: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
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
