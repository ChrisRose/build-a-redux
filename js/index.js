import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Observable, Subject } from 'rx'

const state = {
  todos: []
}

const updater = (state, action) => {
  let todos = state.todos
  if (action.type === 'ADD') {
    return {...state, todos: todos.concat({id: Math.random(), text: action.text})}
  } else if (action.type === 'REMOVE') {
    return todos.filter(({id}) => id !== action.id)
  } else if (action.type === 'UPDATE') {
    return {...state, text: action.text}
  }
}

let actions = new Subject()

const createStore = (updater, state) => {
  const states = Observable.of(state).concat(actions.scan(updater, state))

  const dispatch = (action) => {
    actions.onNext(action)
  }
  return {
    getState () {
      return state
    },
    dispatch,
    subscribe (fn) {
      states.forEach((newState) => {
        state = newState
        fn(state)
      })
    }
  }
}

class Provider extends Component {
  getChildContext () {
    return {
      store: this.props.store
    }
  }
  render () {
    return <div>{this.props.children}</div>
  }
}

Provider.propTypes = {
  store: PropTypes.any,
  children: PropTypes.any
}

Provider.childContextTypes = {
  store: React.PropTypes.any
}

export const connect = (Component) => {
  let NewComponent = React.createClass({
    componentWillMount () {
      this.context.store.subscribe((state) => this.setState(state))
    },
    render () {
      return (
        <Component state={this.state} dispatch={this.context.store.dispatch} />
      )
    }
  })

  NewComponent.contextTypes = {
    store: React.PropTypes.object
  }

  return NewComponent
}

let store = createStore(updater, state)

let ConnectedComponent = connect(App)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedComponent />
  </Provider>,
  document.getElementById('app')
)

store.dispatch({type: 'ADD', text: 'Water the plants'})
