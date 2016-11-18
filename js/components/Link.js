import React from 'react'

const Link = ({active, children, onClick}) => {
  return (
    <a
      href="#"
      onClick={e => {
        e.preventDefault()
        onClick()
      }}
    >{children}</a>
  )
}

export default Link
