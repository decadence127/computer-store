import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export type CartDeviceAttributes = {
  id: number;
};

export interface CartDeviceModel
  extends Model<CartDeviceAttributes>,
    CartDeviceAttributes {}
export class CartDevice extends Model<CartDeviceModel, CartDeviceAttributes> {}
export type CartDeviceStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): CartDeviceModel;
};

export function CartDeviceFactory(sequelize: Sequelize): CartDeviceStatic {
  return <CartDeviceStatic>sequelize.define("cartDeviceRelation", {
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
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });
}
