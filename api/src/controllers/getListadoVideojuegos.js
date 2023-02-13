const axios = require('axios');
//const { Videogame, Genre } = require('../db.js');

const getInfoDelaAPI = async () => {
    let arrayDataVideogames = []
    try {
        const URLresultado = await axios.get(`https://api.rawg.io/api/games?key=4048381c15644c3db8866fcef7795f3b`)
        
        URLresultado.data.results.map( element => {
            arrayDataVideogames.push({
                id: element.id,
                name: element.name,
                description: element.slug,
                release: element.released,
                rating: element.rating,
                image: element.background_image,
                platforms: element.platforms.map(p => p.platform.name),
                generes: element.genres.map(p => p.name)
            })
        })

        return arrayDataVideogames
    } catch (error) {
        console.log(error)
    }
}

//----------------  FUNCION PRINCIPAL ------------------
const getListadoVideojuegos = async () => {
    try {
        //Se va a trear informacion de los videojuegos tanto de la API como de la base de datos
        //ya que como tambien se podran agregar nuevos videojuegos, se asume que no sera parte
        //de la informacion en la API de videojuegos
        const InfoDelAPI = await getInfoDelaAPI()
        
        return InfoDelAPI
    } catch (error) {
        console.log(error)
    }
}

module.exports = {getListadoVideojuegos}