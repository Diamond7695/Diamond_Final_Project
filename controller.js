const music = require("./server/db.json")


module.exports={
    getMusic: (req,res)=>{
        res.status(200).send(music)
    },
    deleteSongs: (req,res)=>{
        let{id} = req.params
        let index = music.findIndex(elem => +elem.id == +id)
        music.splice(index,1)
        res.status(200).send(music)
    }
}