import express from "express"
import exphbs from "express-handlebars"
import session from "express-session"
import FileStoreModule from "session-file-store"
import flash from "express-flash"
import conn from "./db/conn.mjs"

const FileStore = FileStoreModule(session);

const app = express()

conn.sync().then(()=>{
    app.listen(3000)
}).catch((err)=>{
    console.log(err)
})