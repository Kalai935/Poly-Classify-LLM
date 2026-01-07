import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Results from './components/Results';
import HelpModal from './components/HelpModal';
import { FewShotExample, ClassificationState } from './types';
import { classifyText } from './services/geminiService';
import { Sparkles, ArrowRight, Loader2, Zap, Command, Info } from 'lucide-react';

const App: React.FC = () => {
  // Config State
  const [categories, setCategories] = useState<string[]>(['Positive', 'Negative', 'Neutral']);
  const [examples, setExamples] = useState<FewShotExample[]>([
    { id: '1', text: 'This product is amazing!', label: 'Positive' },
    { id: '2', text: 'No me gusta nada esto.', label: 'Negative' },
    { id: '3', text: 'La livraison est arrivée à 14h.', label: 'Neutral' }
  ]);

  // Input State
  const [inputText, setInputText] = useState('');
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  
  // Execution State
  const [classificationState, setClassificationState] = useState<ClassificationState>({
    isLoading: false,
    result: null,
    error: null,
  });

  const handleClassify = async () => {
    if (!inputText.trim()) return;
    if (categories.length === 0) {
      setClassificationState(prev => ({ ...prev, error: "System Error: No classification labels defined." }));
      return;
    }

    setClassificationState({ isLoading: true, result: null, error: null });

    try {
      const result = await classifyText(inputText, categories, examples);
      setClassificationState({ isLoading: false, result, error: null });
    } catch (err: any) {
      setClassificationState({ 
        isLoading: false, 
        result: null, 
        error: err.message || "Computation failed." 
      });
    }
  };

  return (
    <div className="flex h-screen w-screen relative overflow-hidden text-slate-200">
      
      {/* Background Ambience */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0 pointer-events-none"></div>

      {/* Help Modal */}
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />

      {/* Left Sidebar - Configuration */}
      <Sidebar 
        categories={categories}
        setCategories={setCategories}
        examples={examples}
        setExamples={setExamples}
      />

      {/* Main Content - Classification Area */}
      <main className="flex-1 h-full overflow-y-auto relative z-10 custom-scrollbar">
        <div className="max-w-5xl mx-auto p-6 md:p-12">
          
          <header className="mb-10 flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-light text-white mb-2 tracking-tight">
                <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-white">
                  Cross-Lingual
                </span> Classifier
              </h1>
              <p className="text-slate-400 text-sm max-w-lg leading-relaxed">
                Provide text in any language. The system utilizes your defined few-shot vectors to perform high-dimensional semantic categorization.
              </p>
            </div>
            
            <div className="flex flex-col items-end gap-2">
               <button 
                onClick={() => setIsHelpOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-mono text-indigo-300 transition-all hover:scale-105"
              >
                <Info className="w-4 h-4" />
                HOW IT WORKS
              </button>
              <div className="hidden md:flex gap-3 text-xs font-mono text-slate-500 opacity-70 mt-2">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> API Connected</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-500"></span> GPU Ready</span>
              </div>
            </div>
          </header>

          <div className="space-y-8">
            
            {/* Input Section */}
            <section className="glass-panel rounded-2xl p-1 focus-within:ring-2 focus-within:ring-indigo-500/50 transition-all shadow-2xl relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-20 group-focus-within:opacity-50 blur transition duration-500"></div>
              <div className="relative bg-slate-900/80 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                   <div className="flex gap-1.5">
                     <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
                     <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20"></div>
                     <div className="w-2.5 h-2.5 rounded-full bg-green-500/20"></div>
                   </div>
                   <span className="text-[10px] uppercase font-mono text-slate-500">Input Stream</span>
                </div>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="// Paste or type text here (English, Spanish, French, German, etc.)..."
                  className="w-full h-48 p-6 text-lg bg-transparent text-slate-200 placeholder:text-slate-600 resize-none outline-none border-none font-mono leading-relaxed"
                />
                <div className="bg-slate-900/50 px-4 py-3 border-t border-white/5 flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-mono">
                    {inputText.length} chars
                  </span>
                  <button
                    onClick={handleClassify}
                    disabled={classificationState.isLoading || !inputText.trim() || categories.length === 0}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] border border-indigo-400/20"
                  >
                    {classificationState.isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="animate-pulse">PROCESSING...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 fill-current" />
                        RUN CLASSIFICATION
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </section>

            {/* Error Message */}
            {classificationState.error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-sm font-mono flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                Error: {classificationState.error}
              </div>
            )}

            {/* Results Section */}
            {classificationState.result && (
              <Results result={classificationState.result} />
            )}

            {/* Empty State / Prompt Preview Hint */}
            {!classificationState.result && !classificationState.isLoading && !classificationState.error && (
              <div className="border border-dashed border-slate-700 rounded-2xl p-10 text-center bg-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-800/50 mb-4 border border-white/10 shadow-inner">
                  <Command className="w-8 h-8 text-slate-500" />
                </div>
                <h3 className="text-white font-medium mb-2 text-lg">System Idle</h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto font-mono mb-6">
                  Awaiting input. The model is primed with {categories.length} categories and {examples.length} reference vectors.
                </p>
                <button 
                  onClick={() => setIsHelpOpen(true)}
                  className="text-indigo-400 text-xs font-mono hover:text-indigo-300 underline underline-offset-4"
                >
                  Need help understanding how this works?
                </button>
                
                <div className="mt-8 flex justify-center gap-4 opacity-30">
                   <div className="h-1 w-12 bg-slate-600 rounded-full"></div>
                   <div className="h-1 w-12 bg-slate-600 rounded-full"></div>
                   <div className="h-1 w-12 bg-slate-600 rounded-full"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;