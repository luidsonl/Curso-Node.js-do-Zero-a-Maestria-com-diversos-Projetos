import { DataTypes } from "sequelize";
import db from '../db/conn.mjs'
import User from "./User.mjs";

const Address = db.define('address', {
    street:{
        type: DataTypes.STRING,
        required: true,
    },
    number:{
        type: DataTypes.STRING,
        required: true,
    },
    city:{
        type: DataTypes.STRING,
        required: true,
    },
    state:{
        type: DataTypes.STRING,
        required: true,
    },
    country:{
        type: DataTypes.STRING,
        required: true,
    },   
})

Address.belongsTo(User)

export default Address