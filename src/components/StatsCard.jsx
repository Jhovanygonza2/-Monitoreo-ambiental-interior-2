import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, icon, trend }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass p-6 flex flex-col justify-between"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-white/5 rounded-xl border border-white/5">
          {icon}
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
          trend.includes('+') ? 'bg-green-500/10 text-green-400' : 'bg-blue-500/10 text-blue-400'
        }`}>
          {trend}
        </span>
      </div>
      <div>
        <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-outfit font-bold">{value}</h3>
      </div>
    </motion.div>
  );
};

export default StatsCard;
