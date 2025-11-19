import { Check } from 'lucide-react';

export default function TaskItem({ task, onToggle }) {
    return (
        <div className="task-item">
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
        </div>
    );
}
