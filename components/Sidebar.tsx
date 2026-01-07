import React, { useState } from 'react';
import { Plus, Trash2, Tag, Database, Terminal, AlertTriangle, Layers } from 'lucide-react';
import { FewShotExample } from '../types';

interface SidebarProps {
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
  examples: FewShotExample[];
  setExamples: React.Dispatch<React.SetStateAction<FewShotExample[]>>;
}

const Sidebar: React.FC<SidebarProps> = ({ categories, setCategories, examples, setExamples }) => {
  const [newCategory, setNewCategory] = useState('');
  const [newExampleText, setNewExampleText] = useState('');
  const [newExampleLabel, setNewExampleLabel] = useState('');

  const addCategory = () => {
    const trimmed = newCategory.trim();
    if (trimmed && !categories.includes(trimmed)) {
      setCategories([...categories, trimmed]);
      setNewCategory('');
    }
  };

  const removeCategory = (cat: string) => {
    setCategories(categories.filter((c) => c !== cat));
    setExamples(examples.filter(e => e.label !== cat));
  };

  const addExample = () => {
    if (newExampleText.trim() && newExampleLabel) {
      const example: FewShotExample = {
        id: crypto.randomUUID(),
        text: newExampleText.trim(),
        label: newExampleLabel,
      };
      setExamples([...examples, example]);
      setNewExampleText('');
    }
  };

  const removeExample = (id: string) => {
    setExamples(examples.filter((e) => e.id !== id));
  };

  return (
    <div className="w-full md:w-[400px] glass-panel border-r-0 md:border-r border-white/10 flex flex-col h-full overflow-hidden z-10 shadow-2xl">
      <div className="p-6 border-b border-white/10 bg-slate-900/30">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3 tracking-tight">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Layers className="w-5 h-5 text-white" />
          </div>
          PolyClassify
        </h1>
        <p className="text-xs text-slate-400 mt-2 font-mono uppercase tracking-widest pl-11 opacity-70">
          v2.0 // Neural Workbench
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        
        {/* Categories Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-4 h-4 text-cyan-400" />
            <h2 className="text-xs font-bold text-cyan-200 uppercase tracking-widest font-mono">Classification Labels</h2>
          </div>
          
          <div className="flex gap-2 mb-4 group focus-within:ring-2 focus-within:ring-cyan-500/50 rounded-lg transition-all">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCategory()}
              placeholder="ADD LABEL (e.g. URGENT)"
              className="flex-1 px-4 py-2.5 text-sm glass-input rounded-l-lg placeholder:text-slate-500 font-mono"
            />
            <button
              onClick={addCategory}
              disabled={!newCategory.trim()}
              className="px-4 bg-cyan-600/80 text-white rounded-r-lg hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium border-t border-r border-b border-white/10"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.length === 0 && (
              <p className="text-xs text-slate-500 italic font-mono border border-dashed border-slate-700 p-2 rounded w-full text-center">
                // No labels defined
              </p>
            )}
            {categories.map((cat) => (
              <div key={cat} className="group flex items-center gap-2 pl-3 pr-2 py-1.5 bg-slate-800/60 text-slate-200 text-xs font-mono rounded border border-slate-700/50 hover:border-cyan-500/50 transition-all">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]"></span>
                {cat}
                <button onClick={() => removeCategory(cat)} className="ml-1 text-slate-500 hover:text-red-400 transition-colors">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Few-Shot Examples Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-4 h-4 text-purple-400" />
            <h2 className="text-xs font-bold text-purple-200 uppercase tracking-widest font-mono">Training Data (Few-Shot)</h2>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/40 border border-white/5 space-y-3 mb-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-purple-500/50"></div>
            <textarea
              value={newExampleText}
              onChange={(e) => setNewExampleText(e.target.value)}
              placeholder="> Input example text..."
              className="w-full px-3 py-2 text-sm bg-slate-900/50 border border-slate-700/50 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 resize-none h-24 text-slate-200 font-mono placeholder:text-slate-600"
            />
            <div className="flex gap-2">
              <select
                value={newExampleLabel}
                onChange={(e) => setNewExampleLabel(e.target.value)}
                className="flex-1 px-3 py-2 text-sm bg-slate-900/50 border border-slate-700/50 rounded-lg focus:outline-none focus:border-purple-500 text-slate-300 font-mono appearance-none"
              >
                <option value="">SELECT_TARGET</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <button
                onClick={addExample}
                disabled={!newExampleText.trim() || !newExampleLabel}
                className="px-4 py-2 bg-purple-600/80 text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-900/20"
              >
                Ingest
              </button>
            </div>
            {categories.length === 0 && (
              <div className="flex items-start gap-2 text-amber-500 text-xs mt-2 font-mono bg-amber-500/10 p-2 rounded">
                <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5" />
                <p>MISSING_LABELS: Define above.</p>
              </div>
            )}
          </div>

          <div className="space-y-3">
            {examples.length === 0 && (
               <div className="text-xs text-slate-500 italic font-mono border border-dashed border-slate-700 p-4 rounded text-center">
               // No training vectors loaded
             </div>
            )}
            {examples.map((ex, idx) => (
              <div key={ex.id} className="group relative p-3 bg-slate-900/40 border border-slate-700/50 rounded-lg hover:border-purple-500/30 transition-all">
                <div className="flex justify-between items-start mb-2">
                   <div className="text-[10px] font-mono text-slate-500 uppercase">Vector #{idx + 1}</div>
                   <button onClick={() => removeExample(ex.id)} className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-opacity">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
                <div className="flex items-start gap-3">
                  <Terminal className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-300 line-clamp-3 font-mono leading-relaxed opacity-90">
                    "{ex.text}"
                  </p>
                </div>
                <div className="mt-3 flex justify-end">
                  <span className="inline-block px-2 py-0.5 bg-purple-500/10 text-purple-300 text-[10px] font-mono border border-purple-500/20 rounded uppercase tracking-wider">
                    {ex.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      
      <div className="p-4 border-t border-white/5 bg-slate-900/50 text-[10px] text-slate-500 font-mono text-center uppercase tracking-widest">
        System Status: Online
      </div>
    </div>
  );
};

export default Sidebar;