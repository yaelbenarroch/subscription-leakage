
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NetworkGraph } from '@/components/NetworkGraph';
import { formatCurrency, formatDate } from '@/lib/formatters';

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
  subscriptions: Subscription[];
}

const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'low':
      return 'bg-green-100 text-green-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'high':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const SubscriptionAnalytics: React.FC<Props> = ({ subscriptions }) => {
  const [view, setView] = useState('list');
  
  // Annual cost calculation
  const annualCost = subscriptions.reduce((total, sub) => {
    let multiplier = 1;
    if (sub.frequency === 'monthly') multiplier = 12;
    if (sub.frequency === 'quarterly') multiplier = 4;
    if (sub.frequency === 'weekly') multiplier = 52;
    return total + (sub.amount * multiplier);
  }, 0);
  
  // Category distribution
  const categories = subscriptions.reduce((acc: {[key: string]: number}, sub) => {
    acc[sub.category] = (acc[sub.category] || 0) + sub.amount;
    return acc;
  }, {});
  
  const sortedSubscriptions = [...subscriptions].sort((a, b) => {
    // Sort by risk level (high to low) and then by amount (high to low)
    const riskOrder = { high: 0, medium: 1, low: 2 };
    if (riskOrder[a.risk as keyof typeof riskOrder] !== riskOrder[b.risk as keyof typeof riskOrder]) {
      return riskOrder[a.risk as keyof typeof riskOrder] - riskOrder[b.risk as keyof typeof riskOrder];
    }
    return b.amount - a.amount;
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

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
              <CardTitle className="text-sm font-medium text-gray-500">Annual Subscription Cost</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-light">{formatCurrency(annualCost)}</div>
              <p className="text-xs text-gray-500 mt-1">Based on current subscriptions</p>
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
              <CardTitle className="text-sm font-medium text-gray-500">Total Subscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-light">{subscriptions.length}</div>
              <p className="text-xs text-gray-500 mt-1">Across {Object.keys(categories).length} categories</p>
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
              <CardTitle className="text-sm font-medium text-gray-500">Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <div className="flex-1 bg-gray-100 p-2 rounded text-center">
                  <p className="text-xs text-gray-500">High</p>
                  <p className="text-lg font-medium">{subscriptions.filter(s => s.risk === 'high').length}</p>
                </div>
                <div className="flex-1 bg-gray-100 p-2 rounded text-center">
                  <p className="text-xs text-gray-500">Medium</p>
                  <p className="text-lg font-medium">{subscriptions.filter(s => s.risk === 'medium').length}</p>
                </div>
                <div className="flex-1 bg-gray-100 p-2 rounded text-center">
                  <p className="text-xs text-gray-500">Low</p>
                  <p className="text-lg font-medium">{subscriptions.filter(s => s.risk === 'low').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Subscription Analysis</CardTitle>
                <CardDescription>
                  Detailed breakdown of your recurring expenses
                </CardDescription>
              </div>
              <Tabs value={view} onValueChange={setView} className="w-[200px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="list">List</TabsTrigger>
                  <TabsTrigger value="cluster">Clusters</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            {view === 'list' ? (
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Next Charge</TableHead>
                      <TableHead>Risk</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedSubscriptions.map((subscription) => (
                      <TableRow key={subscription.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8 bg-gray-100">
                              <div className="text-xs text-gray-500">{subscription.name.substring(0, 2)}</div>
                            </Avatar>
                            <span className="font-medium text-sm">{subscription.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{subscription.category}</TableCell>
                        <TableCell className="capitalize">{subscription.frequency}</TableCell>
                        <TableCell>{formatCurrency(subscription.amount)}</TableCell>
                        <TableCell>{formatDate(subscription.nextCharge)}</TableCell>
                        <TableCell>
                          <Badge className={`${getRiskColor(subscription.risk)} capitalize`}>
                            {subscription.risk}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="h-[500px] w-full">
                <NetworkGraph />
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SubscriptionAnalytics;
