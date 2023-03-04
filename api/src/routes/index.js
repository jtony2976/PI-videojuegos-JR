const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// Todos estos routers vienen del folder 'api/src/routes'
const getVideojuegos = require('./getVideojuegos_ruta.js')
const getVideojuegosByID = require('./getVideojuegosID_ruta.js')
const getGenre = require('./getGenre_ruta.js')
const postGames = require('./postGames.js')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', getVideojuegos)
router.use('/videogame', getVideojuegosByID)
router.use('/genres', getGenre)
router.use('/videogames', postGames)


module.exports = router;
