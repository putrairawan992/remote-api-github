import { createStore, applyMiddleware, combineReducers, compose } from 'redux';

// using thunk pattern is OPTIONAL, but can be helpful to compose async actions
// SEE: https://github.com/gaearon/redux-thunk
import thunk from 'redux-thunk';

// here, we're sourcing *all* of the redux reducers at once
import * as reducers from '../reducers';

const defaultData = {};
const middleWares = [
  thunk
];


export default function(data = defaultData) {
  // This is creates a functional constructor for our single redux store.
  // If the redux devtools are active, we compose them into the store.
  // Else, just apply our middlewares to the store.
  let finalCreateStore;
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable */

  finalCreateStore = composeEnhancers(
    applyMiddleware(...middleWares)
  )(createStore);

  // Above, we imported many small component reducers.
  // Here, we combine them into one big uber-reducer:
  // This assembles a monolithic reducer for our monolithic store.
  const reducer = combineReducers(reducers);

  // create our single redux store, and bind the single reducer to it
  return finalCreateStore(reducer, data);
}
