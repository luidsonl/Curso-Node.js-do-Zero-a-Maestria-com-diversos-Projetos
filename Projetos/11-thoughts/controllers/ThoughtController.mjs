import Thought from "../models/Thought.mjs";
import User from "../models/User.mjs";

class ThoughtController{
    static async showThoughts(req, res){
        res.render('thoughts/home')
    }

    static async dashboard(req, res){
        const userId = req.session.userId

        const user = await User.findOne({
            where: {
                id: userId
            },
            include: Thought,
            plain: true
        })

        if(!user){
            res.redirect('/login')
        }

        const thoughts = user.Thoughts.map((result)=>result.dataValues)
        

        res.render('thoughts/dashboard', {thoughts})
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
    static async removeThought(req, res){
        const id = req.body.id
        const userId = req.session.userId

        try{
            await Thought.destroy({where: {id:id, UserId: userId}})

            req.flash('message', 'Pensamento excluído com sucesso!')

            req.session.save(()=>{
                res.redirect('/dashboard')
            })


        }catch(err){
            console.log(err)
        }
        
    }
}

export default ThoughtController