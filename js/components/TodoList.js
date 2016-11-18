import React, { PropTypes } from 'react'
import Todo from './Todo'

const TodoList = ({ todos, onTodoClick }) => {
  return (
    <ul>
      {todos.map(todo =>
        <Todo
          key={todo.id}
          {...todo}
          onClick={() => onTodoClick(todo.id)}
          />
      )}
    </ul>
  )
}

TodoList.propTypes = {
  todos: PropTypes.any,
  onTodoClick: PropTypes.func
}
export default TodoList
