import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export type DeviceTypeAttributes = {
  id: number;
  title: string;
};

export interface DeviceTypeModel
  extends Model<DeviceTypeAttributes>,
    DeviceTypeAttributes {}
export class DeviceType extends Model<DeviceTypeModel, DeviceTypeAttributes> {}
export type DeviceTypeStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): DeviceTypeModel;
};

export function DeviceTypeFactory(sequelize: Sequelize): DeviceTypeStatic {
  return <DeviceTypeStatic>sequelize.define("deviceTypes", {
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
