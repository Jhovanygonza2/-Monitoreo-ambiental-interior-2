import React from 'react';
import { motion } from 'framer-motion';
import { Code2, CheckCircle2 } from 'lucide-react';

const frameworks = [
  {
    name: "Ruby on Rails",
    language: "Ruby",
    description: "Muy bueno para consumir APIs REST y crear dashboards de movilidad.",
    color: "from-red-500 to-rose-600"
  },
  {
    name: "Django",
    language: "Python",
    description: "Perfecto para procesar datos JSON y crear sistemas administrativos.",
    color: "from-emerald-600 to-green-700"
  },
  {
    name: "Spring MVC",
    language: "Java",
    description: "Ideal para apps empresariales con datos de transporte.",
    color: "from-green-500 to-emerald-500"
  },
  {
    name: "ASP.NET MVC",
    language: "C#",
    description: "Muy usado en sistemas gubernamentales (similar a movilidad urbana).",
    color: "from-blue-600 to-indigo-700"
  },
  {
    name: "CodeIgniter",
    language: "PHP",
    description: "Ligero y fácil para proyectos simples con esta API.",
    color: "from-orange-500 to-red-600"
  }
];

const FrameworksList = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-blue-600/20 rounded-lg">
          <Code2 size={24} className="text-blue-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold font-outfit">Recommended Frameworks</h2>
          <p className="text-slate-400 text-sm">Alternative stacks for mobility solutions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {frameworks.map((fw, index) => (
          <motion.div
            key={fw.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass p-6 group hover:border-white/20 transition-all cursor-default"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2 w-full">
                <div className="flex items-center justify-between mb-1">
                  <div className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gradient-to-r ${fw.color} text-white shadow-lg`}>
                    {fw.name}
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded">
                    {fw.language}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-blue-400 mt-1 shrink-0" />
                  <p className="text-slate-300 leading-relaxed font-medium">
                    {fw.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FrameworksList;
