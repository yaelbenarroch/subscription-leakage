
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AreaChart, BarChart } from '@/components/Charts';
import { formatCurrency, formatDate } from '@/lib/formatters';

interface Transaction {
  id: string;
  date: string;
  amount: number;
  merchant: string;
  category: string;
  isSubscription: boolean;
}

interface Subscription {
  id: string;
  name: string;
  amount: number;
  frequency: string;
  lastCharged: string;
  nextCharge: string;
  category: string;
  risk: 'low' | 'medium' | 'high';
}

interface Props {
  transactions: Transaction[];
  subscriptions: Subscription[];
}

const TransactionDashboard: React.FC<Props> = ({ transactions, subscriptions }) => {
  const [timeframe, setTimeframe] = useState('month');
  
  // Calculate metrics
  const totalSpend = transactions.reduce((acc, t) => acc + t.amount, 0);
  const subscriptionSpend = transactions
    .filter(t => t.isSubscription)
    .reduce((acc, t) => acc + t.amount, 0);
  const subscriptionPercentage = Math.round((subscriptionSpend / totalSpend) * 100);
  
  // Get high risk subscriptions
  const highRiskSubscriptions = subscriptions.filter(s => s.risk === 'high');
  
  // Recent transactions (last 5)
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  
  // Monthly subscription data for chart
  const monthlyData = [
    { month: 'Jan', amount: 320 },
    { month: 'Feb', amount: 350 },
    { month: 'Mar', amount: 365 },
    { month: 'Apr', amount: 420 },
    { month: 'May', amount: 455 },
    { month: 'Jun', amount: 480 },
  ];
  
  // Category data for chart
  const categoryData = [
    { category: 'Entertainment', amount: 215 },
    { category: 'Software', amount: 175 },
    { category: 'Food Delivery', amount: 120 },
    { category: 'News', amount: 90 },
    { category: 'Fitness', amount: 60 },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Monthly Spend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-light">{formatCurrency(totalSpend)}</div>
              <p className="text-xs text-gray-500 mt-1">+5.2% from last month</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Subscription Spending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-light">{formatCurrency(subscriptionSpend)}</div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2">
                <div 
                  className="bg-blue-500 h-1.5 rounded-full" 
                  style={{ width: `${subscriptionPercentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{subscriptionPercentage}% of total spending</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">At-Risk Subscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-light">{highRiskSubscriptions.length}</div>
              <p className="text-xs text-gray-500 mt-1">Potential overdraft in next 30 days</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Subscription Trend</CardTitle>
              <CardDescription>
                Monthly subscription spending over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <AreaChart data={monthlyData} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Spending by Category</CardTitle>
              <CardDescription>
                Subscription distribution across categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <BarChart data={categoryData} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              Your latest financial activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-10 w-10 bg-gray-100">
                      <div className="text-xs text-gray-500">{transaction.merchant.substring(0, 2)}</div>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{transaction.merchant}</p>
                      <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {transaction.isSubscription && (
                      <Badge variant="outline" className="text-xs font-normal">
                        Subscription
                      </Badge>
                    )}
                    <span className={`text-sm ${transaction.amount > 0 ? "text-red-500" : "text-green-500"}`}>
                      {formatCurrency(transaction.amount)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default TransactionDashboard;
