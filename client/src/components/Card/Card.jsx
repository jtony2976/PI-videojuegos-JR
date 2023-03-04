import React from 'react';
import {Link} from 'react-router-dom';
import NotFound from '../../components/NotFound/NotFound';
import './Card.css';

function Card({data}) {
	return (
		<div className='card'>
			<div>
				{/* Usamos el componente Link (predeterminado en react) para ponerle un enlace
				    a la imagen del videojuego para accesar la ruta  `/videogames/${data.id}`
					que nos mostrara informacion de ese videojuego en particular*/}
				<Link to={`/videogame/${data.id}`}>
					{/* Se uso un validacion para en caso de que el videojuego no cuente con
					    una imagen (la variable "image" es la que tiene el link de la imagen del juego),
						se muestre un mensaje
						Si la variable no fue null quiere decir que si hay link disponible para
						la imagen y se muestra utilizando el tag img */}
					{data.image === null || !data.image ? (
						<NotFound image={'noimage'} />
					) : (
						<img className='img' src={data.image} alt={data.name} />
					)}
				</Link>
			</div>
			{/* el siguiente div nos despliega la info de cada videojuego */}
			<div className='textCard'>
				<div className='nameGenres'>
					<div className='name'>{data.name}</div>
					<div className='genres'>{data.genres}</div>
				</div>
				<div className='divRating'>
					<div className='rating'>{data.rating}</div>
				</div>
			</div>
		</div>
	);
}

export default Card;
