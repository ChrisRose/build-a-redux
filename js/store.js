import { createStore } from 'redux'
import todoApp from './reducers'

let configureStore = () => createStore(todoApp)

export default configureStore
