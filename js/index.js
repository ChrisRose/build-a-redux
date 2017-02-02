import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Observable, Subject } from 'rx'

const state = {
  todos: [],
  loading: true
}

const updater = (state, action) => {
  let todos = state.todos
  if (action.type === 'ADD') {
    return {...state, todos: todos.concat({id: Math.random(), text: action.text})}
  } else if (action.type === 'REMOVE') {
    return todos.filter(({id}) => id !== action.id)
  } else if (action.type === 'UPDATE') {
    return {...state, text: action.text}
  } else if (action.type === 'LOAD') {
    return {...state, loading: true}
  } else if (action.type === 'DATA_LOADING') {
    return state
  } else if (action.type === 'DATA_LOADED') {
    return {...state, todos: action.todos}
  }
}

let actions = new Subject()

function reduxSaga(store, program) {
  let gen = program();
  function recur(result) {
    let { value: command, done } = gen.next(result);
    if (done) {
      return;
    }

    if (command.type === "call") {
      let promise = command.fn();
      promise.then(recur)
    }
    else if (command.type === "take") {
      store.actions.
        filter(action => action.type === command.actionType).
        take(1).
        subscribe(recur);
    }
    else if (command.type === "put") {
      store.states.take(1).subscribe(recur);

      store.dispatch(command.action)
    }
  }
  recur();
}

function loadDataSaga() {

}

function* loadDataSaga() {
  let action = yield { type: 'take', actionType: 'DATA_LOADING' }
  let todos = yield {
    type: 'call',
    fn: () => new Promise(accept => {
      setTimeout(() => accept([{id: Math.random(), text: 'Buy milk!'}]), 10000);
    })
  };
  let state = yield { type: 'put', action: { todos, type: 'DATA_LOADED'}}
}

// [1,2,3].scan((state,input) => state + input, 0) -> [1,3,6]
const createStore = (updater, state) => {
  const states = Observable.of(state).concat(actions.scan(updater, state))

  const dispatch = (action) => {
    actions.onNext(action)
  }
  return {
    states,
    actions,
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

reduxSaga(store, loadDataSaga)

store.dispatch({ type: 'DATA_LOADING' })

let ConnectedComponent = connect(App)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedComponent />
  </Provider>,
  document.getElementById('app')
)

store.dispatch({type: 'ADD', text: 'Water the plants'})
