import { Trash2, Calendar } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

function TaskItem({ task, onToggle, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(task.content);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isEditing) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleSave = () => {
        if (editValue.trim()) {
            onUpdate(task.id, { content: editValue });
        } else {
            setEditValue(task.content);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSave();
        if (e.key === 'Escape') {
            setEditValue(task.content);
            setIsEditing(false);
        }
    };

    const handleDateChange = (e) => {
        onUpdate(task.id, { date: e.target.value });
    };

    return (
        <div className="task-item group">
            <div className="task-checkbox-container">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggle(task.id)}
                    className="task-checkbox"
                />
            </div>

            <div className="task-content-wrapper">
                {isEditing ? (
                    <input
                        ref={inputRef}
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleSave}
                        onKeyDown={handleKeyDown}
                        className="task-edit-input"
                    />
                ) : (
                    <span
                        className={`task-content ${task.completed ? 'completed' : ''}`}
                        onDoubleClick={() => setIsEditing(true)}
                    >
                        {task.content}
                    </span>
                )}

                <div className="task-meta">
                    <div className="date-picker-container">
                        <Calendar size={12} className="date-icon" />
                        <input
                            type="date"
                            value={task.date}
                            onChange={handleDateChange}
                            className="date-input"
                        />
                    </div>
                </div>
            </div>

            <button
                onClick={() => onDelete(task.id)}
                className="delete-btn opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Delete task"
            >
                <Trash2 size={16} />
            </button>
        </div>
    );
}

export default TaskItem;
