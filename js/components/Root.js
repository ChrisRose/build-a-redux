import React from 'react'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import Footer from './Footer'
const { shape, string } = React.PropTypes

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
  params: shape({
    filter: string
  })
}

export default Root
