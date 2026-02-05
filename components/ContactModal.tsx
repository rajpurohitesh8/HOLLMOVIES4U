
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const contacts = [
    { icon: 'fa-envelope', label: 'EMAIL', value: 'hiteshsinghr274@gmail.com', href: 'mailto:hiteshsinghr274@gmail.com', color: 'bg-blue-600' },
    { icon: 'fa-phone-alt', label: 'MOBILE', value: '+91 7976385008', href: 'tel:+917976385008', color: 'bg-green-600' },
    { icon: 'fab fa-whatsapp', label: 'WHATSAPP', value: 'Chat with us', href: 'https://wa.me/917976385008', color: 'bg-emerald-500' },
    { icon: 'fab fa-telegram-plane', label: 'TELEGRAM', value: '@hollmovies4u', href: '#', color: 'bg-sky-500' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-gray-900 border border-white/10 w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            <div className="p-10">
              <div className="text-center mb-10">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-3 shadow-2xl">
                  <i className="fas fa-headset text-white text-3xl"></i>
                </div>
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter">CONTACT VIP SUPPORT</h2>
                <p className="text-orange-500 text-[10px] mt-2 uppercase font-black tracking-[0.4em]">We are here 24/7</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contacts.map((contact, idx) => (
                  <a 
                    key={idx}
                    href={contact.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col p-6 bg-white/5 border border-white/5 rounded-3xl hover:bg-white/10 transition-all hover:-translate-y-1 group"
                  >
                    <div className={`${contact.color} w-10 h-10 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                      <i className={`fas ${contact.icon} text-white`}></i>
                    </div>
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{contact.label}</span>
                    <span className="text-xs font-bold text-white truncate">{contact.value}</span>
                  </a>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-white/5">
                <button 
                  onClick={onClose}
                  className="w-full bg-white/5 hover:bg-white/10 text-white font-black py-4 rounded-2xl transition-all uppercase tracking-widest text-xs"
                >
                  CLOSE PORTAL
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
