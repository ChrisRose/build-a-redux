import React, { PropTypes } from 'react'
import Todo from './Todo'

const TodoList = ({ todos, onTodoClick }) => {
  return (
    <ul>
      {todos.map((todo, index) => (
        <Todo
          key={index}
          {...todo}
          onClick={() => onTodoClick(todo.id)}
        />
    ))}
    </ul>
  )
}

TodoList.propTypes = {
  todos: PropTypes.array,
  onTodoClick: PropTypes.func
}
export default TodoList
