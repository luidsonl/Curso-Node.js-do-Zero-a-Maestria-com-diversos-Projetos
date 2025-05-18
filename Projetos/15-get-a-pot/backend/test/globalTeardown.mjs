import conn from "../db/conn.mjs";
import app from "../index.mjs";

export default async () => {
    if (conn.connection.readyState !== 0) {
        await conn.connection.close();
    }
    app.close()

};