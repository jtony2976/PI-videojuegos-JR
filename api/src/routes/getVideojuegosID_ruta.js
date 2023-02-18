const { Router } = require('express');
const { getJuegoByID } = require('../controllers/getListadoVideojuegosById.js')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/videogames/:id', async (req,res)=>{
    const {id} = req.params
    
    try {
        if(id){
            const InfoById= await getJuegoByID(id)
            res.status(200).json(InfoById)
        }
    } catch (error) {
        res.status(404).send(error)
    }

})



module.exports = router;