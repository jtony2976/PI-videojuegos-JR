const { Router } = require('express');
//Nos traemos el controlador que se encargara de traer la lista de generos
const { getTodoLosGeneros } = require('../controllers/getGenres.js');


const router = Router();

router.get('/genres', async (req,res)=>{
    try {
        const genres = await getTodoLosGeneros()
        res.status(200).json(genres)
    } catch (error) {
        res.status(400).send("F")
    }
    
})


module.exports = router;