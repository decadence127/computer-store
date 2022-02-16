import { RatingStatic } from "./../Entities/DatabaseModels/RatingFactory";
import { DeviceTypeStatic } from "./../Entities/DatabaseModels/DeviceTypeFactory";
import { DeviceBrandStatic } from "./../Entities/DatabaseModels/DeviceBrandFactory";
import { UserTokenStatic } from "./../Entities/DatabaseModels/UserTokenFactory";
import { CartDeviceStatic } from "./../Entities/DatabaseModels/CartDeviceFactory";
import { DeviceStatic } from "./../Entities/DatabaseModels/DeviceFactory";
import { CartStatic } from "./../Entities/DatabaseModels/CartFactory";
import { UserStatic } from "./../Entities/DatabaseModels/UserFactory";
import { Sequelize, Dialect } from "sequelize";

import { DeviceBrandFactory } from "../Entities/DatabaseModels/DeviceBrandFactory";
import { CartFactory } from "../Entities/DatabaseModels/CartFactory";
import { UserFactory } from "../Entities/DatabaseModels/UserFactory";
import { dbCredentials } from "../Utils/Constants/dbCredentials";
import { DeviceTypeFactory } from "../Entities/DatabaseModels/DeviceTypeFactory";
import { UserTokenFactory } from "../Entities/DatabaseModels/UserTokenFactory";
import { DeviceFactory } from "../Entities/DatabaseModels/DeviceFactory";
import {
  DeviceDescriptionFactory,
  DeviceDescriptionStatic,
} from "../Entities/DatabaseModels/DeviceDescriptionFactory";
import { RatingFactory } from "../Entities/DatabaseModels/RatingFactory";
import { CartDeviceFactory } from "../Entities/DatabaseModels/CartDeviceFactory";
import {
  TypeBrandFactory,
  TypeBrandStatic,
} from "../Entities/DatabaseModels/TypeBrandFactory";

export interface DB {
  sequelize: Sequelize;
  User: UserStatic;
  Cart: CartStatic;
  Device: DeviceStatic;
  CartDevice: CartDeviceStatic;
  UserToken: UserTokenStatic;
  DeviceBrand: DeviceBrandStatic;
  DeviceType: DeviceTypeStatic;
  DeviceDesc: DeviceDescriptionStatic;
  Rating: RatingStatic;
  TypeBrand: TypeBrandStatic;
}

export const sequelize = new Sequelize(
  dbCredentials.name,
  dbCredentials.user,
  dbCredentials.password,
  {
    port: Number(dbCredentials.port),
    host: dbCredentials.host,
    dialect: dbCredentials.dialect as Dialect,
    pool: {
      min: 0,
      max: 20,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const User = UserFactory(sequelize);
const Cart = CartFactory(sequelize);
const CartDevice = CartDeviceFactory(sequelize);
const Device = DeviceFactory(sequelize);
const UserToken = UserTokenFactory(sequelize);
const DeviceBrand = DeviceBrandFactory(sequelize);
const DeviceType = DeviceTypeFactory(sequelize);
const DeviceDesc = DeviceDescriptionFactory(sequelize);
const Rating = RatingFactory(sequelize);
const TypeBrand = TypeBrandFactory(sequelize);

User.hasOne(UserToken);
UserToken.belongsTo(User);

User.hasOne(Cart);
Cart.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Device.belongsToMany(Cart, { through: CartDevice });
Cart.belongsToMany(Device, { through: CartDevice });

DeviceType.hasMany(Device);
Device.belongsTo(DeviceType);

DeviceBrand.hasMany(Device);
Device.belongsTo(DeviceBrand);

Device.hasMany(Rating);
Rating.belongsTo(Device);

DeviceType.belongsToMany(DeviceBrand, { through: TypeBrand });
DeviceBrand.belongsToMany(DeviceType, { through: TypeBrand });

export const db: DB = {
  sequelize,
  User,
  Cart,
  CartDevice,
  Device,
  UserToken,
  DeviceBrand,
  DeviceType,
  DeviceDesc,
  Rating,
  TypeBrand,
};
