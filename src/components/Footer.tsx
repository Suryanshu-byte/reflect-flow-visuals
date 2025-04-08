
import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full py-6 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="text-lg font-semibold gradient-text">Reflect</span>
          </div>
          
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} Reflect. Your personal reflection dashboard.
          </div>
          
          <div className="flex gap-4">
            <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
              Terms
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
              Help
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
