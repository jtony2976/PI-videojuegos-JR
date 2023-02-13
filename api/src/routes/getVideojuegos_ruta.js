const { Router } = require('express');
const { getListadoVideojuegosByName } = require('../controllers/getListadoVideojuegosByName.js');
const { getListadoVideojuegos } = require('../controllers/getListadoVideojuegos.js')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/videogames', async (req,res)=>{
    //variable por si se pasa por query el nombre (name) del videojuego para cubrir la ruta
    const {name} = req.query
    try {
        //Si se especifico un nombre de videojuego, mandamos llamar el controlador getJuegosPorNombre y
        //se pasara como argumento a esa funcion el nombre traido por query del body
        if (name){
            const InfoByName = await getListadoVideojuegosByName(name)
            if (!InfoByName.length) throw new Error ("No existe el juego")
            res.status(200).json(InfoByName)
        }else{
            console.log("no se paso nombre por query")
            //en caso de que no se haya pasado un nombre por query de un juego en particular
            //llamamos el controlador para traernos un listado de los videojuegos
            const listadoVideojuegos = await getListadoVideojuegos()
            res.status(200).json(listadoVideojuegos)
        }
    } catch (error) {
        res.status(404).send(error.message)
    }

})



module.exports = router;