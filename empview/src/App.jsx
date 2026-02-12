import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <ThemeProvider>
      <div className="antialiased text-black bg-white dark:text-white dark:bg-gray-900 min-h-screen font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-300">
        {isLoggedIn ? (
          <Dashboard onLogout={handleLogout} />
        ) : (
          <LoginPage onLogin={handleLogin} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
