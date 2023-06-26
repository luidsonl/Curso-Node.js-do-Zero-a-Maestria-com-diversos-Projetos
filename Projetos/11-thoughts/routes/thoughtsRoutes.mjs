import express from "express";
import ThoughtController from "../controllers/ThoughtController.mjs";


const router = express.Router()

//controller
router.get('/', ThoughtController.showThoughts)

export default router