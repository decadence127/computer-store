import sequelize, { Dialect } from "sequelize";

import { DeviceBrandFactory } from "../Entities/DatabaseModels/DeviceBrandFactory";
import { CartFactory } from "../Entities/DatabaseModels/CartFactory";
import { UserFactory } from "../Entities/DatabaseModels/UserFactory";
import { dbCredentials } from "../Utils/Constants/dbCredentials";
import { DeviceTypeFactory } from "../Entities/DatabaseModels/DeviceTypeFactory";
import { UserTokenFactory } from "../Entities/DatabaseModels/UserTokenFactory";
import { DeviceFactory } from "../Entities/DatabaseModels/DeviceFactory";
import { DeviceDescriptionFactory } from "../Entities/DatabaseModels/DeviceDescriptionFactory";
import { RatingFactory } from "../Entities/DatabaseModels/RatingFactory";
import { CartDeviceFactory } from "../Entities/DatabaseModels/CartDeviceFactory";
import { TypeBrandFactory } from "../Entities/DatabaseModels/TypeBrandFactory";

export const dbConfig = new sequelize.Sequelize(
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

export const User = UserFactory(dbConfig);
export const Cart = CartFactory(dbConfig);
export const CartDevice = CartDeviceFactory(dbConfig);
export const Device = DeviceFactory(dbConfig);
export const UserToken = UserTokenFactory(dbConfig);
export const DeviceBrand = DeviceBrandFactory(dbConfig);
export const DeviceType = DeviceTypeFactory(dbConfig);
export const DeviceDesc = DeviceDescriptionFactory(dbConfig);
export const Rating = RatingFactory(dbConfig);
export const TypeBrand = TypeBrandFactory(dbConfig);

User.hasOne(UserToken);
UserToken.belongsTo(User);

User.hasOne(Cart);
Cart.belongsTo(Cart);

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
