import Task from "../models/Task.mjs";

class TaskController{
    static createTask(req, res){
        res.render('tasks/create')
    }

    static showTasks(req, res){
        res.render('tasks/all')
    }

    static async createTaskSave(req, res){
        const task = {
            title: req.body.title,
            description: req.body.description,
            done: false
        }
        await Task.create(task)

        res.redirect('/tasks')
    }
}

export default TaskController