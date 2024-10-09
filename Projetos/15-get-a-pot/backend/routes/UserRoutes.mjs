import express from 'express'
import UserController from '../controllers/UserController.mjs'

const UserRoutes = express.Router()

UserRoutes.post('/register', UserController.register)

UserRoutes.post('/login', UserController.login)

export default UserRoutes