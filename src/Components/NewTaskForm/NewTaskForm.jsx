import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      minutes: '',
      seconds: '',
    }
  }

  handleSubmit = (event) => {
    const { value, minutes, seconds } = this.state
    event.preventDefault()
    if (value.trim() !== '') {
      const { onItemAdded } = this.props
      onItemAdded({
        description: value,
        minutes,
        seconds,
      })
      this.setState({ value: '', minutes: '', seconds: '' })
    }
  }

  handleChange = (event) => {
    // Обновляем состояние
    this.setState({ value: event.target.value }) // при каждом изменении поля ввода
  }

  handleTimerChange = (event) => {
    const { name, value } = event.target
    let onlyNumbers = value.replace(/[^0-9]/g, '')

    if (+onlyNumbers > 59) {
      onlyNumbers = String(59)
    }

    this.setState({ [name]: onlyNumbers })
  }

  render() {
    const { value, minutes, seconds } = this.state
    return (
      <form onSubmit={this.handleSubmit} className="new-todo-form">
        <button type="submit" hidden aria-hidden />
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={value} // Привязываем значение поля ввода к состоянию
          onChange={this.handleChange} // Обработка изменений в поле ввода
        />
        <input
          name="minutes"
          value={minutes}
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={this.handleTimerChange}
        />
        <input
          name="seconds"
          value={seconds}
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={this.handleTimerChange}
        />
      </form>
    )
  }
}

NewTaskForm.defaultProps = {
  onItemAdded: () => {},
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func,
}
