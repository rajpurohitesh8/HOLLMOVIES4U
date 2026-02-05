
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: User) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mocking auth process
    setTimeout(() => {
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name || 'Hitesh Singh',
        email: formData.email,
        role: 'vip'
      };
      onAuthSuccess(mockUser);
      setLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-gray-900 border border-white/10 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-orange-600/20">
                  <i className="fas fa-lock text-white text-2xl"></i>
                </div>
                <h2 className="text-2xl font-black text-white uppercase tracking-widest">{isLogin ? 'VIP LOGIN' : 'JOIN THE CLUB'}</h2>
                <p className="text-gray-500 text-xs mt-2 uppercase font-bold tracking-[0.2em]">Unlock Premium Features</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Hitesh Singh"
                      className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 px-5 text-white focus:ring-2 focus:ring-orange-500/50 outline-none transition-all"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                )}
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="name@email.com"
                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 px-5 text-white focus:ring-2 focus:ring-orange-500/50 outline-none transition-all"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Password</label>
                  <input 
                    type="password" 
                    required
                    placeholder="••••••••"
                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 px-5 text-white focus:ring-2 focus:ring-orange-500/50 outline-none transition-all"
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                  />
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black py-4 rounded-2xl shadow-xl shadow-orange-600/20 transition-all active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest"
                >
                  {loading ? <i className="fas fa-circle-notch fa-spin"></i> : (isLogin ? 'SIGN IN' : 'CREATE ACCOUNT')}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                  {isLogin ? "Don't have an account?" : "Already a member?"}
                  <button 
                    onClick={() => setIsLogin(!isLogin)}
                    className="ml-2 text-orange-500 hover:text-orange-400 underline"
                  >
                    {isLogin ? 'SIGN UP' : 'LOG IN'}
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
