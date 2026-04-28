import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { time: '00:00', availability: 85 },
  { time: '04:00', availability: 92 },
  { time: '08:00', availability: 45 },
  { time: '12:00', availability: 60 },
  { time: '16:00', availability: 38 },
  { time: '20:00', availability: 72 },
  { time: '23:59', availability: 88 },
];

const AvailabilityChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorAvail" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
        <XAxis 
          dataKey="time" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#64748b', fontSize: 12 }} 
        />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#64748b', fontSize: 12 }} 
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1c1f2b', 
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            color: '#f8fafc'
          }} 
        />
        <Area 
          type="monotone" 
          dataKey="availability" 
          stroke="#3b82f6" 
          strokeWidth={3}
          fillOpacity={1} 
          fill="url(#colorAvail)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export const ComparisonChart = () => {
  const compData = [
    { name: 'Mon', bikes: 45, parking: 60 },
    { name: 'Tue', bikes: 52, parking: 55 },
    { name: 'Wed', bikes: 38, parking: 70 },
    { name: 'Thu', bikes: 65, parking: 40 },
    { name: 'Fri', bikes: 48, parking: 65 },
    { name: 'Sat', bikes: 70, parking: 30 },
    { name: 'Sun', bikes: 80, parking: 25 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={compData}
        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
        <XAxis 
          dataKey="name" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#64748b', fontSize: 12 }} 
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1c1f2b', 
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px'
          }} 
        />
        <Area type="monotone" dataKey="bikes" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
        <Area type="monotone" dataKey="parking" stroke="#6366f1" fill="#6366f1" fillOpacity={0.1} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AvailabilityChart;

