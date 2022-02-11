import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export type DeviceDescriptionAttributes = {
  id: number;
  description: string;
};

export interface DeviceDescriptionModel
  extends Model<DeviceDescriptionAttributes>,
    DeviceDescriptionAttributes {}
export class DeviceDescription extends Model<
  DeviceDescriptionModel,
  DeviceDescriptionAttributes
> {}
export type DeviceDescriptionStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): DeviceDescriptionModel;
};

export function DeviceDescriptionFactory(
  sequelize: Sequelize
): DeviceDescriptionStatic {
  return <DeviceDescriptionStatic>sequelize.define("deviceDescriptions", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
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
