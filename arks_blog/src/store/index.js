import { createStore, combineReducers } from 'redux'
import { reducers, reducersUser } from './reducers'

export default createStore(combineReducers({
  user: reducersUser, 
  app: reducers
}))