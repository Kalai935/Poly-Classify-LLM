import React from 'react';
import { X, Tag, Database, Zap, BrainCircuit } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500"></div>
        
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <BrainCircuit className="w-6 h-6 text-indigo-400" />
                How This Works
              </h2>
              <p className="text-slate-400 text-sm mt-1">The concept of Few-Shot Classification explained.</p>
            </div>
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold">
                1
              </div>
              <div>
                <h3 className="text-white font-medium text-lg flex items-center gap-2">
                  <Tag className="w-4 h-4 text-cyan-400" />
                  Define Categories (Buckets)
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mt-1">
                  First, tell the AI what "buckets" exist. For example, if you want to sort emails, your buckets might be 
                  <span className="text-cyan-200 bg-cyan-900/30 px-1 mx-1 rounded text-xs border border-cyan-500/20">SPAM</span>, 
                  <span className="text-cyan-200 bg-cyan-900/30 px-1 mx-1 rounded text-xs border border-cyan-500/20">WORK</span>, and 
                  <span className="text-cyan-200 bg-cyan-900/30 px-1 mx-1 rounded text-xs border border-cyan-500/20">FAMILY</span>.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold">
                2
              </div>
              <div>
                <h3 className="text-white font-medium text-lg flex items-center gap-2">
                  <Database className="w-4 h-4 text-purple-400" />
                  Teach by Example (Few-Shot)
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mt-1">
                  The AI doesn't know your rules yet. You must teach it by giving it a few examples (shots). 
                  <br/>
                  <span className="italic text-slate-500 block mt-2 pl-2 border-l-2 border-slate-700">
                    "Win a free iPhone!" &rarr; <strong>SPAM</strong><br/>
                    "Meeting at 2 PM" &rarr; <strong>WORK</strong>
                  </span>
                  <span className="block mt-2">
                    This is called <strong>Few-Shot Prompting</strong>. It learns the pattern from just these few examples.
                  </span>
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold">
                3
              </div>
              <div>
                <h3 className="text-white font-medium text-lg flex items-center gap-2">
                  <Zap className="w-4 h-4 text-indigo-400" />
                  The AI Guesses New Inputs
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mt-1">
                  Now, when you type new text (in any language), the AI looks at your examples and says: 
                  "Ah, this new text looks similar to the Work example, so I classify it as Work."
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
            <button 
              onClick={onClose}
              className="px-6 py-2 bg-white text-slate-900 hover:bg-slate-200 font-medium rounded-lg transition-colors text-sm"
            >
              Got it, let's try
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;