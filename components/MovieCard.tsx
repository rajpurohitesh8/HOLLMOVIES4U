
import React, { useState } from 'react';
import { Movie } from '../types';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Subtle 3D for mobile, stronger for desktop
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setShowShareMenu(false);
  };

  return (
    <motion.div 
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="bg-gray-950/40 border border-white/5 rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden group hover:border-orange-500/50 transition-all duration-300 shadow-2xl cursor-pointer relative flex flex-col h-full backdrop-blur-md"
      onClick={() => onClick(movie)}
    >
      <div className="relative aspect-[2/3] overflow-hidden shrink-0" style={{ transform: "translateZ(30px)" }}>
        <img 
          src={movie.imageUrl} 
          alt={movie.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        
        {/* Quality Label */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10" style={{ transform: "translateZ(50px)" }}>
          <span className="bg-orange-600/90 backdrop-blur-md text-[7px] sm:text-[8px] font-black px-2 sm:px-3 py-1 sm:py-1.5 rounded-full uppercase shadow-2xl tracking-[0.1em] sm:tracking-[0.2em] text-white border border-white/10">
            {movie.quality}
          </span>
        </div>

        {/* Action Overlay - Netflix style mobile interactions */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 sm:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out lg:opacity-0 lg:group-hover:opacity-100">
           <div className="flex gap-2">
             <button className="flex-1 bg-white text-black text-[8px] sm:text-[10px] font-black py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl uppercase tracking-widest shadow-xl">
               DETAILS
             </button>
             <button 
                onClick={(e) => { e.stopPropagation(); }}
                className="w-10 h-10 sm:w-11 sm:h-11 bg-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center border border-white/10 hover:bg-orange-600 hover:text-white transition-all"
             >
                <i className="fas fa-plus text-xs"></i>
             </button>
           </div>
        </div>
      </div>
      
      <div className="p-4 sm:p-7 flex flex-col flex-grow" style={{ transform: "translateZ(20px)" }}>
        <h3 className="text-xs sm:text-sm font-black text-white group-hover:text-orange-500 line-clamp-2 leading-tight transition-colors mb-2 sm:mb-4 h-8 sm:h-10 uppercase tracking-tight">
          {movie.title}
        </h3>
        <div className="flex justify-between items-center mt-auto border-t border-white/5 pt-3 sm:pt-4">
           <span className="text-[8px] sm:text-[10px] text-gray-600 font-bold uppercase tracking-widest truncate max-w-[60%]">{movie.category}</span>
           <span className="text-[8px] sm:text-[10px] text-orange-500 font-black">{movie.year}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;
