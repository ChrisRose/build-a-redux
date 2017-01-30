import React, { PropTypes } from 'react'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import Footer from './Footer'

const Root = ({params}) => {
  return (
    <div>
      <AddTodo />
      <VisibleTodoList filter={params.filter || 'all'} />
      <Footer />
    </div>
  )
}

Root.propTypes = {
  params: PropTypes.object
}

export default Root
