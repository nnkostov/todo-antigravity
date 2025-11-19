import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';

function App() {
  const [currentView, setCurrentView] = useState('inbox'); // 'inbox', 'today', 'upcoming', or project ID

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [
      { id: 1, content: 'Welcome to your new todo app!', completed: false, date: new Date().toISOString().split('T')[0], projectId: 'inbox' },
      { id: 2, content: 'Try adding a new task below', completed: false, date: new Date().toISOString().split('T')[0], projectId: 'inbox' },
      { id: 3, content: 'Mark this task as completed', completed: true, date: new Date().toISOString().split('T')[0], projectId: 'inbox' },
    ];
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('projects');
    return saved ? JSON.parse(saved) : [
      { id: 'home', name: 'Home', color: '#ff0000' },
      { id: 'work', name: 'Work', color: '#00ff00' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

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

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addProject = (name) => {
    const newProject = {
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      color: '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
    };
    setProjects([...projects, newProject]);
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
      default:
        const project = projects.find(p => p.id === currentView);
        return project ? project.name : 'Tasks';
    }
  };

  return (
    <div className="app-container">
      <Sidebar
        currentView={currentView}
        onNavigate={setCurrentView}
        projects={projects}
        onAddProject={addProject}
      />
      <main className="main-content">
        <TaskList
          tasks={getFilteredTasks()}
          title={getViewTitle()}
          onAdd={addTask}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      </main>
    </div>
  );
}

export default App;
