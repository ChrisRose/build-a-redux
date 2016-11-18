import React, { PropTypes } from 'react'

const Link = ({children, onClick}) => {
  return (
    <a
      href='#'
      onClick={e => {
        e.preventDefault()
        onClick()
      }}
    >{children}</a>
  )
}

Link.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any
}

export default Link
