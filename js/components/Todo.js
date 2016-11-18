import React, { PropTypes } from 'react'

const Todo = ({onClick, text, completed}) => {
  return (
    <li
      onClick={onClick}
      style={{textDecoration: completed ? 'line-through' : ''}}
    >
      {text}
    </li>
  )
}

Todo.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  completed: PropTypes.bool
}

export default Todo
