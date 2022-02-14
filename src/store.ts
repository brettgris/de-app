import { createStore } from 'redux';
import reducers from './reducers';

const store = createStore(reducers);

Object.freeze(store);
export default store;