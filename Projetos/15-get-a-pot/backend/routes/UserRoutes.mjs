import express from 'express'
import UserController from '../controllers/UserController.mjs'
import verifyToken from '../helpers/verifyToken.mjs';
import profilePictureUpload from '../helpers/profilePictureUpload.mjs';

const UserRoutes = express.Router();

UserRoutes.post('/register', UserController.register);
UserRoutes.post('/login', UserController.login);
UserRoutes.get('/checkuser', UserController.checkUser);
UserRoutes.get('/:id', UserController.getUserById);
UserRoutes.patch('/edit', verifyToken, profilePictureUpload().single('image'), UserController.editUser)

export default UserRoutes