import React, { PropTypes } from 'react'
import AddTodo from './containers/AddTodo'
import VisibleTodoList from './containers/VisibleTodoList'
import Footer from './components/Footer'

const App = ({params}) => {
  return (
    <div>
      <AddTodo />
      <VisibleTodoList filter={params.filter || 'all'} />
      <Footer />
    </div>
  )
}

App.propTypes = {
  params: PropTypes.obj
}

export default App
