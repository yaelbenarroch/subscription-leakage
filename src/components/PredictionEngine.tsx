
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; 
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChartWithForecast } from '@/components/Charts';
import { formatCurrency } from '@/lib/formatters';

// Sample data
const forecastData = [
  { date: '2023-01-01', actual: 1200, predicted: null, upper: null, lower: null },
  { date: '2023-02-01', actual: 1350, predicted: null, upper: null, lower: null },
  { date: '2023-03-01', actual: 1400, predicted: null, upper: null, lower: null },
  { date: '2023-04-01', actual: 1500, predicted: null, upper: null, lower: null },
  { date: '2023-05-01', actual: 1620, predicted: null, upper: null, lower: null },
  { date: '2023-06-01', actual: 1750, predicted: null, upper: null, lower: null },
  { date: '2023-07-01', actual: 1820, predicted: 1820, upper: 1850, lower: 1790 },
  { date: '2023-08-01', actual: null, predicted: 1910, upper: 1980, lower: 1840 },
  { date: '2023-09-01', actual: null, predicted: 2050, upper: 2150, lower: 1950 },
  { date: '2023-10-01', actual: null, predicted: 2200, upper: 2350, lower: 2050 },
  { date: '2023-11-01', actual: null, predicted: 2380, upper: 2550, lower: 2200 },
  { date: '2023-12-01', actual: null, predicted: 2570, upper: 2800, lower: 2350 },
];

const riskFactors = [
  { 
    name: 'Income Stability',
    current: 'Medium',
    impact: 'High',
    description: 'Income consistency affects ability to maintain subscription payments'
  },
  { 
    name: 'Subscription Growth Rate',
    current: 'High',
    impact: 'High',
    description: 'Rate of adding new subscriptions is higher than average'
  },
  { 
    name: 'Payment Clustering',
    current: 'High',
    impact: 'Medium',
    description: 'Multiple subscriptions renew within 2-day window'
  },
  { 
    name: 'Balance Volatility',
    current: 'Medium',
    impact: 'Medium',
    description: 'Account balance fluctuations may impact recurring payment success'
  },
  { 
    name: 'Spending Pattern',
    current: 'Low',
    impact: 'Low',
    description: 'Overall spending behavior is relatively consistent'
  },
];

const getRiskBadge = (risk: string) => {
  switch (risk) {
    case 'High':
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">High</Badge>;
    case 'Medium':
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Medium</Badge>;
    case 'Low':
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Low</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const PredictionEngine: React.FC = () => {
  const [forecastPeriod, setForecastPeriod] = useState('6');
  const [confidenceLevel, setConfidenceLevel] = useState([85]);
  
  // Predicted values
  const overdraftRisk = 68;
  const predictedLeakage = 320;
  const potentialSavings = 210;

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
              <CardTitle className="text-sm font-medium text-gray-500">Overdraft Risk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end space-x-2">
                <div className="text-2xl font-light">{overdraftRisk}%</div>
                <div className="text-xs text-red-500 pb-1">+12% from last month</div>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full mt-2">
                <div 
                  className={`h-2 rounded-full ${
                    overdraftRisk > 66 ? 'bg-red-500' : overdraftRisk > 33 ? 'bg-yellow-500' : 'bg-green-500'
                  }`} 
                  style={{ width: `${overdraftRisk}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Probability of overdraft in next 30 days</p>
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
              <CardTitle className="text-sm font-medium text-gray-500">Predicted Leakage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-light">{formatCurrency(predictedLeakage)}</div>
              <p className="text-xs text-gray-500 mt-1">Estimated unwanted subscription costs</p>
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
              <CardTitle className="text-sm font-medium text-gray-500">Potential Savings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-light">{formatCurrency(potentialSavings)}</div>
              <p className="text-xs text-gray-500 mt-1">Monthly savings from optimizing subscriptions</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="h-full">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                <div>
                  <CardTitle>Subscription Forecast</CardTitle>
                  <CardDescription>
                    Time series prediction with confidence intervals
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                  <div className="space-y-1 w-[120px]">
                    <label className="text-xs text-gray-500">Forecast Period</label>
                    <Select value={forecastPeriod} onValueChange={setForecastPeriod}>
                      <SelectTrigger className="h-8">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 months</SelectItem>
                        <SelectItem value="6">6 months</SelectItem>
                        <SelectItem value="12">12 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="hidden md:block h-10 w-px bg-gray-200"></div>
                  <div className="space-y-1 w-[150px]">
                    <div className="flex justify-between">
                      <label className="text-xs text-gray-500">Confidence</label>
                      <span className="text-xs text-gray-500">{confidenceLevel}%</span>
                    </div>
                    <Slider
                      value={confidenceLevel}
                      onValueChange={setConfidenceLevel}
                      max={95}
                      min={70}
                      step={5}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <LineChartWithForecast data={forecastData} />
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
              <CardTitle>Risk Factors</CardTitle>
              <CardDescription>
                Elements influencing subscription leakage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskFactors.map((factor, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h4 className="text-sm font-medium">{factor.name}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{factor.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">Impact:</span>
                        {getRiskBadge(factor.impact)}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-xs text-gray-500 w-16">Current:</span>
                      {getRiskBadge(factor.current)}
                    </div>
                    {index < riskFactors.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PredictionEngine;
