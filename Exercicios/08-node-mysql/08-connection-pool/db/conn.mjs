import mysql from 'mysql'
import connection from '../connection.mjs'


const pool = mysql.createPool({
    connectionLimit: 10,
    ...connection,
})

export default pool