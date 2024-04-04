import PropTypes from 'prop-types'

import Task from '../Task'
import './TaskList.css'

export default function TaskList({ tasks, onDeleted, onToggleLeft, onSaveTaskDescription }) {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          description={task.description}
          created={task.created}
          completed={task.completed}
          onDeleted={() => onDeleted(task.id)}
          onToggleLeft={() => onToggleLeft(task.id)}
          onSaveTaskDescription={onSaveTaskDescription}
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
      id: PropTypes.number,
      description: PropTypes.string,
      created: PropTypes.instanceOf(Date),
      completed: PropTypes.bool,
    })
  ),
  onDeleted: PropTypes.func,
  onToggleLeft: PropTypes.func,
  onSaveTaskDescription: PropTypes.func,
}
