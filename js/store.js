import { createStore } from 'redux'
import todoApp from './reducers'
import { takeEvery, put, call } from 'redux-saga'

class TodoService {
  constructor () {
    this.todos = [
      {
        id: 1,
        text: 'Water plants'
      },
      {
        id: 2,
        text: 'Watch Netflix'
      }
    ]
  }
  getTodos () {
    return Promise.resolve(this.todos)
  }
}

let todoService = new TodoService()

function* myIterator () {
  yield 1
  yield 2
}

let foo = myIterator()
console.log(foo.next())
console.log(foo.next())

function* getInitialTodos () {
  let todos = yield call(todoService.getTodos.bind(todoService))
  put({ type: 'DATA_LOADED', todos })
}

function* loadData () {
  yield* takeEvery('@@INIT')
}

let configureStore = () => createStore(todoApp)

export default configureStore
