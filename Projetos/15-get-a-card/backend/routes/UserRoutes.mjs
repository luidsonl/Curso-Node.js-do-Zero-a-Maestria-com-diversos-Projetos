import express from 'express'
import UserController from '../controllers/UserController.mjs'
import verifyTokenMiddleware from '../middlewares/verifyTokenMiddleware.mjs';


const UserRoutes = express.Router();

UserRoutes.post('/register', UserController.register);
UserRoutes.post('/login', UserController.login);
UserRoutes.get('/check', UserController.check);
UserRoutes.get('/:id', UserController.getById);
UserRoutes.patch('/update', verifyTokenMiddleware, UserController.update)

export default UserRoutes