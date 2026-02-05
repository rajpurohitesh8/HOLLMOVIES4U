
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onPaymentSuccess }) => {
  const [step, setStep] = useState<'selection' | 'qr' | 'verifying'>('selection');
  const [transactionId, setTransactionId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = () => {
    if (!transactionId.trim()) {
      alert("Please enter the Transaction ID/Reference Number from your UPI app.");
      return;
    }
    setStep('verifying');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onPaymentSuccess();
      onClose();
    }, 4500);
  };

  const paymentPlans = [
    { 
      name: 'PRO MONTHLY', 
      price: '₹99', 
      period: 'MONTH', 
      features: ['Direct Mirrors', 'No Popups', 'VIP Badge'] 
    },
    { 
      name: 'PLATINUM VIP', 
      price: '₹299', 
      period: 'YEAR', 
      features: ['4K Original Masters', 'Parallel Downloading', 'Dedicated Support', 'Early Access'], 
      popular: true 
    },
    { 
      name: 'ELITE FOREVER', 
      price: '₹999', 
      period: 'LIFETIME', 
      features: ['Ultimate Access', 'Beta Testing', 'Custom Requests', 'Cloud Backup'] 
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/98 backdrop-blur-3xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100, rotateX: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100, rotateX: 30 }}
            transition={{ type: "spring", damping: 20, stiffness: 150 }}
            style={{ perspective: 1200 }}
            className="relative bg-gray-950 border border-white/10 w-full max-w-4xl rounded-[4rem] overflow-hidden shadow-[0_0_120px_rgba(234,88,12,0.3)]"
          >
            <div className="p-10 sm:p-20">
              <button onClick={onClose} className="absolute top-10 right-10 text-gray-500 hover:text-white transition-all bg-white/5 w-14 h-14 rounded-full flex items-center justify-center border border-white/10 hover:rotate-90">
                <i className="fas fa-times text-xl"></i>
              </button>

              {step === 'selection' && (
                <div className="space-y-12">
                  <div className="text-center space-y-6">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex justify-center"
                    >
                      <span className="bg-orange-600/20 text-orange-500 text-[11px] font-black px-6 py-2 rounded-full uppercase tracking-[0.6em] border border-orange-500/30 shadow-2xl">
                        ELITE MEMBERSHIP
                      </span>
                    </motion.div>
                    <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter">Choose Your Power Plan</h2>
                    <p className="text-gray-500 text-sm max-w-lg mx-auto leading-relaxed font-medium uppercase tracking-widest">
                      Unlock high-fidelity cinematic experiences without boundaries.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {paymentPlans.map((plan, i) => (
                      <motion.div 
                        key={plan.name}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => setStep('qr')}
                        className={`p-10 rounded-[3rem] border transition-all cursor-pointer group flex flex-col items-center text-center relative overflow-hidden ${
                          plan.popular 
                          ? 'bg-orange-600/10 border-orange-600/50 shadow-[0_30px_60px_-15px_rgba(234,88,12,0.3)]' 
                          : 'bg-white/5 border-white/5 hover:border-white/20'
                        }`}
                      >
                        {plan.popular && (
                          <div className="absolute top-0 right-0 bg-orange-600 text-white text-[9px] font-black px-6 py-2 rounded-bl-3xl uppercase tracking-widest shadow-xl">RECOMMENDED</div>
                        )}
                        <span className="text-[11px] font-black text-gray-500 uppercase tracking-[0.3em] mb-4">{plan.name}</span>
                        <div className="mb-8">
                          <span className="text-4xl font-black text-white">{plan.price}</span>
                          <span className="text-[11px] text-gray-600 font-bold ml-2">/{plan.period}</span>
                        </div>
                        <ul className="space-y-4 mb-10 flex-grow">
                          {plan.features.map(f => (
                            <li key={f} className="text-[10px] font-black text-gray-400 uppercase tracking-tight flex items-center justify-center gap-3">
                              <i className="fas fa-check-circle text-orange-500"></i> {f}
                            </li>
                          ))}
                        </ul>
                        <button className={`w-full py-5 rounded-3xl text-[10px] font-black uppercase tracking-[0.3em] transition-all ${
                          plan.popular ? 'bg-orange-600 text-white shadow-3xl' : 'bg-white/10 text-white group-hover:bg-white/20'
                        }`}>
                          SELECT {plan.name}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 'qr' && (
                <div className="space-y-12 flex flex-col items-center">
                  <div className="text-center space-y-4">
                    <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Secure Gateway</h2>
                    <p className="text-orange-500 text-[11px] font-black uppercase tracking-[0.5em]">Instant Activation Link Encrypted</p>
                  </div>

                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white p-10 rounded-[4rem] shadow-4xl relative overflow-hidden flex flex-col items-center group cursor-none"
                  >
                    <div className="w-64 h-64 bg-white flex items-center justify-center">
                       <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=7976385008@naviaxis&pn=Hitesh&cu=INR`} 
                        alt="VIP Payment QR" 
                        className="w-full h-full"
                       />
                    </div>
                    <div className="mt-8 flex flex-col items-center gap-4">
                       <span className="text-gray-900 text-[11px] font-black tracking-[0.5em] uppercase mb-2 border-b border-gray-100 pb-2">Verified Payee: HITESH</span>
                       <div className="flex items-center gap-6">
                         <img src="https://img.icons8.com/color/48/google-pay-india.png" className="h-8 transition-transform hover:scale-110" alt="GPay" />
                         <img src="https://img.icons8.com/color/48/phonepe.png" className="h-8 transition-transform hover:scale-110" alt="PhonePe" />
                         <img src="https://img.icons8.com/color/48/paytm.png" className="h-8 transition-transform hover:scale-110" alt="Paytm" />
                       </div>
                    </div>
                  </motion.div>

                  <div className="w-full max-w-md space-y-6">
                     <div className="bg-white/5 p-8 rounded-[3rem] border border-white/10 space-y-4 backdrop-blur-xl">
                        <div className="flex justify-between items-center border-b border-white/5 pb-4">
                           <span className="text-[11px] text-gray-500 font-black tracking-[0.3em] uppercase">Private UPI</span>
                           <span className="text-white font-black tracking-tight text-base">7976385008@naviaxis</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-[11px] text-gray-500 font-black tracking-[0.3em] uppercase">Phone Line</span>
                           <span className="text-white font-black tracking-tight text-base">+91 7976385008</span>
                        </div>
                     </div>

                     <div className="space-y-4">
                        <label className="text-[11px] font-black text-orange-500 uppercase tracking-[0.4em] ml-2">Digital Receipt / Ref No.</label>
                        <input 
                          type="text"
                          placeholder="Input 12-digit transaction number"
                          className="w-full bg-black/60 border border-white/10 rounded-[2rem] py-5 px-8 text-white text-base focus:ring-2 focus:ring-orange-600 outline-none transition-all placeholder:text-gray-800 font-black text-center tracking-widest"
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value)}
                        />
                     </div>

                     <button 
                       onClick={handleVerify}
                       className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black py-7 rounded-[2.5rem] shadow-[0_25px_50px_-10px_rgba(234,88,12,0.5)] transition-all active:scale-95 uppercase tracking-[0.4em] text-xs"
                     >
                       VERIFY & UPGRADE NOW
                     </button>
                  </div>
                  
                  <button onClick={() => setStep('selection')} className="text-gray-600 hover:text-white text-[11px] font-black uppercase tracking-[0.4em] transition-all">
                    <i className="fas fa-chevron-left mr-3"></i> CHANGE POWER PLAN
                  </button>
                </div>
              )}

              {step === 'verifying' && (
                <div className="py-32 flex flex-col items-center space-y-12">
                  <div className="relative">
                    <div className="w-36 h-36 border-[12px] border-white/5 rounded-full"></div>
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-[12px] border-t-orange-600 border-r-transparent border-b-transparent border-l-transparent rounded-full shadow-[0_0_60px_rgba(234,88,12,0.5)]"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <i className="fas fa-shield-alt text-orange-500 text-4xl animate-pulse"></i>
                    </div>
                  </div>
                  <div className="text-center space-y-4">
                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Authenticating Signature</h3>
                    <p className="text-gray-500 text-[11px] font-black uppercase tracking-[0.6em] animate-pulse">Cross-referencing banking ledgers...</p>
                  </div>
                  <div className="w-full max-w-sm bg-white/5 h-2 rounded-full overflow-hidden shadow-inner">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 4.3 }}
                      className="h-full bg-gradient-to-r from-orange-600 to-red-600"
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
