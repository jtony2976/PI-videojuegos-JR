
//uso de fetch
/*
  toma un argumento (la ruta del recurso que quieres obtener) y devuelve un
  objeto Promise conteniendo la respuesta, un objeto Response.
  Si se cumple esta promesa entonces...
  Convierte "response" como un JSON. Si se cumple esta promesa entonces..
  Con el json, usamos dispatch para llamar la accion (en el rootReducer) especificando el tipo
  y el payload (informacion para la accion) sera la data en el json

*/
export function getVideogames() {
  return function (dispatch) {
    return fetch(`http://localhost:3001/videogames`)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "GET_VIDEOGAMES", payload: json });
      });
  };
}

export function searchVideogames(name) {
  return (dispatch) =>
    fetch(`http://localhost:3001/videogames?name=${name}`)
      .then((resp) => resp.json())
      .then((json) => {
        dispatch({
          type: "SEARCH_VIDEOGAMES",
          payload: json,
        });
      });
}

export function getVideogameById(id) {
  return (dispatch) =>
    fetch(`http://localhost:3001/videogame/${id}`)
      .then((resp) => resp.json())
      .then((json) => {
        dispatch({
          type: "GET_VIDEOGAME_BY_ID",
          payload: json,
        });
      });
}

export function getGenres() {
  return (dispatch) =>
    fetch(`http://localhost:3001/genres`)
      .then((resp) => resp.json())
      .then((json) => {
        dispatch({
          type: "GET_GENRES",
          payload: json,
        });
      });
}

//JSON.stringify(obj) --> Convert a JavaScript object into a string
export function createVideogame(obj) {
  return (dispatch) =>
    fetch("http://localhost:3001/videogames", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((resp) => resp.json())
      .then((json) => {
        dispatch({
          type: "CREATE_VIDEOGAME",
          payload: json,
        });
      });
}

export const resetAll = () => {
  return (dispatch) => {
    dispatch({
      type: "RESET",
    });
  };
};


export const filterByGenre = (genres) => (dispatch, getState) => {
  let filteredGames = [];

  if (genres === "All") {
    filteredGames = getState().videogames;
  } else {
    filteredGames = getState().videogames.filter((game) =>
      (game.genres).includes(genres)
    )
  };
  dispatch({
    type: "FILTER_BY_GENRE",
    payload: {
      genres,
      videogameGenre: filteredGames,
    },
  });
};


export const orderAsc = (type) => (dispatch, getState) => {
  const filtered = getState().filteredVideogames;
  let videogamesOrder = []

    if (type === "asc_name") {
      videogamesOrder = filtered.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
    } else if (type === "asc_rating") {
      videogamesOrder = filtered.sort(
        (a, b) => a.rating - b.rating
      );
    }
    dispatch({
      type: "ORDER_ASC_RATING",
      payload: {
        videogamesOrder,
        name: type,
      },
    });
}


export const orderDesc = (type) => (dispatch, getState) => {
  const filtered = getState().filteredVideogames;
  let videogamesOrder = []
    
    if (type === "desc_name") {
      videogamesOrder = filtered.sort((a, b) => {
        if (a.name < b.name) return 1;
        if (a.name > b.name) return -1;
        return 0;
      });
    } else if (type === "desc_rating") {
      videogamesOrder = filtered.sort(
        (a, b) => b.rating - a.rating
      );
    }
    dispatch({
      type: "ORDER_DESC_RATING",
      payload: {
        videogamesOrder,
        name: type,
      },
    });
}


export const orderByCreator = (source) => (dispatch, getState) => {
  const videogames = getState().videogames.filter(function (G) {
      return G.source === source
    });
  dispatch({
    type: "ORDER_BY_CREATOR",
    payload: {
      videogames,
      source,
    },
  });
};