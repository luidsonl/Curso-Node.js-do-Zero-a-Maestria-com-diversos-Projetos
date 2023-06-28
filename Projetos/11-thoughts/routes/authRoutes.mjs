import express from "express";
import AuthController from "../controllers/AuthController.mjs";

const router = express.Router()

router.get('/login', AuthController.login)
router.get('/register', AuthController.register)

export default router