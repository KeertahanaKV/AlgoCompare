import React from 'react';
import { BarChart3, GitCompare, Table, BookOpen } from 'lucide-react';

const Header = ({ activeView, setActiveView }) => {
  const navItems = [
    { id: 'visualizer', label: 'Algorithm Visualizer', icon: BarChart3 },
    { id: 'comparison', label: 'Side-by-Side Compare', icon: GitCompare },
    { id: 'complexity', label: 'Complexity Table', icon: Table },
    { id: 'guide', label: 'Algorithm Guide', icon: BookOpen },
  ];

  return (
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">AlgoCompare</h1>
              <p className="text-gray-400 text-sm">Sorting Algorithm Visualizer</p>
            </div>
          </div>
          
          <nav className="flex space-x-1">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveView(id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeView === id
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden md:inline">{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;