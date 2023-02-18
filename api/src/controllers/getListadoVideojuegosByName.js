require("dotenv").config();
const { API_KEY } = process.env;

//utilizamos axios para hacer el llamado al API
const axios = require('axios');
//const { Op } = require('sequelize');
const { Videogame, Genre } = require('../db.js');

const getApi_InfoByName = async (name) => {
    try {
        let ApiResultados = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page_size=15`)

        const resultadoAPI = ApiResultados.data.results.map( element => {
            return {
                    id: element.id,
                    name: element.name,
                    description: element.slug,
                    release: element.released,
                    rating: element.rating,
                    image: element.background_image,
                    platforms: element.platforms.map(p => p.platform.name),
                    generes: element.genres.map(p => p.name).filter(p => p != null).join(', '),
                    source: "Api",
                }
        })
        return resultadoAPI
    } catch (error) {
        console.log(error)
    }
}

const getDB_InfoByName = async (name) => {
    try {
        let DBJuegosByName = await Videogame.findAll({
            where: {
                name: name
            },
            include: [Genre]
        });

        const resultadoDB = await DBJuegosByName.map(element => {
            return {
                id: element.id,
                name: element.name,
                description: element.description,
                release: element.released,
                rating: element.rating,
                image: element.background_image,
                platforms: element.platforms,
                generes: element.genres.map(genere=> genere.name),
                source: "Db"
            }
        })
        return resultadoDB
    } catch (error) {
        console.log(error)
    }
}

const getListadoVideojuegosByName = async (name)=>{
    try {
        const ApiInfo = await getApi_InfoByName(name)
        const allinfo = ApiInfo
        const DBInfo = await getDB_InfoByName(name)
        //const allinfo = DBInfo.concat(ApiInfo).slice(0,15)

        if (allinfo.length === 0){
            throw new Error
        }
        return allinfo
    } catch (error) {
        return ("No se ha encontrado el juego")
    }
}

module.exports = {getListadoVideojuegosByName}


