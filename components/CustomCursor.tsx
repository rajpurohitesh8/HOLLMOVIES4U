
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // High-precision motion values for core tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Ultra-responsive primary ring (The 'Leader')
  const primarySpringConfig = { damping: 40, stiffness: 450, mass: 0.1 };
  const trailX = useSpring(cursorX, primarySpringConfig);
  const trailY = useSpring(cursorY, primarySpringConfig);

  // Softer, liquid secondary ring (The 'Follower')
  const secondarySpringConfig = { damping: 35, stiffness: 200, mass: 0.3 };
  const softX = useSpring(cursorX, secondarySpringConfig);
  const softY = useSpring(cursorY, secondarySpringConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('.cursor-pointer') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.classList.contains('group');
      
      setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible, cursorX, cursorY]);

  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Precision Core - Minimal 1px dot */}
      <motion.div
        className="fixed w-1 h-1 bg-white rounded-full mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      />

      {/* Primary High-Speed Ring - Very small idle state */}
      <motion.div
        className="fixed rounded-full border border-orange-500/40"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovering ? 32 : 12,
          height: isHovering ? 32 : 12,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 350 }}
      >
        {/* Pulsing Core on Hover */}
        <AnimatePresence>
          {isHovering && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-[3px] h-[3px] bg-orange-500 rounded-full shadow-[0_0_5px_#f97316]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Secondary Soft Liquid Ring */}
      <motion.div
        className="fixed rounded-full border border-orange-500/10 shadow-[0_0_15px_rgba(249,115,22,0.05)]"
        style={{
          x: softX,
          y: softY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovering ? 44 : 18,
          height: isHovering ? 44 : 18,
        }}
      >
        <AnimatePresence>
          {isHovering && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-orange-600 rounded-full blur-xl"
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Hover Status Crosshairs - Refined and shorter */}
      <AnimatePresence>
        {isHovering && (
          <motion.div 
            initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            style={{ x: trailX, y: trailY, translateX: '-50%', translateY: '-50%' }}
            className="fixed pointer-events-none"
          >
            <div className="relative w-12 h-12">
              {[0, 90, 180, 270].map((deg) => (
                <div
                  key={deg}
                  style={{ transform: `rotate(${deg}deg) translateY(-50%)` }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[1px] h-1.5 bg-orange-500 rounded-full"
                />
              ))}
              {/* Spinning VIP Indicator - Miniature */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                 <div className="w-8 h-8 border border-dashed border-orange-500/10 rounded-full" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomCursor;
