import express from "express";
import TaskController from "../controllers/TaskController.mjs";

const router = express.Router()

//rotas post
router.post('/add', TaskController.createTaskSave)
router.post('/remove', TaskController.removeTask)
router.post('/edit', TaskController.applyUpdateTask)
router.post('/updatestatus', TaskController.toggleTaskStatus)

//rotas get
router.get('/add', TaskController.createTask)
router.get('/edit/:id', TaskController.updateTask)
router.get('/', TaskController.showTasks)

export default router