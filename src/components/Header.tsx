
import React from 'react';
import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <header className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-10 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center">
              <span className="text-xl font-bold gradient-text">Reflect</span>
            </NavLink>
          </div>
          
          <nav className="flex items-center space-x-4">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-primary bg-primary/10' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-primary/10'
                }`
              }
              end
            >
              Dashboard
            </NavLink>
            <NavLink 
              to="/journal" 
              className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-primary bg-primary/10' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-primary/10'
                }`
              }
            >
              Journal
            </NavLink>
            <NavLink 
              to="/insights" 
              className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-primary bg-primary/10' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-primary/10'
                }`
              }
            >
              Insights
            </NavLink>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
