
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';

interface AIAssistantProps {
  isOpenOverride?: boolean;
  onCloseOverride?: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ isOpenOverride, onCloseOverride }) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: 'Hello! I am your HOLLMOVIES4U VIP Assistant. How can I help you today?' }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isOpen = isOpenOverride !== undefined ? isOpenOverride : internalOpen;
  const setIsOpen = onCloseOverride !== undefined ? onCloseOverride : (val: boolean) => setInternalOpen(val);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const history = messages.map(m => ({ 
        role: m.role === 'user' ? 'user' : 'model', 
        parts: [{ text: m.text }] 
      }));
      const response = await geminiService.getChatResponse(userMsg, history);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting to the network. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FAB - Only visible if not controlled externally */}
      {isOpenOverride === undefined && (
        <motion.button 
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setInternalOpen(true)}
          className="hidden lg:flex fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-tr from-orange-600 to-orange-400 text-white rounded-2xl shadow-2xl items-center justify-center z-[60] group border border-white/20"
        >
          <i className="fas fa-robot text-2xl"></i>
          <div className="absolute -top-1 px-2 py-0.5 bg-red-500 rounded-full text-[8px] font-black border-2 border-gray-900 shadow-lg">LIVE</div>
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[200] flex items-center justify-end lg:p-8">
            <motion.div 
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-gray-950 border-0 lg:border border-white/10 w-full lg:max-w-md h-full lg:h-[80vh] lg:rounded-3xl shadow-2xl overflow-hidden flex flex-col relative"
            >
              {/* Header */}
              <div className="bg-white/5 p-6 flex justify-between items-center border-b border-white/5 pt-12 lg:pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                    <i className="fas fa-brain text-white"></i>
                  </div>
                  <div>
                    <h2 className="text-sm font-black text-white uppercase tracking-widest">VIP AI AGENT</h2>
                    <p className="text-[10px] text-orange-500 font-bold uppercase tracking-widest flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> ONLINE
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-500 hover:text-white"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              {/* Chat Area */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-gray-950 to-black scroll-smooth">
                {messages.map((msg, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={idx} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm ${
                      msg.role === 'user' 
                      ? 'bg-orange-600 text-white rounded-tr-none shadow-lg shadow-orange-900/20 font-medium' 
                      : 'bg-white/5 text-gray-300 border border-white/10 rounded-tl-none font-medium'
                    }`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 px-4 py-3 rounded-2xl flex gap-1 items-center">
                      <div className="w-1 h-1 bg-orange-500 rounded-full animate-bounce delay-75"></div>
                      <div className="w-1 h-1 bg-orange-500 rounded-full animate-bounce delay-150"></div>
                      <div className="w-1 h-1 bg-orange-500 rounded-full animate-bounce delay-300"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-6 bg-black border-t border-white/5 pb-12 lg:pb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Ask VIP Assistant..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 pr-14 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all placeholder:text-gray-600"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  />
                  <button 
                    onClick={handleSend}
                    disabled={loading || !input.trim()}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-orange-600 hover:bg-orange-500 text-white rounded-xl transition-all disabled:opacity-50 flex items-center justify-center shadow-lg"
                  >
                    <i className={`fas ${loading ? 'fa-circle-notch fa-spin' : 'fa-paper-plane'}`}></i>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
