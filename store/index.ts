import { combineReducers } from 'redux'
import { createStore, applyMiddleware } from 'redux'
import { user } from './user';
import thunkMiddleware from 'redux-thunk'

const rootReducer = combineReducers({
    user
})

const middleware = applyMiddleware(thunkMiddleware)
const store = createStore(rootReducer, middleware)

export default store