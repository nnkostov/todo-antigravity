import { Inbox, Calendar, CalendarDays, ChevronDown, Plus } from 'lucide-react';

export default function Sidebar({ currentView, onNavigate, projects, onAddProject }) {
  const handleAddProject = () => {
    const name = prompt('Enter project name:');
    if (name && name.trim()) {
      onAddProject(name.trim());
    }
  };

  return (
    <aside className="sidebar">
      <div className="user-profile">
        <div className="avatar">NK</div>
        <span className="username">Nick Kostov</span>
        <ChevronDown size={16} className="text-tertiary" />
      </div>

      <nav className="nav-menu">
        <button
          className={`nav-item ${currentView === 'inbox' ? 'active' : ''}`}
          onClick={() => onNavigate('inbox')}
        >
          <Inbox size={20} color="#246fe0" />
          <span>Inbox</span>
          <span className="count">3</span>
        </button>
        <button
          className={`nav-item ${currentView === 'today' ? 'active' : ''}`}
          onClick={() => onNavigate('today')}
        >
          <Calendar size={20} color="#058527" />
          <span>Today</span>
        </button>
        <button
          className={`nav-item ${currentView === 'upcoming' ? 'active' : ''}`}
          onClick={() => onNavigate('upcoming')}
        >
          <CalendarDays size={20} color="#692fc2" />
          <span>Upcoming</span>
        </button>
      </nav>

      <div className="projects-section">
        <div className="section-header">
          <span>My Projects</span>
          <button className="add-icon-btn" onClick={handleAddProject}>
            <Plus size={16} className="add-icon" />
          </button>
        </div>
        <div className="project-list">
          {projects.map(project => (
            <button
              key={project.id}
              className={`project-item ${currentView === project.id ? 'active' : ''}`}
              onClick={() => onNavigate(project.id)}
            >
              <span className="project-dot" style={{ color: project.color }}>•</span>
              <span>{project.name}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
