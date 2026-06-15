import { Routes, Route, NavLink } from 'react-router-dom';
import { Home, Settings, Phone } from 'lucide-react';
import HomePage from './pages/HomePage';
import ContactsPage from './pages/ContactsPage';
import SettingsPage from './pages/SettingsPage';
import { useStore } from './hooks/useStore';
import { useEffect } from 'react';
import './App.css';

function App() {
  const { settings } = useStore();
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.theme || 'light');
    document.documentElement.setAttribute('data-contrast', settings.contrast || 'normal');
    document.documentElement.setAttribute('data-fontsize', settings.fontSize || 'normal');
  }, [settings.theme, settings.contrast, settings.fontSize]);

  return (
    <div className="app-container">
      <main style={{ paddingBottom: '90px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>

      <nav className="bottom-nav">
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Home size={24} />
          <span>Início</span>
        </NavLink>
        <NavLink to="/contacts" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Phone size={24} />
          <span>Contatos</span>
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Settings size={24} />
          <span>Opções</span>
        </NavLink>
      </nav>
    </div>
  );
}

export default App;
