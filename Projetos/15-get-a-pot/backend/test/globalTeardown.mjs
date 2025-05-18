import conn from "../db/conn.mjs";

export default async () => {
    if (conn.connection.readyState !== 0) {
        await conn.connection.close();
    }

};