import { combineReducers } from 'redux'
import { createStore, applyMiddleware } from 'redux'
import { user } from './user';
import { posts } from './posts';

import thunkMiddleware from 'redux-thunk'

const rootReducer = combineReducers({
    user,
    posts
})

const middleware = applyMiddleware(thunkMiddleware)
const store = createStore(rootReducer, middleware)

export default store