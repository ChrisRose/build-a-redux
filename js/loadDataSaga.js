import { take, put, call } from 'redux-saga/effects'

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

function* loadDataSaga () {
  while(true) {
    let action = yield take('INIT')
    debugger
    let todos = yield call(() => todoService.getTodos())
    let newState = yield put({ type: 'DATA_LOADED', todos })
  }
}

export default loadDataSaga
