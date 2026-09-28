import React, { useState } from 'react';
import { X, CheckCircle, Shield, Zap, Sparkles } from 'lucide-react';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="w-full max-w-md bg-white dark:bg-[#1e222d] text-[#131722] dark:text-[#f0f3fa] rounded-3xl shadow-2xl border border-gray-200 dark:border-[#2a2e39] overflow-hidden p-6 animate-in zoom-in-95 duration-150 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-10 text-center space-y-3">
            <CheckCircle className="w-12 h-12 text-[#089981] mx-auto animate-bounce" />
            <h3 className="text-xl font-bold">Welcome aboard!</h3>
            <p className="text-xs text-gray-500">Your TradingView account is verified. Happy charting!</p>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="text-center pt-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#1e53e5] to-[#9b30ff] flex items-center justify-center mx-auto mb-3 shadow-md">
                <svg className="w-7 h-5 text-white fill-current" viewBox="0 0 36 28">
                  <path d="M0 4C0 1.79 1.79 0 4 0h6c2.21 0 4 1.79 4 4v16c0 2.21-1.79 4-4 4H4c-2.21 0-4-1.79-4-4V4z" />
                  <path d="M16 11c0-2.21 1.79-4 4-4h6c2.21 0 4 1.79 4 4v9c0 2.21-1.79 4-4 4h-6c-2.21 0-4-1.79-4-4v-9z" />
                  <path d="M28 3.5C28 1.57 29.57 0 31.5 0h.5C33.99 0 36 2.01 36 4.5v19c0 2.49-2.01 4.5-4 4.5h-.5C29.57 28 28 26.43 28 24.5V3.5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight">Join 60+ Million Traders</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                The world’s top charting platform and social network for traders and investors.
              </p>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                <CheckCircle className="w-4 h-4 text-[#089981] shrink-0" />
                <span>Real-time price feeds for Stocks, Crypto, Forex & Futures</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                <CheckCircle className="w-4 h-4 text-[#089981] shrink-0" />
                <span>Over 100+ built-in technical indicators & custom scripts</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                <CheckCircle className="w-4 h-4 text-[#089981] shrink-0" />
                <span>Synchronized watchlists and custom multi-screen alerts</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 pt-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#2a2e39] bg-gray-50 dark:bg-[#131722] text-sm focus:outline-hidden focus:border-[#2962ff]"
              />
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#1e53e5] via-[#2962ff] to-[#9b30ff] text-white font-bold text-sm shadow-md hover:opacity-95 active:scale-98 transition cursor-pointer"
              >
                Get Started Free
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
