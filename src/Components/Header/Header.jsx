import React from 'react'
import PropTypes from 'prop-types'

import './Header.css'
import NewTaskForm from '../NewTaskForm'

export default function Header({ addItem }) {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm onItemAdded={addItem} />
    </header>
  )
}

Header.defaultProps = {}

Header.propTypes = {
  addItem: PropTypes.func.isRequired,
}
