import React from "react";
import Card from "../../components/Card/Card";
import Loading from "../../components/Loading/Loading";
import "./Videogames.css"

export default function Videogames ({videogames}) {
  return (
    <div className="showing">
      {/* Si la variable array "videogames" en el reducer esta en blanco. o sea
          que no tiene ninguna informacion de algun juego, manda llamar el componente
          Loading que desplegara una imagen de "cargando" mientras se llena la variable
          "videogames"
          Cuando la variable ya este llena, por medio del map se leera cada elemnto (data)
          del array y ese elemnto "data" se le pasara por props al componente Card
          el cual desplegara cada videojuego en una tarjeta  */}
      {videogames.length > 0 ?
      videogames.map((data) => (<Card data={data} />))
      : <Loading />  
      }
    </div>
  );
};

