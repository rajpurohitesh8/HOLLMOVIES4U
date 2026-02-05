
import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MovieCard from './components/MovieCard';
import AIAssistant from './components/AIAssistant';
import AuthModal from './components/AuthModal';
import ContactModal from './components/ContactModal';
import PaymentModal from './components/PaymentModal';
import CustomCursor from './components/CustomCursor';
import MobileBottomNav from './components/MobileBottomNav';
import { MOCK_MOVIES, CATEGORIES } from './constants';
import { Movie, User } from './types';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

const ITEMS_PER_PAGE = 12;

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterGenre, setFilterGenre] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [showGlobalMenu, setShowGlobalMenu] = useState(false);
  
  const [user, setUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'info'} | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const savedUser = localStorage.getItem('hollmovies_user');
    if (savedUser) {
      try { setUser(JSON.parse(savedUser)); } catch (e) { localStorage.removeItem('hollmovies_user'); }
    }
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [searchQuery, filterCategory, filterGenre, currentPage]);

  const handleAuthSuccess = (u: User) => {
    setUser(u);
    localStorage.setItem('hollmovies_user', JSON.stringify(u));
    setNotification({ message: `WELCOME BACK, ${u.name}!`, type: 'info' });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('hollmovies_user');
    setNotification({ message: 'LOGGED OUT SUCCESSFULLY', type: 'info' });
    setTimeout(() => setNotification(null), 3000);
  };

  const handlePaymentSuccess = () => {
    const baseUser = user || { id: 'user_' + Date.now(), name: 'HOLLMOVIES USER', email: 'guest@hollmovies4u.com' };
    const updatedUser: User = { ...baseUser, role: 'vip' };
    setUser(updatedUser);
    localStorage.setItem('hollmovies_user', JSON.stringify(updatedUser));
    setNotification({ message: 'VIP STATUS ACTIVATED! ENJOY PREMIUM ACCESS.', type: 'success' });
    setTimeout(() => setNotification(null), 6000);
  };

  const filteredMovies = useMemo(() => {
    return MOCK_MOVIES.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory === 'All' || movie.category === filterCategory;
      const matchesGenre = filterGenre === '' || movie.description.toLowerCase().includes(filterGenre.toLowerCase());
      return matchesSearch && matchesCategory && matchesGenre;
    });
  }, [searchQuery, filterCategory, filterGenre]);

  const paginatedMovies = filteredMovies.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-orange-600 selection:text-white bg-black text-gray-200 cursor-none scroll-smooth pb-20 lg:pb-0">
      <CustomCursor />
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-orange-600 z-[100] origin-left" style={{ scaleX }} />
      
      <Header 
        onSearch={setSearchQuery} 
        onNavigate={(cat) => { setFilterCategory(cat); setFilterGenre(''); }} 
        activeCategory={filterCategory} 
        user={user}
        onOpenAuth={() => setShowAuth(true)}
        onLogout={handleLogout}
        onOpenContact={() => setShowContact(true)}
        onOpenMenu={() => setShowGlobalMenu(true)}
      />

      {/* Mobile Horizontal Category Bar - "Where are the movie categories" fix */}
      <div className="lg:hidden bg-black/50 backdrop-blur-md border-b border-white/5 py-3 overflow-x-auto whitespace-nowrap scrollbar-hide flex gap-3 px-4 no-scrollbar">
        {['All', ...CATEGORIES.map(c => c.name)].map((cat) => (
          <button
            key={cat}
            onClick={() => { setFilterCategory(cat); setFilterGenre(''); }}
            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${filterCategory === cat ? 'bg-orange-600 border-orange-400 text-white shadow-[0_0_15px_rgba(234,88,12,0.4)]' : 'bg-white/5 border-white/5 text-gray-500'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ y: -100, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -100, opacity: 0, scale: 0.8 }}
            className={`fixed top-24 left-1/2 -translate-x-1/2 z-[200] px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.4em] shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-3xl border text-center ${
              notification.type === 'success' ? 'bg-green-600/30 text-green-400 border-green-500/40' : 'bg-orange-600/30 text-orange-400 border-orange-500/40'
            }`}
          >
             <i className={`fas ${notification.type === 'success' ? 'fa-check-circle' : 'fa-info-circle'} mr-4`}></i>
             {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="flex-1 space-y-12 lg:space-y-16">
            <motion.div 
              style={{ perspective: 1500 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative h-[250px] sm:h-[450px] rounded-[2.5rem] lg:rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(234,88,12,0.3)] group border border-white/10"
            >
               <motion.img 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                src="https://picsum.photos/seed/vip-featured/1600/900" 
                className="w-full h-full object-cover brightness-[0.3]" 
                alt="VIP Banner" 
               />
               <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-20 bg-gradient-to-t from-black via-transparent to-transparent">
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className={`flex items-center gap-3 text-[8px] sm:text-[10px] font-black px-4 py-2 rounded-full mb-4 w-fit tracking-[0.3em] uppercase border ${
                      user?.role === 'vip' ? 'bg-green-600/90 text-white border-green-400' : 'bg-orange-600/90 text-white border-orange-400'
                    }`}
                  >
                    <i className={`fas ${user?.role === 'vip' ? 'fa-crown' : 'fa-star-of-life'}`}></i> {user?.role === 'vip' ? 'PLATINUM VIP' : 'MEMBERSHIP REQUIRED'}
                  </motion.div>
                  <motion.h2 className="text-3xl sm:text-6xl font-black text-white leading-[1.1] uppercase tracking-tighter">
                    HOLL<span className="text-orange-500">MOVIES</span>4U
                  </motion.h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => !user?.role && setShowPayment(true)}
                    className="mt-6 sm:mt-10 px-6 sm:px-10 py-3 sm:py-5 bg-white text-black font-black text-[10px] sm:text-xs rounded-2xl w-fit uppercase tracking-widest shadow-2xl hover:bg-orange-500 hover:text-white transition-all"
                  >
                    {user?.role === 'vip' ? 'EXPLORE VAULT' : 'GET VIP PASS'}
                  </motion.button>
               </div>
            </motion.div>

            <section>
              <div className="flex items-center justify-between mb-8 sm:mb-12 border-b border-white/5 pb-6">
                 <div className="flex items-center gap-4">
                   <div className="w-8 h-1 bg-orange-600 rounded-full"></div>
                   <h2 className="text-xl sm:text-3xl font-black text-white uppercase tracking-tighter">
                     {filterCategory === 'All' ? 'LATEST ARCHIVES' : filterCategory}
                   </h2>
                 </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-10">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="bg-white/5 animate-pulse rounded-[1.5rem] aspect-[2/3] border border-white/5"></div>
                  ))}
                </div>
              ) : (
                <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-10">
                  {paginatedMovies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} onClick={setSelectedMovie} />
                  ))}
                </motion.div>
              )}
            </section>
          </div>

          <div className="hidden lg:block">
            <Sidebar onFilterGenre={setFilterGenre} onFilterCategory={(cat) => { setFilterCategory(cat); setFilterGenre(''); }} onSelectMovie={setSelectedMovie} activeGenre={filterGenre} activeCategory={filterCategory} onOpenPayment={() => setShowPayment(true)} isVip={user?.role === 'vip'} />
          </div>
        </div>
      </main>

      {/* Global Services & Menu Overlay - "Where is the menu button for services" fix */}
      <AnimatePresence>
        {showGlobalMenu && (
          <div className="fixed inset-0 z-[150]">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowGlobalMenu(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-3xl"
            />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 left-0 bottom-0 w-full max-w-sm bg-gray-950 border-r border-white/10 p-8 pt-20 overflow-y-auto"
            >
              <button onClick={() => setShowGlobalMenu(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-all bg-white/5 w-10 h-10 rounded-full flex items-center justify-center">
                <i className="fas fa-times"></i>
              </button>

              <div className="space-y-12">
                <div className="space-y-6">
                  <h3 className="text-orange-500 font-black text-[10px] tracking-[0.5em] uppercase flex items-center gap-4">
                    <span className="w-4 h-[2px] bg-orange-500"></span> PRO SERVICES
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { icon: 'fa-crown', label: 'VIP Pass Upgrade', action: () => { setShowPayment(true); setShowGlobalMenu(false); } },
                      { icon: 'fa-envelope', label: 'Contact Support', action: () => { setShowContact(true); setShowGlobalMenu(false); } },
                      { icon: 'fa-paper-plane', label: 'Request a Movie', action: () => alert('Request Feature Coming Soon!') },
                      { icon: 'fa-shield-alt', label: 'DMCA / Legal', action: () => alert('Legal Section') },
                      { icon: 'fa-robot', label: 'AI Assistant', action: () => { setIsAiOpen(true); setShowGlobalMenu(false); } },
                    ].map((svc, i) => (
                      <button 
                        key={i} 
                        onClick={svc.action}
                        className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 hover:border-orange-500 transition-all text-left"
                      >
                        <i className={`fas ${svc.icon} text-orange-500 w-5 text-center`}></i>
                        <span className="text-[11px] font-black text-white uppercase tracking-widest">{svc.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-gray-500 font-black text-[10px] tracking-[0.5em] uppercase flex items-center gap-4">
                    <span className="w-4 h-[2px] bg-gray-500"></span> MOVIE CATEGORIES
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {CATEGORIES.map((cat) => (
                      <button 
                        key={cat.id}
                        onClick={() => { setFilterCategory(cat.name); setFilterGenre(''); setShowGlobalMenu(false); }}
                        className={`flex justify-between items-center py-4 px-6 rounded-2xl border transition-all ${filterCategory === cat.name ? 'bg-orange-600/10 border-orange-500/30 text-orange-500' : 'bg-transparent border-transparent text-gray-400 hover:text-white'}`}
                      >
                        <span className="text-[11px] font-black uppercase tracking-widest">{cat.name}</span>
                        <i className="fas fa-chevron-right text-[10px] opacity-30"></i>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Existing Footer & Modals */}
      <MobileBottomNav activeTab={filterCategory === 'All' ? 'All' : 'Categories'} setActiveTab={(id) => { if (id === 'Categories') setShowGlobalMenu(true); else { setFilterCategory(id); setFilterGenre(''); } }} onOpenAI={() => setIsAiOpen(true)} onOpenSearch={() => { const searchInput = document.querySelector('header input') as HTMLInputElement; if (searchInput) { searchInput.focus(); window.scrollTo({ top: 0, behavior: 'smooth' }); } }} />
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} onAuthSuccess={handleAuthSuccess} />
      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />
      <PaymentModal isOpen={showPayment} onClose={() => setShowPayment(false)} onPaymentSuccess={handlePaymentSuccess} />
      <AIAssistant isOpenOverride={isAiOpen} onCloseOverride={() => setIsAiOpen(false)} />
      
      {/* Movie Details Modal */}
      <AnimatePresence>
        {selectedMovie && (
          <div className="fixed inset-0 bg-black/98 z-[120] flex items-center justify-center p-0 lg:p-4 backdrop-blur-3xl overflow-y-auto cursor-default">
             <motion.div initial={{ opacity: 0, scale: 0.9, y: 100 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 100 }} className="bg-gray-950 w-full lg:max-w-6xl lg:rounded-[4rem] flex flex-col lg:flex-row relative min-h-screen lg:min-h-0 overflow-hidden">
                <button onClick={() => setSelectedMovie(null)} className="absolute top-6 right-6 lg:top-10 lg:right-10 text-gray-500 hover:text-white z-[130] bg-white/5 w-12 h-12 rounded-full flex items-center justify-center"><i className="fas fa-times text-xl"></i></button>
                <div className="w-full lg:w-[45%] shrink-0 h-[350px] lg:h-auto"><img src={selectedMovie.imageUrl} className="w-full h-full object-cover" /></div>
                <div className="p-6 sm:p-10 lg:p-20 flex-1 space-y-8">
                   <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight uppercase tracking-tighter">{selectedMovie.title}</h2>
                   <p className="text-gray-400 text-sm lg:text-lg leading-[1.8] font-medium border-l-4 border-orange-600 pl-6 py-4">{selectedMovie.description}</p>
                   <div className="flex flex-col sm:flex-row gap-4">
                     <button onClick={() => user?.role === 'vip' ? alert("Direct Mirror...") : setShowPayment(true)} className="flex-[2] bg-orange-600 hover:bg-orange-500 text-white font-black py-5 rounded-2xl uppercase tracking-widest text-xs">{user?.role === 'vip' ? 'VIP DIRECT MIRROR' : 'UNLOCK VIP DOWNLOAD'}</button>
                     <button className="flex-1 bg-white/5 text-white font-black py-5 rounded-2xl border border-white/10 uppercase tracking-widest text-[10px]">TRAILER</button>
                   </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
