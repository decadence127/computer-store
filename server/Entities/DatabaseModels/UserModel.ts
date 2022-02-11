import { Model, Optional } from "sequelize";

type UserAttributes = {
  id: number;
  email: string;
  password: string;
};

class UserModel {}
