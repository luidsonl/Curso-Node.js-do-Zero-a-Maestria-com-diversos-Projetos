import Thought from "../models/Thought.mjs";
import User from "../models/User.mjs";

class ThoughtController{
    static async showThoughts(req, res){
        res.render('thoughts/home')
    }

    static async dashboard(req, res){
        res.render('thoughts/dashboard')
    }
    
    static async createThought(req, res){
        res.render('thoughts/create')
    }
    static async createThoughtPost(req, res){
        const thought = {
            title: req.body.title,
            UserId: req.session.userId
        }

        try{
            await Thought.create(thought)

            req.flash('message', 'Pensamento criado com sucesso!')

            req.session.save(()=>{
                res.redirect('/dashboard')
            })

        }catch(err){
            console.log(err)
        }

        
    }
}

export default ThoughtController