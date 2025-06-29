import express from 'express'
import UserController from '../controllers/UserController.mjs'
import verifyTokenMiddleware from '../middlewares/verifyTokenMiddleware.mjs';
import profilePictureUploadMiddleware from '../middlewares/profilePictureUploadMiddleware.mjs';

const UserRoutes = express.Router();

UserRoutes.post('/register', UserController.register);
UserRoutes.post('/login', UserController.login);
UserRoutes.get('/check', UserController.check);
UserRoutes.get('/:id', UserController.getById);
UserRoutes.patch('/update', verifyTokenMiddleware, profilePictureUploadMiddleware, UserController.update)

export default UserRoutes