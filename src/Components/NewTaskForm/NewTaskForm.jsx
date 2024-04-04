import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '', // Добавляем состояние для хранения введенного текста
    }
  }

  handleSubmit = (event) => {
    const { value } = this.state
    const { onItemAdded } = this.props
    event.preventDefault() // Отменяем стандартное поведение отправки формы
    onItemAdded(value) // Вызываем onItemAdded с текущим значением
    this.setState({ value: '' }) // Очищаем поле ввода
  }

  handleChange = (event) => {
    // Обновляем состояние
    this.setState({ value: event.target.value }) // при каждом изменении поля ввода
  }

  render() {
    const { value } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={value} // Привязываем значение поля ввода к состоянию
          onChange={this.handleChange} // Обработка изменений в поле ввода
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
