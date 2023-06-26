import { DataTypes } from "sequelize";
import db from "../db/conn.mjs"
import User from "./User.mjs";



const Thought = db.define('Thought' ,
{
    title:{
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    }
})

Thought.belongsTo(User)
User.hasMany(Thought)

export default Thought