require("dotenv").config();
const { API_KEY } = process.env;

//utilizamos axios para hacer el llamado al API
const axios = require('axios');
const { Videogame, Genre } = require('../db.js');

const getInfoDelaAPI = async () => {
    let arrayDataVideogames = []
    try {
        let APIresultado = `https://api.rawg.io/api/games?key=${API_KEY}`

        for (let index = 0; index < 5; index++) {
            let listaJuegos = (await axios.get(APIresultado)).data
            let infoJuego = listaJuegos.results.map( element => {
                const juego = {
                        id: element.id,
                        name: element.name,
                        description: element.slug,
                        release: element.released,
                        rating: element.rating,
                        image: element.background_image,
                        platforms: element.platforms.map(p => p.platform.name),
                        genres: element.genres.map(g => g.name).filter(p => p != null).join(', '),
                        source: "Api",
                    }
                return juego
                }
            )
            //movemos el puntero en el listado del API
            APIresultado = listaJuegos.next

            //pegamos el resultado de .map al array temporal principal
            arrayDataVideogames = arrayDataVideogames.concat(infoJuego)
        }
        //retornamos el array temporal con el listado que viene del API
        return arrayDataVideogames
    } catch (error) {
        console.log(error)
    }
}

const getInfoDelaDB = async () => {
    let arrayDBVideogames = []

    let listaDBjuegos = await Videogame.findAll(
        { include: [Genre] }
    )
    let jsonLista = listaDBjuegos.map((element) => element.toJSON())
    jsonLista.forEach(elem => {
        elem.source = "Db", 
        elem.genres = elem.genres.map((genre) => genre.name).filter(p => p != null).join(', ')
    });
    arrayDBVideogames = arrayDBVideogames.concat(jsonLista)
  
    //res.json(arrayDBVideogames)

    return arrayDBVideogames
}

//----------------  FUNCION PRINCIPAL ------------------
const getListadoVideojuegos = async () => {
    try {
        //Se va a trear informacion de los videojuegos tanto de la API como de la base de datos
        //ya que como tambien se podran agregar nuevos videojuegos, se asume que no sera parte
        //de la informacion en la API de videojuegos
        const InfoDelAPI = await getInfoDelaAPI()
        const InfoDelaDB = await getInfoDelaDB()
        
        return InfoDelAPI.concat(InfoDelaDB)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {getListadoVideojuegos}