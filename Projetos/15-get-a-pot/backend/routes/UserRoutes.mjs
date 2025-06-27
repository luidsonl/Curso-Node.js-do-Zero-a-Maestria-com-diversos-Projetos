import express from 'express'
import UserController from '../controllers/UserController.mjs'
import verifyToken from '../middlewares/verifyToken.mjs';
import imageUploadMiddleware from '../middlewares/imageUploadMiddleware.mjs';

const UserRoutes = express.Router();

UserRoutes.post('/register', UserController.register);
UserRoutes.post('/login', UserController.login);
UserRoutes.get('/check', UserController.check);
UserRoutes.get('/:id', UserController.getById);
UserRoutes.patch('/update', verifyToken, imageUploadMiddleware, UserController.update)

export default UserRoutes