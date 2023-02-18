require("dotenv").config();
const { API_KEY } = process.env;

//utilizamos axios para hacer el llamado al API
const axios = require('axios');
const { Videogame, Genre } = require('../db.js');


const getApiGameById = async (id) =>{
    let APIjuegoInfoById = []
    try {
        let resultadosAPIbyID = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        let element = resultadosAPIbyID.data
        APIjuegoInfoById.push({
            id: element.id,
            name: element.name,
            description: element.slug.replaceAll(/<(“[^”]”|'[^’]’|[^'”>])*>/g, ""),
            release: element.released,
            rating: element.rating,
            image: element.background_image,
            platforms: element.platforms.map(p => p.platform.name),
            generes: element.genres.map(p => p.name)
        })
        return APIjuegoInfoById
    } catch (error) {
        console.log(error)
    }
}

const getDBGameById = async (id)=>{
    try {
        //`SELECT "videogame"."id", "videogame"."name", "videogame"."description", "videogame"."release", "videogame"."rating", "videogame"."image", "videogame"."platforms", "videogame"."source", "videogame"."createdInDb", "genres"."id" AS "genres.id", "genres"."name" AS "genres.name" FROM "videogames" AS "videogame" LEFT OUTER JOIN ( "Videogames_Genres" AS "genres->Videogames_Genres" INNER JOIN "genres" AS "genres" ON "genres"."id" = "genres->Videogames_Genres"."genreId") ON "videogame"."id" = "genres->Videogames_Genres"."videogameId" WHERE "videogame"."id" = '5286';`,
        let DBJuegosById = await Videogame.findOne({
            where : {id},
            include: {model: Genre, attributes: ['name'],
            through: {attributes: []}}})
        
        const resp = await DBJuegosById.map(juego => {
            return{
                    id: juego.id,
                    description: juego.description,
                    name: juego.name,
                    rating: juego.rating,
                    img: juego.background_image,
                    platforms: juego.platforms,
                    release: juego.released,
                    generes: juego.genres.map(genere=> genere.name)
            }
        })
        // console.log(resp)
        return resp
    } catch (error) {
        console.log(error)
    }
}

const getJuegoByID = async (id) => {
    try {
        const infoDB = await getDBGameById(id)
        const infoApi = await getApiGameById(id)
        if (infoDB) return infoDB
        if (infoApi) return infoApi
    } catch (error) {
        console.log(error.message)
    }
}


module.exports = {getJuegoByID}