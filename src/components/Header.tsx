
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BarChart3, BellRing } from 'lucide-react';

const Header = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white border-b border-indigo-100 sticky top-0 z-10"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-7xl">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-light tracking-tight text-gray-900">
              Subscription<span className="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Leakage</span>
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">Financial Intelligence Suite</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>AI Model: Active</span>
          </div>
          <div className="text-sm text-gray-600 flex items-center space-x-2">
            <BarChart3 className="h-4 w-4 text-indigo-500" />
            <span>Last Updated: Today, 10:45 AM</span>
          </div>
          <div className="relative">
            <BellRing className="h-5 w-5 text-gray-500 hover:text-indigo-600 cursor-pointer transition-colors" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] text-white">2</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
