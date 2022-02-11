import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export type RatingAttributes = {
  id: number;
  rate: number;
};

export interface RatingModel
  extends Model<RatingAttributes>,
    RatingAttributes {}
export class Rating extends Model<RatingModel, RatingAttributes> {}
export type RatingStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): RatingModel;
};

export function RatingFactory(sequelize: Sequelize): RatingStatic {
  return <RatingStatic>sequelize.define("ratings", {
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
