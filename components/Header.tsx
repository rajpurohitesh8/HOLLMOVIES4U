
import React, { useState } from 'react';
import { User } from '../types';

interface HeaderProps {
  onSearch: (query: string) => void;
  onNavigate: (category: string) => void;
  activeCategory: string;
  user: User | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenContact: () => void;
  onOpenMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onSearch, 
  onNavigate, 
  activeCategory, 
  user, 
  onOpenAuth, 
  onLogout, 
  onOpenContact,
  onOpenMenu
}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  const navLinks = [
    { name: 'HOME', category: 'All' },
    { name: 'BOLLYWOOD', category: 'Bollywood Movies' },
    { name: 'HOLLYWOOD', category: 'Hollywood Movies' },
    { name: 'DUAL AUDIO', category: 'Dual Audio Movies' },
  ];

  return (
    <header className="bg-gray-950/80 backdrop-blur-2xl border-b border-white/5 sticky top-0 z-[60] shadow-2xl">
      <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between gap-4">
        
        <div className="flex items-center gap-4">
          {/* Menu Button - The "Where is the menu button" fix */}
          <button 
            onClick={onOpenMenu}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white hover:bg-orange-600 transition-all active:scale-90"
          >
            <i className="fas fa-bars text-lg"></i>
          </button>

          {/* Logo */}
          <div 
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group shrink-0" 
            onClick={() => onNavigate('All')}
          >
            <div className="bg-gradient-to-br from-yellow-400 to-orange-600 p-2 sm:p-2.5 rounded-lg sm:rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-orange-500/20 hidden sm:flex">
              <i className="fas fa-film text-gray-900 text-lg sm:text-xl"></i>
            </div>
            <h1 className="text-lg sm:text-2xl font-black tracking-tighter text-white">
              HOLL<span className="text-orange-500">MOVIES</span>
            </h1>
          </div>
        </div>

        {/* Navigation - Desktop Only */}
        <nav className="hidden xl:flex items-center space-x-6 text-[10px] font-black text-gray-400">
          {navLinks.map(link => (
            <button
              key={link.name}
              onClick={() => onNavigate(link.category)}
              className={`hover:text-white transition-all tracking-[0.1em] ${
                activeCategory === link.category 
                ? 'text-orange-500' 
                : ''
              }`}
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Search Bar */}
        <form onSubmit={handleSubmit} className="flex-1 max-w-xs sm:max-w-md relative group">
          <input
            type="text"
            placeholder="Search Archives..."
            className="w-full bg-white/5 border border-white/5 rounded-xl sm:rounded-2xl py-1.5 sm:py-2.5 px-4 pl-10 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-all text-white placeholder:text-gray-600 shadow-inner"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button type="submit" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-orange-500 transition-colors">
            <i className="fas fa-search text-xs sm:text-sm"></i>
          </button>
        </form>

        {/* Auth */}
        <div className="flex items-center space-x-2">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden md:block text-[9px] font-black text-orange-500 uppercase tracking-widest">{user.name}</span>
              <button 
                onClick={onLogout}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-red-500 transition-all"
              >
                <i className="fas fa-sign-out-alt text-sm"></i>
              </button>
            </div>
          ) : (
            <button 
              onClick={onOpenAuth}
              className="bg-orange-600 hover:bg-orange-500 text-white text-[9px] sm:text-[10px] font-black px-4 sm:px-6 py-2 sm:py-2.5 rounded-full shadow-lg transition-all uppercase tracking-widest whitespace-nowrap"
            >
              <span className="hidden sm:inline">LOGIN / JOIN</span>
              <span className="sm:hidden">JOIN</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
