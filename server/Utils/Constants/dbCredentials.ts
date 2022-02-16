require("dotenv").config();

export const dbCredentials = {
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  name: process.env.DB_NAME,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
};
