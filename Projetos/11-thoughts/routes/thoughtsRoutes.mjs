import express from "express";
import ThoughtController from "../controllers/ThoughtController.mjs";
import checkAuth from "../helpers/auth.mjs";

const router = express.Router()


//controller
router.get('/add', checkAuth, ThoughtController.createThought)
router.post('/add', checkAuth, ThoughtController.createThoughtPost)
router.get('/edit/:id', checkAuth, ThoughtController.updateThought)
router.post('/edit', checkAuth, ThoughtController.updateThoughtSave)
router.get('/dashboard', checkAuth, ThoughtController.dashboard)
router.post('/remove', checkAuth, ThoughtController.removeThought)
router.get('/', ThoughtController.showThoughts)

export default router