import React from 'react';
import { ClassificationResult } from '../types';
import { Check, Globe, Activity, Cpu } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ResultsProps {
  result: ClassificationResult;
}

const Results: React.FC<ResultsProps> = ({ result }) => {
  const confidencePercent = Math.round(result.confidence * 100);
  
  // Data for the chart
  const data = [
    { name: 'Confidence', value: confidencePercent },
    { name: 'Uncertainty', value: 100 - confidencePercent },
  ];
  
  // Neon colors
  const COLORS = ['#8b5cf6', '#1e293b'];

  return (
    <div className="glass-panel rounded-2xl overflow-hidden animate-fade-in-up border border-indigo-500/30 shadow-[0_0_30px_rgba(79,70,229,0.15)] relative">
      
      {/* Decorative top glowing line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-70"></div>

      <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
        <div>
           <div className="text-[10px] font-mono text-indigo-300 uppercase tracking-widest mb-1">Inference Complete</div>
           <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 border border-green-500/50 text-green-400">
              <Check className="w-3.5 h-3.5" />
            </span>
            Prediction Result
          </h3>
        </div>
        
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-slate-400 font-mono uppercase mb-1">Classified As</span>
          <span className="px-4 py-1.5 bg-indigo-600 text-white text-sm font-bold font-mono rounded shadow-[0_0_15px_rgba(79,70,229,0.4)] border border-indigo-400/30">
            {result.label}
          </span>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Metric 1: Language */}
        <div className="bg-slate-900/40 rounded-xl p-4 border border-white/5 relative group hover:border-indigo-500/30 transition-colors">
          <div className="absolute top-2 right-2 opacity-20 group-hover:opacity-100 transition-opacity">
            <Globe className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2">Detected Locale</div>
          <div className="text-2xl font-light text-white tracking-wide">
            {result.detectedLanguage}
          </div>
        </div>

        {/* Metric 2: Confidence */}
        <div className="bg-slate-900/40 rounded-xl p-4 border border-white/5 relative flex items-center gap-4 group hover:border-indigo-500/30 transition-colors">
           <div className="h-16 w-16 relative shrink-0">
             <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={18}
                  outerRadius={28}
                  startAngle={90}
                  endAngle={-270}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                  cornerRadius={4}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-indigo-300 font-mono">
                {confidencePercent}%
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">Model Confidence</div>
            <div className="flex items-center gap-1.5">
               <Activity className="w-3 h-3 text-indigo-400" />
               <span className="text-sm text-slate-200">{confidencePercent > 80 ? 'High' : confidencePercent > 50 ? 'Medium' : 'Low'} Certainty</span>
            </div>
          </div>
        </div>

        {/* Metric 3: Processing Metadata (Mock) */}
         <div className="bg-slate-900/40 rounded-xl p-4 border border-white/5 relative group hover:border-indigo-500/30 transition-colors">
          <div className="absolute top-2 right-2 opacity-20 group-hover:opacity-100 transition-opacity">
            <Cpu className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2">Model Architecture</div>
          <div className="text-sm font-mono text-purple-200">
            Gemini-3-Flash
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
             Latent Space Analysis
          </div>
        </div>

        {/* Reasoning */}
        <div className="md:col-span-3 bg-slate-800/20 p-5 rounded-xl border border-white/10">
          <h4 className="text-xs font-bold text-slate-300 mb-3 uppercase tracking-wider font-mono flex items-center gap-2">
            <span className="w-1 h-4 bg-indigo-500 rounded-full"></span>
            Chain of Thought
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed font-mono opacity-90">
            {result.reasoning}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Results;