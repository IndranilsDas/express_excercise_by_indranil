import { Sequelize, DataTypes } from "sequelize";
import  dotdev  from "dotenv";

dotdev.config()

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.USER,
    process.env.PASS,
    {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);
export default sequelize