//Every reducer needs some initial state
const initialState = {
  videogames: [],
  genres: [],
  searchVideogame: [],
  createVideogame: null,
  searchVideogameById: [],
  searchVideogameByName: [],
  filteredVideogames: [],
  orderBy: "Select",
  filterBy: "All",
};

/*
 Hablamos del store, como una referencia al state de nuestra aplicación, es decir la información, más los reducers que pueden
 modificar el state. Es decir que el store es la información, y las funciones para modificar el store.

 Cuando queremos comunicar una modificación desde la vista al store, usamos una operación de nombre dispatch. Por lo que 
 también podemos decir que para comunicarnos con el store debemos usar dispatch.

 La operación dispatch, recibe y envía un objeto que describe los cambios que queremos hacer, a estos objetos descriptores 
 de cambios los llamamos Actions, o acciones.

 Todos los actions contienen una propiedad type, que identifica el tipo de evento que se realizará. Opcionalmente, pueden incluir 
 una propiedad payload, en caso de que necesiten enviar información para que se realice el cambio.
 
 Cuando el store recibe un action para realizar un cambio, envía este objeto a los reducers del store, a las funciones que 
 realizan los cambios. Las funciones reducers, usualmente evalúan la propiedad type de la action, para definir si harán una 
 modificación, o dejarán pasar el cambio. Normalmente, sólo un reducer aplica modificaciones para cada tipo distinto de action que existe.
*/
/*
 A Redux app really only has one reducer function: the "rootReducer" function that you will pass
 to createStore later on. That one root reducer function is responsible for handling all of the 
 actions that are dispatched, and calculating what the entire new state result should be every time.
*/
// Use the initialState as a default value
export default function rootReducer(state = initialState, action) {
  // The reducer normally looks at the action type field to decide what happens
  // Do something here based on the different types of actions

  //Payload is a naming convention for the property that holds the actual data in a Redux action object.
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
      };

    case "SEARCH_VIDEOGAMES":
      return {
        ...state,
        searchVideogameByName: action.payload,
      };

    case "GET_VIDEOGAME_BY_ID":
      return {
        ...state,
        searchVideogameById: action.payload,
      };

    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };

    case "CREATE_VIDEOGAME":
      return {
        ...state,
        createVideogame: action.payload,
      };    

    case "RESET":
      return {
        ...state,
        videogames: [],
        filteredVideogames: [],
        orderBy: "Select",
        filterBy: "All",
      }

    case "FILTER_BY_GENRE":
      return {
        ...state,
        filteredVideogames: action.payload.videogameGenre,
        filterBy: action.payload.genre,
      };

    case "ORDER_ASC_NAME":
    case "ORDER_ASC_RATING":
    case "ORDER_DESC_NAME":
    case "ORDER_DESC_RATING":
      return {
        ...state,
        filteredVideogames: action.payload.videogamesOrder,
        orderBy: action.payload.name,
      };

    case "ORDER_BY_CREATOR":
    return {
      ...state,
      filteredVideogames: action.payload.videogames,
      filterBy: action.payload.source,
    };

    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state;
  }
};