import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Match } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from './store'

import Root from './components/Root'

let store = configureStore()

store.dispatch({type: 'ADD_TODO', text: 'foo'})

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
