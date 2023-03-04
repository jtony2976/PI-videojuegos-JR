import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//mandamos llamar las acciones correspondientes para crear el video juego
import { createVideogame, getGenres } from "../../actions/index";
//nos traemos los estilos del formulario para capturar el video juego
import "./Create.css";

export default function Create() {
    //definimos variables
    const dispatch = useDispatch();

    //Del estado inicial de la app, que es un objeto y que esta definido en el reducer, 
    //solo retornamos la propiedad "genres" usando useSelector
    const genres = useSelector((store) => store.genres);

    //como "genres" es un array, lo partimos en 2
    // son 19 generos
    // Estos 2 arrays se usaran para desplegar las opciones en el formulario
    const genres1 = genres.slice(0, 10)
    const genres2 = genres.slice(10, 20)

    //declarando 2 variables state
    //useState --> regresa un par de valores: el state actual y una funcion que lo actuliza    
    const [game, setGame] = useState({
        name: "",
        description: "",
        image: "",
        released: "",
        rating: 0,
        genres: [],
        platforms: [],
    });

    //useEffect, lets you perform side effects in function components:
    //tell React that your component needs to do something after render. React will remember 
    //the function you passed (that function is “effect”), and call it later after performing the DOM updates
    useEffect(() => {
        //con cada renderizacion se manda llamar la accion "getGenres" que manda llamar el path /genres y nos devulve la lista de generos
        dispatch(getGenres());
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    //variable para las plataformas a escojer
    const listaPlataformas = ["Atari", "PC", "iOS", "Android", "macOS",  "PlayStation 4", "PlayStation 5", "Xbox", "PS Vita"]


    //funcion llamada con el evento onChange en el form
    //The onChange event in React detects when the value of an input element changes
    //onChange returns an event "e"
    //se usa la funcion "setGame" para guardar en el objeto de estado local game toda la informacion que viene del formulario
    //para cada propiedad
    const ChangeInput = (e) => {
        if (e.target.name === "genres" || e.target.name === "platforms") {
            const arr = game[e.target.name];
            setGame({
                ...game,
                [e.target.name]: arr.concat(e.target.value),
            });
        } else {
            //con esta tecnica los datos que se van escribiendo en cada input se va guardando en el
            //objeto de estado local, manteniendo la informacion previa.
            setGame({
                ...game,
                [e.target.name]: e.target.value,
            });
        }
    };


    //funcion llamada con el evento onSubmit en el form
    //The onSubmit nos permite ejecutar acciones cuando el usuario de clic en un botón de tipo submit
    //onSubmit returns an event "e"
    const handleSubmit = (e) => {
        //The preventDefault() -- este metodo cancela el event si es cancelable, refiriendose a que la accion por default que pertenece al evento
        //no va a ocurrir.
        //For preventing the native browser behavior (which would perform a refresh on the browser), we can use the preventDefault() method
        e.preventDefault();

        //creamos un objeto con la informacion del videojuego que esta guardada en el objeto de estado local
        const objGame = {
            name: game.name,
            description: game.description,
            image: game.image,
            released: game.released,
            rating: game.rating,
            genres: game.genres,
            platforms: game.platforms,
        };

        // Validaciones por si algun campo no se quede vacio y falte informacion
        if (!objGame.name) {
            alert("Falta el nombre del video juego.")
            return
        }
        if (!objGame.description) {
            alert("Falta la descripcion del videojuego.")
            return
        }
        if (!objGame.released) {
            alert("Falta la fecha.")
            return
        }
        if (objGame.rating > 5 || objGame.rating < 0) {
            alert("El raiting debe estar entre 0 y 5.")
            return
        }

        // mandamos llamar la accion de crear el videojuego pasando el objeto que 
        //se creo mas arriba usando la funcion "createVideogame(objGame)" que esta en el index.js
        // de las acciones.
        //Dicha funcion invoca la ruta "http://localhost:3001/videogame" con el metodo POST
        //la cual se encarga de guardar la informacion en la tabla de Videojuegos.
        dispatch(createVideogame(objGame));
        e.target.reset();
        alert("Videojuego creado en la base de datos");

        //Limpiamos los campos del formulario
        setGame({
            name: "",
            description: "",
            image: "",
            released: "",
            rating: 0,
            genres: [],
            platforms: [],
        });
    };

return (
    <div className="container">
        <div>
            <h1 className="fontTitulo">* Crea un Videjuego *</h1>
        </div>
        <form
            id="survey-form"
            className="form"
            noValidate
            onChange={(e) => ChangeInput(e)}
            onSubmit={(e) => handleSubmit(e)}
        >
            <div>
                <div className="insideForm">
                    <div className="divTitles">
                        <div>
                            <label>-Name-</label>
                            <input
                            className="label"
                            type="text"
                            name="name"
                            value={game.name}
                            ></input>
                        </div>
                        <div>
                            <label>-Description-</label>
                            <input
                            className="label"
                            type="text"
                            name="description"
                            value={game.description}
                            ></input>
                        </div>
                        <div>
                            <label>-Released-</label>
                            <input
                            className="label"
                            type="date"
                            name="released"
                            value={game.released}
                            ></input>
                        </div>
                        <div>
                            <label>-Rating-</label>
                            <input
                            className="label"
                            type="number"
                            name="rating"
                            value={game.rating}
                            ></input>
                        </div>
                    </div>
                    <div className="imagediv">
                        <label>-Image URL-</label>
                        <input
                        className="imagein"
                        type="text"
                        name="image"
                        value={game.image}
                        ></input>
                    </div>
                </div>
                <div className="checkboxs">
                    <div className="checks">
                        <label>-Genres-</label>
                        <div className="gendivs">
                            <div>
                                {genres1.map((gen) => (
                                <div key={gen.name}>
                                    <input
                                    type="checkbox"
                                    name="genres"
                                    value={gen.name}
                                    ></input>
                                    <label name={gen}>{gen.name}</label>
                                </div>
                                ))}
                            </div>
                            <div>
                                {genres2.map((gen) => (
                                <div key={gen.name}>
                                    <input
                                    type="checkbox"
                                    name="genres"
                                    value={gen.name}
                                    ></input>
                                    <label name={gen}>{gen.name}</label>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="checks">
                        <label>-Platforms-</label>
                        <div >
                            {listaPlataformas.map((P) => (
                            <div key={P}>
                                <input
                                type="checkbox"
                                name="platforms"
                                value={P}
                                ></input>
                                <label name={P}>{P}</label>
                            </div>
                            ))}
                        </div>
                    </div>
                    
                </div>
                <div>
                    <button className="buttonCreate" type="submit">
                        Guardar Informacion
                    </button>
                </div>
            </div>
        </form>
    </div>
);
}

