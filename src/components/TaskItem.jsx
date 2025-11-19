import { Check, Trash2 } from 'lucide-react';

export default function TaskItem({ task, onToggle, onDelete }) {
    return (
        <div className="task-item group">
            <button
                className={`checkbox ${task.completed ? 'checked' : ''}`}
                onClick={() => onToggle(task.id)}
            >
                {task.completed && <Check size={12} strokeWidth={3} />}
            </button>
            <div className="task-content">
                <span className={`task-text ${task.completed ? 'completed' : ''}`}>
                    {task.content}
                </span>
                {task.description && (
                    <p className="task-description">{task.description}</p>
                )}
            </div>
            <button
                className="delete-btn"
                onClick={() => onDelete(task.id)}
                title="Delete task"
            >
                <Trash2 size={16} />
            </button>
        </div>
    );
}
