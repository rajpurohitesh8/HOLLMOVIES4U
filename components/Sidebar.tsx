
import React from 'react';
import { CATEGORIES, MOCK_MOVIES } from '../constants';
import { motion } from 'framer-motion';

interface SidebarProps {
  onFilterGenre: (genre: string) => void;
  onFilterCategory: (category: string) => void;
  onSelectMovie: (movie: any) => void;
  activeGenre: string;
  activeCategory: string;
  onOpenPayment: () => void;
  isVip: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  onFilterGenre, 
  onFilterCategory, 
  onSelectMovie,
  activeGenre,
  activeCategory,
  onOpenPayment,
  isVip
}) => {
  const genres = ['Action', 'Comedy', 'Sci-Fi', 'Horror', 'Drama', 'Thriller'];
  const recentUpdates = MOCK_MOVIES.slice(0, 4);

  return (
    <aside className="w-full lg:w-96 space-y-12">
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-gray-900/50 p-10 rounded-[4rem] border border-white/5 shadow-2xl space-y-12 backdrop-blur-3xl"
      >
        <div>
          <h3 className="text-[11px] font-black mb-10 flex items-center gap-5 text-white uppercase tracking-[0.5em]">
            <span className="w-2.5 h-4.5 bg-orange-600 rounded-full shadow-[0_0_15px_rgba(234,88,12,0.6)]"></span> CATEGORIES
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {genres.map((genre, i) => (
              <motion.button 
                key={genre} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onFilterGenre(genre === activeGenre ? '' : genre)}
                className={`text-[10px] font-black py-4.5 px-4 rounded-3xl transition-all text-center uppercase tracking-widest border ${
                  activeGenre === genre 
                  ? 'bg-orange-600 text-white shadow-[0_15px_30px_-5px_rgba(234,88,12,0.4)] border-orange-400' 
                  : 'bg-black/60 text-gray-500 hover:text-white border-white/5'
                }`}
              >
                {genre}
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-black mb-10 flex items-center gap-5 text-white uppercase tracking-[0.5em]">
            <span className="w-2.5 h-4.5 bg-orange-600 rounded-full shadow-[0_0_15px_rgba(234,88,12,0.6)]"></span> ARCHIVE INDEX
          </h3>
          <ul className="space-y-4">
            {CATEGORIES.map((cat, i) => (
              <motion.li 
                key={cat.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <button 
                  onClick={() => onFilterCategory(cat.name)}
                  className={`w-full flex justify-between items-center py-5 px-8 rounded-[2rem] transition-all border ${
                    activeCategory === cat.name 
                    ? 'bg-orange-600/15 text-orange-500 border-orange-500/30 shadow-2xl' 
                    : 'hover:bg-white/5 text-gray-500 hover:text-gray-200 border-transparent'
                  }`}
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">{cat.name}</span>
                  <span className="text-[9px] bg-black/60 px-3 py-1.5 rounded-xl border border-white/5 text-gray-600 font-bold">{cat.count}</span>
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
      
      <motion.div 
        whileHover={{ scale: 1.02, rotateY: 5 }}
        style={{ perspective: 1000 }}
        className={`p-12 rounded-[4.5rem] shadow-3xl relative overflow-hidden group transition-all duration-700 cursor-pointer ${
          isVip 
          ? 'bg-gradient-to-br from-green-600 to-teal-800 shadow-green-900/30' 
          : 'bg-gradient-to-br from-orange-600 to-red-800 shadow-orange-900/50'
        }`}
      >
         <div className="absolute -top-10 -right-10 p-4 opacity-10 group-hover:rotate-45 transition-transform duration-1000 scale-[2]">
            <i className={`fas ${isVip ? 'fa-medal' : 'fa-crown'} text-9xl text-white`}></i>
         </div>
         
         <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                 <i className={`fas ${isVip ? 'fa-check' : 'fa-bolt'} text-white text-xl`}></i>
               </div>
               <h3 className="text-white font-black text-2xl uppercase tracking-tighter">
                 {isVip ? 'VIP VERIFIED' : 'UPGRADE PASS'}
               </h3>
            </div>
            
            <p className="text-white/80 text-[11px] font-bold uppercase tracking-[0.3em] leading-loose">
              {isVip 
                ? 'Your account has full clearance. High speed servers 1-5 are online.' 
                : 'Unlock the original 4K masters and bypass all archive waiting queues.'
              }
            </p>

            {!isVip && (
              <motion.button 
                whileHover={{ scale: 1.05, shadow: "0px 10px 30px rgba(0,0,0,0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenPayment}
                className="w-full bg-white text-gray-950 font-black py-5 rounded-[2rem] shadow-2xl transition-all text-[11px] uppercase tracking-widest mt-6"
              >
                SECURE VIP ACCESS
              </motion.button>
            )}

            {isVip && (
               <div className="pt-6 flex items-center gap-4">
                  <span className="text-[10px] text-white font-black tracking-[0.4em] uppercase opacity-70">SERVER LATENCY: 2ms</span>
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse delay-75"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse delay-150"></div>
                  </div>
               </div>
            )}
         </div>
      </motion.div>

      <div className="bg-white/5 p-10 rounded-[4rem] border border-white/5 space-y-8 backdrop-blur-md">
         <h3 className="text-[11px] text-gray-600 font-black uppercase tracking-[0.5em] text-center">VIP TRENDING</h3>
         <div className="space-y-6">
            {recentUpdates.map((movie, i) => (
               <motion.div 
                key={movie.id} 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => onSelectMovie(movie)} 
                className="flex items-center gap-5 group cursor-pointer"
               >
                  <div className="w-16 h-20 rounded-2xl overflow-hidden border border-white/10 shrink-0 shadow-xl group-hover:scale-110 transition-transform duration-500">
                    <img src={movie.imageUrl} className="w-full h-full object-cover" alt="Trending" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-[11px] text-white font-black line-clamp-1 group-hover:text-orange-500 transition-colors uppercase tracking-tight">{movie.title}</h4>
                    <div className="flex items-center gap-2">
                       <span className="text-[8px] text-orange-500 font-black uppercase tracking-widest px-2 py-0.5 bg-orange-500/10 rounded-md">NEW</span>
                       <span className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">{movie.quality}</span>
                    </div>
                  </div>
               </motion.div>
            ))}
         </div>
      </div>
    </aside>
  );
};

export default Sidebar;
