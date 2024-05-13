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
    if (secondsAgo < 30) {
      return 'меньше 30 секунд назад'
    }
    if (secondsAgo < 60) {
      return 'меньше минуты назад'
    }
    // Для временных промежутков более одной минуты
    return formatDistanceToNow(date, { addSuffix: true, locale: ru })
  }

  static formatTimerTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, '0')
    const seconds = (totalSeconds - minutes * 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
    }
  }

  startTimer = (event) => {
    event.stopPropagation()
    const { id, startTimer } = this.props
    startTimer(id)
  }

  pauseTimer = (event) => {
    event.stopPropagation()
    const { id, pauseTimer } = this.props
    pauseTimer(id)
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.saveTask(event.target.value)
    } else if (event.key === 'Escape') {
      this.toggleEdit()
    }
  }

  onItemClick = (event) => {
    event.stopPropagation()
    const { onToggleLeft, id, completed, timers } = this.props
    onToggleLeft(id)
    if (completed && timers[id].timerId) {
      this.pauseTimer(event)
    }
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
    const { description, created, onDeleted, onToggleLeft, completed, timers, id } = this.props
    const { isEditing } = this.state

    // Используем remainingTime из props
    const remainingTime = timers && timers[id] ? timers[id].remainingTime : 0

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
            <input className="edit" autoFocus type="text" defaultValue={description} onKeyDown={this.handleKeyDown} />
          ) : (
            <label onClick={onToggleLeft}>
              <span className="title">{description}</span>
              <span className="description">
                <div>
                  <button className="icon icon-play" onClick={this.startTimer} />
                  <button className="icon icon-pause" onClick={this.pauseTimer} />
                  {Task.formatTimerTime(remainingTime)}
                </div>
              </span>
              <span className="created">{timeAgo}</span>
            </label>
          )}

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
  id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  created: PropTypes.instanceOf(Date).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleLeft: PropTypes.func.isRequired,
  onSaveTaskDescription: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
}
