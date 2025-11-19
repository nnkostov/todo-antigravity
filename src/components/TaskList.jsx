import TaskItem from './TaskItem';
import TaskInput from './TaskInput';

export default function TaskList({ tasks, title, onAdd, onToggle }) {
    return (
        <div className="task-list-container">
            <header className="view-header">
                <h1>{title}</h1>
            </header>
            <div className="tasks">
                {tasks.length === 0 ? (
                    <div className="empty-state">No tasks in {title}</div>
                ) : (
                    tasks.map(task => (
                        <TaskItem key={task.id} task={task} onToggle={onToggle} />
                    ))
                )}

                <TaskInput onAdd={onAdd} />
            </div>
        </div>
    );
}
