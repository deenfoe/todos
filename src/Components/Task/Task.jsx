import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow, differenceInSeconds } from 'date-fns'
import { ru } from 'date-fns/locale'
import './Task.css'

export default class Task extends Component {
  static formatTimeAgo(date) {
    const secondsAgo = differenceInSeconds(new Date(), date)
    if (secondsAgo < 5) {
      return 'меньше 5 секунд назад'
    }
    if (secondsAgo < 10) {
      return 'меньше 10 секунд назад'
    }
    if (secondsAgo < 20) {
      return 'меньше 20 секунд назад'
    }
    if (secondsAgo < 40) {
      return 'меньше 30 секунд назад'
    }
    if (secondsAgo < 60) {
      return 'меньше минуты назад'
    }
    // Для временных промежутков более одной минуты можете использовать formatDistanceToNow
    return formatDistanceToNow(date, { addSuffix: true, locale: ru })
  }

  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
    }
  }

  onItemClick = () => {
    const { onToggleLeft, id } = this.props
    onToggleLeft(id)
  }

  toggleEdit = () => {
    this.setState(({ isEditing }) => ({
      isEditing: !isEditing,
    }))
  }

  saveTask = (newDescription) => {
    const { onSaveTaskDescription, id } = this.props
    onSaveTaskDescription(id, newDescription)
    this.toggleEdit()
  }

  render() {
    const { description, created, onDeleted, onToggleLeft, completed } = this.props
    const { isEditing } = this.state

    // Форматирование даты создания задания
    const timeAgo = Task.formatTimeAgo(created)

    let classNames = 'todo-list-item' // Базовый класс
    if (completed) {
      classNames += ' completed'
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={completed} onClick={this.onItemClick} readOnly />

          {isEditing ? (
            <input
              className="inputEdit"
              autoFocus
              type="text"
              defaultValue={description}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  this.saveTask(event.target.value)
                }
              }}
            />
          ) : (
            <label onClick={onToggleLeft}>
              <span className="description">{description}</span>
              <span className="created">{timeAgo}</span>
            </label>
          )}
          {console.log(completed)}
          {!isEditing && (
            <>
              <button className="icon icon-edit" onClick={this.toggleEdit} />
              <button className="icon icon-destroy" onClick={onDeleted} />
            </>
          )}
        </div>
      </li>
    )
  }
}

Task.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  created: PropTypes.instanceOf(Date).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleLeft: PropTypes.func.isRequired,
  onSaveTaskDescription: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
}
