import express from "express";
import ThoughtController from "../controllers/ThoughtController.mjs";
import checkAuth from "../helpers/auth.mjs";

const router = express.Router()


//controller
router.get('/add',checkAuth, ThoughtController.createThought)
router.post('/add',checkAuth, ThoughtController.createThoughtPost)
router.get('/dashboard',checkAuth, ThoughtController.dashboard)
router.get('/', ThoughtController.showThoughts)

export default router