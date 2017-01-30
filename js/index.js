import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Match } from 'react-router'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers'
import loadDataSaga from './loadDataSaga'

import Root from './components/Root'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

// mount it on the Store
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)

// then run the saga
sagaMiddleware.run(loadDataSaga)

store.dispatch({ type: 'INIT' })

setTimeout(function () {
  store.dispatch({ type: 'INIT' })
}, 5000);

const App = React.createClass({
  render () {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <Match
            pattern='/:filter?'
            component={Root} />
        </Provider>
      </BrowserRouter>
    )
  }
})

// Creates instance of MyFirstComponent class
render(<App />, document.getElementById('app'))
