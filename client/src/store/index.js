import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; 
import rootReducer from '../reducer';

//Aqui mandamos llamar la extension de Redux en Chrome
const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

//Now that we have a reducer function (in folder "reducer", archive "index.js"),
//we can create a store instance by calling the Redux library createStore

//Redux middleware function provides a medium to interact with dispatched action before they reach the reducer.
//Redux Thunk middleware allows you to write action creators that return a function instead of an action.
//The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met
/*
If Redux Thunk middleware is enabled, any time you attempt to dispatch a function instead of an action object,
the middleware will call that function with dispatch method itself as the first argument.

So we can do this instead:

this.props.dispatch(showNotificationWithTimeout('You just logged in.'))

*/
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;