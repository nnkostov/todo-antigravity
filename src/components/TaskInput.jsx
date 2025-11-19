import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function TaskInput({ onAdd }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content.trim()) return;
        onAdd(content);
        setContent('');
    };

    if (!isExpanded) {
        return (
            <button className="add-task-trigger" onClick={() => setIsExpanded(true)}>
                <div className="plus-icon-wrapper">
                    <Plus size={16} />
                </div>
                <span className="add-task-text">Add task</span>
            </button>
        );
    }

    return (
        <form className="task-input-container" onSubmit={handleSubmit}>
            <div className="input-wrapper">
                <input
                    autoFocus
                    type="text"
                    placeholder="Task name"
                    className="task-content-input"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <div className="input-actions">
                <button type="submit" className="btn-primary" disabled={!content.trim()}>
                    Add task
                </button>
                <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setIsExpanded(false)}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
