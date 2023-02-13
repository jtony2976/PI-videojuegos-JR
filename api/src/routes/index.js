const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// Todos estos routers vienen del folder 'api/src/routes'
const getVideojuegos = require('./getVideojuegos_ruta.js')
// const getGamesId = require('./getGamesId.js')
const getGenre = require('./getGenre_ruta.js')
const postGames = require('./postGames.js')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/', getVideojuegos)
// router.use('/', getGamesId)
router.use('/', getGenre)
router.use('/', postGames)


module.exports = router;
