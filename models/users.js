import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const Users = sequelize.define(
    'users',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        name:{
            type:DataTypes.CHAR(70),
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true,
            },
        }

    }
)