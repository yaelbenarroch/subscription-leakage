
import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white border-b border-gray-100"
    >
      <div className="container mx-auto px-4 py-6 flex justify-between items-center max-w-7xl">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-500 flex items-center justify-center">
            <span className="text-white font-medium text-xs">SL</span>
          </div>
          <div>
            <h1 className="text-xl font-light tracking-tight text-gray-900">Subscription<span className="font-medium">Leakage</span></h1>
            <p className="text-xs text-gray-500 mt-0.5">Financial Intelligence Engine</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
            <span>Model Status: Active</span>
          </div>
          <div className="text-sm text-gray-600">
            Last Updated: Today, 10:45 AM
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
