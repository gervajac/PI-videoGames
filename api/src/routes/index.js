const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogames = require('./videogames.js');
const videogame = require('./videogame.js');
const genres = require('./genres.js');
const platforms = require('./platforms.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', videogames);
router.use('/videogame', videogame);
router.use('/genres', genres);
router.use('/platforms', platforms);


module.exports = router;