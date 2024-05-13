import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'

import './App.css'
import Header from '../Header'
import TaskList from '../TaskList'
import Footer from '../Footer'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      filter: 'all',
      currentTime: new Date(),
      timers: {},
    }
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 10000)
  }

  componentWillUnmount() {
    // Очистка интервала, используя this.timerID
    clearInterval(this.timerID)
    const { timers } = this.state
    // Перебор всех таймеров и их очистка
    Object.values(timers).forEach((timer) => {
      if (timer.timerId) clearInterval(timer.timerId)
    })
  }

  startTimer = (taskId) => {
    const timer = setInterval(() => {
      this.setState(({ timers }) => {
        const newTimers = { ...timers }
        if (newTimers[taskId].remainingTime > 0) {
          newTimers[taskId].remainingTime -= 1
        } else {
          clearInterval(newTimers[taskId].timerId)
          newTimers[taskId].timerId = null
        }
        return { timers: newTimers }
      })
    }, 1000)

    this.setState(({ timers }) => ({
      timers: { ...timers, [taskId]: { ...timers[taskId], timerId: timer } },
    }))
  }

  pauseTimer = (taskId) => {
    this.setState(({ timers }) => {
      const newTimers = { ...timers }
      if (newTimers[taskId].timerId) {
        clearInterval(newTimers[taskId].timerId)
        newTimers[taskId].timerId = null
      }
      return { timers: newTimers }
    })
  }

  addItem = (data) => {
    const newTask = {
      id: uuidv4(),
      description: data.description,
      timer: Number(data.minutes) * 60 + Number(data.seconds),
      created: new Date(),
      completed: false,
    }

    this.setState(({ tasks, timers }) => {
      const newTasks = [...tasks, newTask]
      const newTimers = { ...timers, [newTask.id]: { remainingTime: newTask.timer, timerId: null } }
      return {
        tasks: newTasks,
        timers: newTimers,
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
    this.setState(({ tasks, timers }) => {
      const index = tasks.findIndex((task) => task.id === id)
      const oldTask = tasks[index]
      const newTask = { ...oldTask, completed: !oldTask.completed }
      const newTasks = [...tasks.slice(0, index), newTask, ...tasks.slice(index + 1)]

      // Создаем новый объект для timers
      const newTimers = { ...timers }
      if (newTask.completed) {
        // Если задача завершена, сбрасываем таймер
        if (newTimers[id].timerId) {
          // Если таймер запущен, останавливаем его
          clearInterval(newTimers[id].timerId)
        }
        // Сбрасываем оставшееся время до нуля
        newTimers[id] = { ...newTimers[id], remainingTime: 0, timerId: null }
      }

      return {
        tasks: newTasks,
        timers: newTimers,
      }
    })
  }

  saveTaskDescription = (id, newDescription) => {
    this.setState(({ tasks }) => {
      return {
        tasks: tasks.map((task) => {
          if (task.id === id) {
            return {
              ...task,
              description: newDescription,
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

  tick() {
    this.setState({
      currentTime: new Date(),
    })
  }

  render() {
    const { tasks, filter, currentTime, timers } = this.state
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
            startTimer={this.startTimer}
            pauseTimer={this.pauseTimer}
            timers={timers}
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
