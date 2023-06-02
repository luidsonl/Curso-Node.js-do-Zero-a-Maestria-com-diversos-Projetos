import { DataTypes } from "sequelize";
import db from '../db/conn.mjs'

const Task = db.define('task',{
    title:{
        type: DataTypes.STRING,
        required: true
    },
    description:{
        type: DataTypes.STRING,
        required: true
    },
    done:{
        type: DataTypes.BOOLEAN,
        required: true
    },
})

export default Task