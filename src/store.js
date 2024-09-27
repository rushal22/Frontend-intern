import { legacy_createStore , applyMiddleware, compose } from "redux";
import rootReducer from './reactredux/reducers';
import {thunk}  from "redux-thunk";

const initialState = {
  auth: {
    accessToken: null // Initialize accessToken to null
  }
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('ReduxStore');
        return serializedState ? JSON.parse(serializedState) : initialState;
      } catch (error) {
        console.error('Error loading state from localStorage:', error);
        return initialState;
      }
}

const store = legacy_createStore(rootReducer, loadState(),  enhancer);


const updateReduxStore = () => {
    try {
        const serializedState = JSON.stringify(store.getState());
        localStorage.setItem('ReduxStore', serializedState);
      } catch (error) {
        console.error('Error saving state to localStorage:', error);
      }
}

store.subscribe(() => {
    updateReduxStore(store)
})
export default store
