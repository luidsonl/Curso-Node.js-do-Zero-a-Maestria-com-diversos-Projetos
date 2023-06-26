import Thought from "../models/Thought.mjs";
import User from "../models/User.mjs";

class ThoughtController{
    static async showThoughts(req, res){
        res.render('thoughts/home')
    }
}

export default ThoughtController