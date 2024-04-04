import React from 'react'
import PropTypes from 'prop-types'

import TaskFilter from '../TaskFilter'
import './Footer.css'

export default function Footer({ doneCount, todoCount, onFilterChange, onClearCompleted }) {
  return (
    <footer className="footer">
      <TaskFilter
        doneCount={doneCount}
        todoCount={todoCount}
        onFilterChange={onFilterChange}
        onClearCompleted={onClearCompleted}
      />
    </footer>
  )
}

Footer.propTypes = {
  doneCount: PropTypes.number.isRequired,
  todoCount: PropTypes.number.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
}
