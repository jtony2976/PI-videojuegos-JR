const { Router } = require('express');
const { Videogame, Genre } = require('../db.js')

const router = Router();

router.post('/videogame', async (req,res)=>{
    //Recibimos los datos desde el formulario por el body
    const { name, description, release, rating, platforms, image, genres } = req.body;

    //a cada string se le añade la , para separar cada elemento
    let platformString = platforms.join(', ')
  
    //creamos el registro en la tabla de videogames
    let juegoCreado = await Videogame.create({
      name,
      description,
      release,
      rating,
      image,
      platforms: platformString,
      source: "Db"
    })

    //para ver la info del juego creado y genres
    console.log(juegoCreado)
    console.log(genres)

    //la variable 'genres' pasada por body sera un array
    genres.forEach(async (element) => {
        /*
            SELECT 'id', 'name'
            FROM 'genres' As 'genre'
            WHERE 'genre'.'name' = element
            LIMIT 1;
        */
       // cambiar a findOrCreate
        let generosDelJuego = await Genre.findOne(
                { where: { name: element } }
            )
        //Como entre las tablas 'videogame' y 'genre' hay relacion M-to-M, se puede usar MIXIN
        //para agregar la lista de genros en el campo de 
        await juegoCreado.addGenre(generosDelJuego)
    })
      res.send('Videogame created successfully!')
      
})

module.exports = router;