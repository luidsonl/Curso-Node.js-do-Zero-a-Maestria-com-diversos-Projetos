import session from 'express-session';
import FileStoreModule from "session-file-store"
import path from 'path';
import os from 'os';

const FileStore = FileStoreModule(session);

const sessionMiddleware = session({
    name: 'session',
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
        logFn: function () {},
        path: path.join(os.tmpdir(), 'sessions') // Caminho para salvar os arquivos de sessão
    }),

    cookie:{
        secure:false,
        maxAge:3600000,
        expires: new Date(Date.now() + 3600000),
        httpOnly:true
    }
});


/*
const test= path.join(os.tmpdir(), 'sessions')
console.log(test)
*/

export default sessionMiddleware;
