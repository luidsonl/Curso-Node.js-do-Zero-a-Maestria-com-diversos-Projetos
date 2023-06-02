import Task from "../models/Task.mjs";

class TaskController{
    static createTask(req, res){
        res.render('tasks/create')
    }

    static showTasks(req, res){
        res.render('tasks/all')
    }
}

export default TaskController