// store.js
//
// Exposes our one and only monolithic global store.
import createStore from './createStore';

// Create our one and only store.
const initialState = {};
const store = createStore(initialState);

// Any module can ask for the store.
export default store;
