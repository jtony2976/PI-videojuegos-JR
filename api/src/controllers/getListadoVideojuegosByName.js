const axios = require('axios');
const { Op } = require('sequelize');
const { Videogame, Genre } = require('../db.js');

const getApi_InfoByName = async (name) => {
    let juegosByName = []
    try {
        const ApiResultados = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=4048381c15644c3db8866fcef7795f3b`)

        ApiResultados.data.results.map( element => {
            if (juegosByName.length < 15) {
                    juegosByName.push({
                        id: element.id,
                        name: element.name,
                        description: element.slug,
                        release: element.released,
                        rating: element.rating,
                        img: element.background_image,
                        platforms: element.platforms.map(p => p.platform.name),
                        generes: element.genres.map(p => p.name)
                    })
            }
        })
        return juegosByName
    } catch (error) {
            console.log(error)
    }
}

const getDB_InfoByName = async (name) => {
    try {
        //SQL query:
        //SELECT * FROM videogames as videogame WHERE name = %name% (contains)
        //INNER JOIN genres as genre ON
        let DBJuegosByName = await Videogame.findAll({
            where : {
                name : {[Op.iLike] : '%'+name+'%'}
            },
            include: {
                model: Genre,
                atributes: ['name'],
                throught: {
                    attributes: ['name']
                }
            } 
        })
        const resp = await DBJuegosByName.map(juego => {
            return {
                id: juego.id,
                description: juego.description,
                name: juego.name,
                rating: juego.rating,
                img: juego.background_image,
                platforms: juego.platforms,
                release: juego.released,
                createdInDb: juego.createdInDb,
                generes: juego.genres.map(genere=> genere.name)
            }
        })
        return resp
    } catch (error) {
        console.log(error)
    }
}

const getListadoVideojuegosByName = async (name)=>{
    try {
        const ApiInfo = await getApi_InfoByName(name)
        const allinfo = ApiInfo

        // const DBInfo = await getDBInfoByName(name)
        // const allinfo = DBInfo.concat(ApiInfo).slice(0,15)

        if (allinfo.length === 0){
            throw new Error
        }
        return allinfo
    } catch (error) {
        return ("No se ha encontrado el juego")
    }
}

module.exports = {getListadoVideojuegosByName}


