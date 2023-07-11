import { raw } from "mysql2";
import Thought from "../models/Thought.mjs";
import User from "../models/User.mjs";

class ThoughtController{

    static async showThoughts(req, res){

        const thoughtsData = await Thought.findAll(
            {include: User}
        )

        const thoughts = thoughtsData.map((result)=>result.get({plain: true}))

        
        res.render('thoughts/home', { thoughts })
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
        
        let emptyThoughts = false
        if(thoughts.length === 0){
            emptyThoughts = true
        }


        res.render('thoughts/dashboard', {thoughts, emptyThoughts})
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
    static async updateThought(req, res){
        const id = req.params.id
        const thought = await Thought.findOne({where: {id: id}, raw: true})
        
        res.render('thoughts/edit', { thought })

    }

    static async updateThoughtSave(req, res){
        const id = req.body.id
        const thought = {
            title: req.body.title,
        }

        try{
            await Thought.update(thought, {where: {id: id}})

            req.flash('message', 'Pensamento atualizado com sucesso!')

                req.session.save(()=>{
                    res.redirect('/dashboard')
                })

        }catch(err){
            console.log(err)
        }
        
    }
}

export default ThoughtController