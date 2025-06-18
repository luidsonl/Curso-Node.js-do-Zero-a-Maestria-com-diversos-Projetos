import express from 'express'
import UserController from '../controllers/UserController.mjs'
import verifyToken from '../helpers/verifyToken.mjs';
import profilePictureUpload from '../helpers/profilePictureUpload.mjs';

const UserRoutes = express.Router();

UserRoutes.post('/register', UserController.register);
UserRoutes.post('/login', UserController.login);
UserRoutes.get('/check', UserController.check);
UserRoutes.get('/:id', UserController.getById);
UserRoutes.patch('/update', verifyToken, profilePictureUpload().single('image'), UserController.updarte)

export default UserRoutes