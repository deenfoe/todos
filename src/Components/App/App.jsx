import React, { Component } from 'react'

import './App.css'
import Header from '../Header'
import TaskList from '../TaskList'
import Footer from '../Footer'

export default class App extends Component {
  maxId = 4

  constructor(props) {
    super(props)
    this.state = {
      tasks: [
        this.createTodoItem('Купить молоко'),
        this.createTodoItem('Выгулять собаку'),
        this.createTodoItem('Помыть посуду'),
      ],
      filter: 'all',
      currentTime: new Date(),
    }
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 10000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  addItem = (text) => {
    const trimmedText = text.trim()
    if (!trimmedText) {
      // Если текст пуст после обрезки, не добавляем его как новое задание.
      return
    }

    const newItem = this.createTodoItem(text)

    this.setState(({ tasks }) => {
      const newTasks = [...tasks, newItem]
      return {
        tasks: newTasks,
      }
    })
  }

  deleteItem = (id) => {
    this.setState(({ tasks }) => {
      const index = tasks.findIndex((task) => task.id === id)

      const before = tasks.slice(0, index)
      const after = tasks.slice(index + 1)
      const newTasks = [...before, ...after]

      return {
        tasks: newTasks,
      }
    })
  }

  toggleLeft = (id) => {
    this.setState(({ tasks }) => {
      const index = tasks.findIndex((task) => task.id === id)

      const oldItem = tasks[index]
      const newItem = { ...oldItem, completed: !oldItem.completed }
      const newTasks = [...tasks.slice(0, index), newItem, ...tasks.slice(index + 1)]
      return {
        tasks: newTasks,
      }
    })
  }

  saveTaskDescription = (id, newDescription) => {
    this.setState(({ tasks }) => {
      return {
        tasks: tasks.map((task) => {
          if (task.id === id) {
            return {
              id: task.id,
              description: newDescription, // Новое описание
              created: task.created,
              completed: task.completed,
            }
          }
          return task
        }),
      }
    })
  }

  filterTasks = () => {
    const { filter, tasks } = this.state

    if (!tasks) return []

    const filters = {
      active: (task) => !task.completed,
      completed: (task) => task.completed,
    }

    const filterFunction = filters[filter] || (() => true)

    return tasks.filter(filterFunction)
  }

  setFilter = (filter) => {
    this.setState({ filter })
  }

  clearCompleted = () => {
    this.setState(({ tasks }) => {
      return {
        tasks: tasks.filter((task) => !task.completed),
      }
    })
  }

  createTodoItem(description) {
    const newId = this.maxId + 1
    this.maxId = newId

    return {
      description,
      created: new Date(),
      completed: false,
      id: newId,
    }
  }

  tick() {
    this.setState({
      currentTime: new Date(),
    })
  }

  render() {
    const { tasks, filter, currentTime } = this.state
    const visibleTasks = this.filterTasks(filter, tasks)
    const doneCount = tasks.filter((task) => task.completed).length
    const todoCount = tasks.length - doneCount

    return (
      <div className="todoapp">
        <Header addItem={this.addItem} />

        <section className="main">
          <TaskList
            tasks={visibleTasks}
            onDeleted={this.deleteItem}
            onToggleLeft={this.toggleLeft}
            onSaveTaskDescription={this.saveTaskDescription}
          />

          <Footer
            todoCount={todoCount}
            doneCount={doneCount}
            onFilterChange={this.setFilter}
            onClearCompleted={this.clearCompleted}
            currentTime={currentTime}
          />
        </section>
      </div>
    )
  }
}
