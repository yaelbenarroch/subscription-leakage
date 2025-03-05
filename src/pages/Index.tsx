
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SubscriptionAnalytics from '@/components/SubscriptionAnalytics';
import TransactionDashboard from '@/components/TransactionDashboard';
import PredictionEngine from '@/components/PredictionEngine';
import FinancialChatbot from '@/components/FinancialChatbot';
import Header from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { transactions, subscriptions } from '@/data/sampleData';
import { LayoutDashboard, PieChart, LineChart, MessageSquare } from 'lucide-react';

const Index = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-indigo-50">
        <div className="space-y-6 text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-16 h-16 rounded-full border-t-2 border-indigo-500 animate-spin mx-auto"
          />
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-sm font-light tracking-wide text-gray-500"
          >
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-medium">AI Analysis</span> in progress...
          </motion.h2>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-white to-indigo-50/30"
    >
      <Header />

      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <motion.div variants={itemVariants}>
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8 bg-white/80 backdrop-blur-sm border border-indigo-100 rounded-xl p-1 shadow-sm">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg">
                <PieChart className="h-4 w-4 mr-2" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="predictions" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg">
                <LineChart className="h-4 w-4 mr-2" />
                Predictions
              </TabsTrigger>
              <TabsTrigger value="assistant" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg">
                <MessageSquare className="h-4 w-4 mr-2" />
                Assistant
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="mt-6">
              <TransactionDashboard transactions={transactions} subscriptions={subscriptions} />
            </TabsContent>
            
            <TabsContent value="analytics" className="mt-6">
              <SubscriptionAnalytics subscriptions={subscriptions} />
            </TabsContent>
            
            <TabsContent value="predictions" className="mt-6">
              <PredictionEngine />
            </TabsContent>
            
            <TabsContent value="assistant" className="mt-6">
              <FinancialChatbot />
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </motion.div>
  );
};

export default Index;
