import React, { Component, PropTypes } from 'react'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }
  handleChange (event) {
    this.setState({value: event.target.value})
  }
  handleKeyDown (event) {
    if (event.key === 'Enter') {
      this.props.dispatch({type: 'ADD', text: event.target.value})
      this.setState({value: ''})
    }
  }
  render () {
    return (
      <div>
        <div style={{display: this.state.loading ? 'block' : 'none'}}>Loading...</div>
        <input type='text'
          value={this.state.value}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown} />
        <ul>
          {this.props.state.todos.map(({id, text}) => <li key={id}>{text}</li>)}
        </ul>
      </div>
    )
  }
}

App.propTypes = {
  state: PropTypes.any,
  dispatch: PropTypes.func
}

export default App
