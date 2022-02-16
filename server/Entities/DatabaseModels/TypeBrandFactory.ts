import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export type TypeBrandAttributes = {
  id: number;
};

export interface TypeBrandModel
  extends Model<TypeBrandAttributes>,
    TypeBrandAttributes {}
export class TypeBrand extends Model<TypeBrandModel, TypeBrandAttributes> {}
export type TypeBrandStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): TypeBrandModel;
};

export function TypeBrandFactory(sequelize: Sequelize): TypeBrandStatic {
  return <TypeBrandStatic>sequelize.define("typeBrandRelation", {
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
