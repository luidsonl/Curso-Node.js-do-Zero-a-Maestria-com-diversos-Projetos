import express from 'express'
import UserController from '../controllers/UserController.mjs'

const UserRoutes = express.Router()

UserRoutes.post('/', UserController.register)

export default UserRoutes