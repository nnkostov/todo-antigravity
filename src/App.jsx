import { useState } from 'react';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';

function App() {
  const [currentView, setCurrentView] = useState('inbox'); // 'inbox', 'today', 'upcoming', or project ID
  const [tasks, setTasks] = useState([
    { id: 1, content: 'Welcome to your new todo app!', completed: false, date: new Date().toISOString().split('T')[0], projectId: 'inbox' },
    { id: 2, content: 'Try adding a new task below', completed: false, date: new Date().toISOString().split('T')[0], projectId: 'inbox' },
    { id: 3, content: 'Mark this task as completed', completed: true, date: new Date().toISOString().split('T')[0], projectId: 'inbox' },
    { id: 4, content: 'Project task example', completed: false, date: new Date().toISOString().split('T')[0], projectId: 'home' },
  ]);

  const addTask = (content) => {
    const newTask = {
      id: Date.now(),
      content,
      completed: false,
      date: new Date().toISOString().split('T')[0],
      projectId: currentView === 'inbox' || currentView === 'today' || currentView === 'upcoming' ? 'inbox' : currentView,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const getFilteredTasks = () => {
    const today = new Date().toISOString().split('T')[0];

    switch (currentView) {
      case 'inbox':
        return tasks.filter(t => t.projectId === 'inbox');
      case 'today':
        return tasks.filter(t => t.date === today && !t.completed);
      case 'upcoming':
        return tasks.filter(t => t.date > today && !t.completed);
      default:
        return tasks.filter(t => t.projectId === currentView);
    }
  };

  const getViewTitle = () => {
    switch (currentView) {
      case 'inbox': return 'Inbox';
      case 'today': return 'Today';
      case 'upcoming': return 'Upcoming';
      case 'home': return 'Home';
      case 'work': return 'Work';
      default: return 'Tasks';
    }
  };

  return (
    <div className="app-container">
      <Sidebar currentView={currentView} onNavigate={setCurrentView} />
      <main className="main-content">
        <TaskList
          tasks={getFilteredTasks()}
          title={getViewTitle()}
          onAdd={addTask}
          onToggle={toggleTask}
        />
      </main>
    </div>
  );
}

export default App;
