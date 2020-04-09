import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger';

import userReducer from './reducers/userReducer'
import dataReducer from './reducers/dataReducer'
import UIReducer from './reducers/UIReducer'

const initialState = {}

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
	middlewares.push(logger);
}

const reducers = combineReducers({
    user: userReducer,
    data: dataReducer,
    UI: UIReducer
})

export const store = createStore(reducers, initialState, compose(applyMiddleware(...middlewares), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))
