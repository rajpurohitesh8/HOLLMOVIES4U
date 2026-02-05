
import React from 'react';
import { motion } from 'framer-motion';

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAI: () => void;
  onOpenSearch: () => void;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ activeTab, setActiveTab, onOpenAI, onOpenSearch }) => {
  const tabs = [
    { id: 'All', icon: 'fa-home', label: 'Home' },
    { id: 'Search', icon: 'fa-search', label: 'Search', action: onOpenSearch },
    { id: 'Categories', icon: 'fa-th-large', label: 'Browse' },
    { id: 'AI', icon: 'fa-robot', label: 'AI Support', action: onOpenAI },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-black/80 backdrop-blur-2xl border-t border-white/10 pb-safe">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              if (tab.action) {
                tab.action();
              } else {
                setActiveTab(tab.id);
              }
            }}
            className="flex flex-col items-center justify-center w-full h-full relative group"
          >
            <motion.div
              animate={{ 
                y: activeTab === tab.id ? -2 : 0,
                color: activeTab === tab.id ? '#f97316' : '#9ca3af'
              }}
              className="text-lg mb-1"
            >
              <i className={`fas ${tab.icon}`}></i>
            </motion.div>
            <span className={`text-[9px] font-black uppercase tracking-widest ${activeTab === tab.id ? 'text-orange-500' : 'text-gray-500'}`}>
              {tab.label}
            </span>
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activeTabMobile"
                className="absolute -top-[1px] w-8 h-[2px] bg-orange-500"
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
