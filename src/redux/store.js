import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { productReducer } from './reducers/productReducer'

const initialState = {}
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(combineReducers({
    products: productReducer
}),initialState, composeEnhancers(applyMiddleware(logger, thunk)))

export default store