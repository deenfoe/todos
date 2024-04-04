import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './TaskFilter.css'

export default class TaskFilter extends Component {
  static clearCompleted = () => {
    const { onClearCompleted } = this.props
    onClearCompleted()
  }

  constructor(props) {
    super(props)
    this.state = {
      filter: 'all',
    }
  }

  setFilter = (filter) => {
    const { onFilterChange } = this.props
    this.setState({ filter })
    onFilterChange(filter)
  }

  render() {
    const { todoCount, onClearCompleted } = this.props
    const { filter } = this.state

    return (
      <>
        <span className="todo-count">{todoCount} items left</span>
        <ul className="filters">
          <li>
            <button className={filter === 'all' ? 'selected' : ''} onClick={() => this.setFilter('all')}>
              All
            </button>
          </li>
          <li>
            <button className={filter === 'active' ? 'selected' : ''} onClick={() => this.setFilter('active')}>
              Active
            </button>
          </li>
          <li>
            <button className={filter === 'completed' ? 'selected' : ''} onClick={() => this.setFilter('completed')}>
              Completed
            </button>
          </li>
        </ul>
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      </>
    )
  }
}

TaskFilter.defaultProps = {
  todoCount: 0,
  onFilterChange: () => {},
  onClearCompleted: () => {},
}
TaskFilter.propTypes = {
  todoCount: PropTypes.number,
  onFilterChange: PropTypes.func,
  onClearCompleted: PropTypes.func,
}
