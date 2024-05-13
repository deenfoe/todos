import PropTypes from 'prop-types'

import Task from '../Task'
import './TaskList.css'

export default function TaskList({
  tasks,
  onDeleted,
  onToggleLeft,
  onSaveTaskDescription,
  startTimer,
  pauseTimer,
  timers,
}) {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          description={task.description}
          created={task.created}
          completed={task.completed}
          timer={task.timer}
          onDeleted={() => onDeleted(task.id)}
          onToggleLeft={() => onToggleLeft(task.id)}
          onSaveTaskDescription={onSaveTaskDescription}
          startTimer={startTimer}
          pauseTimer={pauseTimer}
          timers={timers}
        />
      ))}
    </ul>
  )
}

TaskList.defaultProps = {
  tasks: [],
  onDeleted: () => {},
  onToggleLeft: () => {},
  onSaveTaskDescription: () => {},
}
TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      description: PropTypes.string,
      created: PropTypes.instanceOf(Date),
      completed: PropTypes.bool,
    })
  ),
  onDeleted: PropTypes.func,
  onToggleLeft: PropTypes.func,
  onSaveTaskDescription: PropTypes.func,
  startTimer: PropTypes.func.isRequired,
  pauseTimer: PropTypes.func.isRequired,
  timers: PropTypes.objectOf(
    PropTypes.shape({
      remainingTime: PropTypes.number,
      timerId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })
  ).isRequired,
}
