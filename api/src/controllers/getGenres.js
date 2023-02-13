//utilizamos axios para hacer el llamado al API
const axios = require('axios');

//nos traemos el modelo para la tabla 'Genre'
const { Genre } = require('../db.js');

//creando la funcion 'getTodoLosGeneros' con un llamado asyncrono porque estamos usando sequelize
const getTodoLosGeneros = async () => {
    try {
      const resultadosDelUrl = await axios.get(`https://api.rawg.io/api/genres?key=4048381c15644c3db8866fcef7795f3b`)
      // resultadosDelUrl ---> sera un objeto que tiene una propiedad 'data', la cual tambien es un objeto que tiene
      //                       otra porpiedad llamada 'results' que es un array de objetos y cada objeto tiene 2
      //                       propiedades: id y name (que sera un array con un solo elemento - el nombre del genero)
      // .map --> creamos un nuevo array llamando una arrow function para cada elemento del array de objetos 'resultadosDelUrl.data.results'
      //console.log(resultadosDelUrl.data.results)
      resultadosDelUrl.data.results.map(async elemento => {
        //La informacion de generos en una primera instancia se trae rawg y se va a guardar en su
        //propia tabla dentro de la base de datos
        //.findOrCreate --> is a query method that tries to find an entry in your table or create
        //                  a new entry when nothing is found depending on the condition specified in 'where'
        //await --> para esperar a que termine el query de hacer su trabajo y retornar el resultado
        //se crea un array de dos cosas:
        // tiposDeGenero --> sera un objeto que tendra la informacion que devuelve el query o la nueva info que se crea en la tabla
        // created --> variable boolean, true si se creo un nuevo 'tiposDeGenero' o false si ya existia previamente
        const [tiposDeGenero,created] = await Genre.findOrCreate({ 
            where: { 
                name: [elemento.name],
            }});
        
        // como es una funcion, retornamos el objeto creado por el query, que no se va a usar
        return tiposDeGenero
      });

      //Como ya tenemos la informacion traida desde la API en la tabla de generos (Genre), la usamos para retornarla
      //haciando el query .findAll que nos regresa un array de objetos con la informacion
      let result = await Genre.findAll()
      return result;
    } catch (error) {
      console.log(error)
    }
    };
    
module.exports = {getTodoLosGeneros}