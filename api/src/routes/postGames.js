const { Router } = require('express');
const { Videogame, Genre } = require('../db.js')

const router = Router();

router.post('/', async (req,res)=>{
    //Recibimos los datos desde el formulario por el body
    const { name, description, release, rating, platforms, image, genres } = req.body;

    //var temporal para guardar en una string todas las plataformas que se pasan por formulario
    let platformString = ""

    console.log("name: ", typeof name)
    console.log("description: ", typeof description)
    console.log("release: ", typeof release)
    console.log("rating: ", typeof rating)
    console.log("platforms: ", typeof platforms)
    console.log("image: ", typeof image)
    console.log("genres: ", typeof genres)
  
    console.log(platforms.length)

    platforms.forEach(element => platformString.concat(', ', element));

    //a cada string se le añade la , para separar cada elemento
    //platformString = platforms.join(',')

    console.log(platformString)
    console.log("platformString: ", typeof platformString)

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
    console.log("-----------------------------------------")
    console.log("-----------------------------------------")
    console.log(genres)

    //la variable 'genres' pasada por body sera un array
    genres.forEach(async (element) => {
        /*
            SELECT 'id', 'name'
            FROM 'genres' As 'genre'
            WHERE 'genre'.'name' = element
            LIMIT 1;
        */
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