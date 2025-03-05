import React from 'react';
import {
  AreaChart as RechartsAreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart as RechartsLineChart,
  Line,
  ReferenceLine,
} from 'recharts';
import { formatCurrency } from '@/lib/formatters';

interface AreaChartProps {
  data: Array<{
    month: string;
    amount: number;
  }>;
}

export const AreaChart: React.FC<AreaChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsAreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis 
          dataKey="month" 
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12 }}
        />
        <YAxis 
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => `$${value}`}
        />
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <Tooltip
          formatter={(value: number) => [`${formatCurrency(value)}`, 'Amount']}
          labelStyle={{ fontWeight: 'bold', color: '#111827' }}
          contentStyle={{ 
            borderRadius: '0.375rem',
            border: '1px solid #E5E7EB',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          }}
        />
        <Area 
          type="monotone" 
          dataKey="amount" 
          stroke="#3B82F6" 
          strokeWidth={2}
          fillOpacity={1} 
          fill="url(#colorAmount)" 
        />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
};

interface BarChartProps {
  data: Array<{
    category: string;
    amount: number;
  }>;
}

export const BarChart: React.FC<BarChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="category" 
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12 }}
        />
        <YAxis 
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          formatter={(value: number) => [`${formatCurrency(value)}`, 'Amount']}
          labelStyle={{ fontWeight: 'bold', color: '#111827' }}
          contentStyle={{ 
            borderRadius: '0.375rem',
            border: '1px solid #E5E7EB',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          }}
        />
        <Bar 
          dataKey="amount" 
          fill="#3B82F6" 
          radius={[4, 4, 0, 0]}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

interface ForecastData {
  date: string;
  actual: number | null;
  predicted: number | null;
  upper: number | null;
  lower: number | null;
}

interface LineChartWithForecastProps {
  data: ForecastData[];
}

export const LineChartWithForecast: React.FC<LineChartWithForecastProps> = ({ data }) => {
  const lastActualDataPoint = data.filter(d => d.actual !== null).pop();
  const cutoffDate = lastActualDataPoint ? lastActualDataPoint.date : '';
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="date" 
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12 }}
        />
        <YAxis 
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          formatter={(value: number) => [`${formatCurrency(value)}`, '']}
          labelStyle={{ fontWeight: 'bold', color: '#111827' }}
          contentStyle={{ 
            borderRadius: '0.375rem',
            border: '1px solid #E5E7EB',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          }}
        />
        <Legend verticalAlign="top" height={36} />
        
        {/* Confidence interval area */}
        <defs>
          <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <Area 
          type="monotone" 
          dataKey="upper" 
          stroke="none"
          fill="url(#splitColor)" 
          name="Confidence Interval"
        />
        <Area 
          type="monotone" 
          dataKey="lower" 
          stroke="none"
          fill="transparent" 
        />
        
        {/* Actual data line */}
        <Line 
          type="monotone" 
          dataKey="actual" 
          stroke="#111827" 
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
          name="Actual"
        />
        
        {/* Predicted data line */}
        <Line 
          type="monotone" 
          dataKey="predicted" 
          stroke="#3B82F6" 
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={{ r: 4 }}
          name="Forecast"
        />
        
        {/* Vertical line at the cutoff between actual and forecast */}
        {cutoffDate && (
          <ReferenceLine 
            x={cutoffDate} 
            stroke="#888" 
            strokeDasharray="3 3" 
            label={{ 
              value: 'Forecast Start', 
              position: 'top', 
              fill: '#888',
              fontSize: 12 
            }} 
          />
        )}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};
