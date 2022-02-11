import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export type CartAttributes = {
  id: number;
};

export interface CartModel extends Model<CartAttributes>, CartAttributes {}
export class Cart extends Model<CartModel, CartAttributes> {}
export type CartStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): CartModel;
};

export function CartFactory(sequelize: Sequelize): CartStatic {
  return <CartStatic>sequelize.define("carts", {
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
