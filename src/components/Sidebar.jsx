import { Inbox, Calendar, CalendarDays, ChevronDown, Plus } from 'lucide-react';

export default function Sidebar({ currentView, onNavigate }) {
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
          <Plus size={16} className="add-icon" />
        </div>
        <div className="project-list">
          <button
            className={`project-item ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => onNavigate('home')}
          >
            <span className="project-dot" style={{ color: '#ff0000' }}>•</span>
            <span>Home</span>
          </button>
          <button
            className={`project-item ${currentView === 'work' ? 'active' : ''}`}
            onClick={() => onNavigate('work')}
          >
            <span className="project-dot" style={{ color: '#00ff00' }}>•</span>
            <span>Work</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
