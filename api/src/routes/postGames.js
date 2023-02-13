const { Router } = require('express');
const { Videogame, Genre } = require('../db.js')

const router = Router();

router.post('/videogames', async (req,res)=>{
    const {name, description, release, rating, platforms, image, genres} = req.body
    const NumRating = parseInt(rating)
    try {
        //creando un registro en la tabla de videogames
        console.log(name)
        console.log(description)
        console.log(release)
        console.log(NumRating)
        console.log(platforms)
        console.log(image)
        console.log(genres)
        const prueba = await Videogame.create({ 
            name,
            description,
            release,
            NumRating,
            platforms,
            image
        });
        console.log(prueba)
        //genres --> es un array porque un juego puede pertenecer a varios generos
        // se usa findOrCreate porque si el genero ya existe en la tabla no es necesario 
        // volverlo a crear.
        // en where --> se usa la condicion de buscar el 
        // genres.forEach(async element => {
        //     const [genre,created] = await Genre.findOrCreate({ 
        //         where: { 
        //             name: [element],
        //         }});

        //     await prueba.addGenre(genre)
        //     console.log(created)
        // });

        res.status(200).send(prueba)
    } catch (error) {
        res.status(404).send(error)
    }
    
})

module.exports = router;