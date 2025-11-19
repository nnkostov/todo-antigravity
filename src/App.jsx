import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';
import { useLocalStorage } from './hooks/useLocalStorage';

const INITIAL_TASKS = [
  { id: 1, content: 'Welcome to your new todo app!', completed: false, date: new Date().toISOString().split('T')[0], projectId: 'inbox' },
  { id: 2, content: 'Try adding a new task below', completed: false, date: new Date().toISOString().split('T')[0], projectId: 'inbox' },
  { id: 3, content: 'Mark this task as completed', completed: true, date: new Date().toISOString().split('T')[0], projectId: 'inbox' },
];

const INITIAL_PROJECTS = [
  { id: 'home', name: 'Home', color: '#ff0000' },
  { id: 'work', name: 'Work', color: '#00ff00' }
];

function App() {
  const [currentView, setCurrentView] = useState('inbox');
  const [tasks, setTasks] = useLocalStorage('tasks', INITIAL_TASKS);
  const [projects, setProjects] = useLocalStorage('projects', INITIAL_PROJECTS);
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const addTask = (content) => {
    const projectId = ['inbox', 'today', 'upcoming'].includes(currentView) ? 'inbox' : currentView;
    const newTask = {
      id: Date.now(),
      content,
      completed: false,
      date: new Date().toISOString().split('T')[0],
      projectId,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const updateTask = (id, updates) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));

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
    if (currentView === 'inbox') return tasks.filter(t => t.projectId === 'inbox');
    if (currentView === 'today') return tasks.filter(t => t.date === today && !t.completed);
    if (currentView === 'upcoming') return tasks.filter(t => t.date > today && !t.completed);
    return tasks.filter(t => t.projectId === currentView);
  };

  const getViewTitle = () => {
    if (['inbox', 'today', 'upcoming'].includes(currentView)) {
      return currentView.charAt(0).toUpperCase() + currentView.slice(1);
    }
    return projects.find(p => p.id === currentView)?.name || 'Tasks';
  };

  return (
    <div className="app-container">
      <Sidebar
        currentView={currentView}
        onNavigate={setCurrentView}
        projects={projects}
        onAddProject={addProject}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <main className="main-content">
        <TaskList
          tasks={getFilteredTasks()}
          title={getViewTitle()}
          onAdd={addTask}
          onToggle={toggleTask}
          onUpdate={updateTask}
          onDelete={deleteTask}
        />
      </main>
    </div>
  );
}

export default App;
