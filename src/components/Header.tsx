
import React from 'react';
import { Calendar, MessageSquare, ChartBar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <header className="w-full px-6 py-4 backdrop-blur-md bg-white/80 border-b border-slate-200 shadow-sm fixed top-0 z-50 animate-fade-in">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center">
            <span className="text-white font-bold text-xl">R</span>
          </div>
          <h1 className="text-2xl font-bold gradient-text">Reflect</h1>
        </div>

        <nav className="hidden md:flex items-center gap-2">
          <Button 
            variant={location.pathname === '/' ? "default" : "ghost"} 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 transition-all duration-300"
          >
            <Calendar className="h-4 w-4" />
            <span>Dashboard</span>
          </Button>
          <Button 
            variant={location.pathname === '/journal' ? "default" : "ghost"} 
            onClick={() => navigate('/journal')}
            className="flex items-center gap-2 transition-all duration-300"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Journal</span>
          </Button>
          <Button 
            variant={location.pathname === '/insights' ? "default" : "ghost"} 
            onClick={() => navigate('/insights')}
            className="flex items-center gap-2 transition-all duration-300"
          >
            <ChartBar className="h-4 w-4" />
            <span>Insights</span>
          </Button>
        </nav>

        <div className="flex md:hidden">
          <Button variant="ghost" size="icon">
            <span className="sr-only">Open menu</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
