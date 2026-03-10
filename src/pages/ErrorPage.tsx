import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, AlertCircle, CheckCircle2, Lightbulb, Code, Share2, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ERRORS } from '../data/errors';

export function ErrorPage() {
  const { slug } = useParams<{ slug: string }>();
  const error = ERRORS.find(e => e.slug === slug);

  if (!error) {
    return <Navigate to="/errors" replace />;
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-32 pb-24 px-4">
      <Helmet>
        <title>{error.title} - How to Fix & Common Causes | DevConvert</title>
        <meta name="description" content={error.description} />
      </Helmet>
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/errors" 
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-brand-500 font-bold mb-10 transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Error Library
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="saas-card overflow-hidden"
        >
          <div className="p-8 md:p-16 border-b border-zinc-100 dark:border-zinc-800/50">
            <div className="flex items-center gap-3 mb-8">
              <span className="px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-[10px] font-black uppercase tracking-widest border border-zinc-200 dark:border-zinc-700">
                {error.language} Error
              </span>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <span className="text-zinc-400 text-xs font-mono">ID: {error.id}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-8 tracking-tight leading-tight">
              {error.title}
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {error.description}
            </p>
          </div>

          <div className="p-8 md:p-16 space-y-16">
            {/* Causes */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-rose-500/10 text-rose-500 rounded-xl shadow-sm">
                  <AlertCircle size={24} />
                </div>
                <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">Common Causes</h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {error.causes.map((cause, i) => (
                  <div key={i} className="flex gap-4 p-5 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800/50 text-zinc-600 dark:text-zinc-400">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center text-xs font-black text-brand-500 shadow-sm border border-zinc-100 dark:border-zinc-700">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed font-medium">{cause}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Solutions */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl shadow-sm">
                  <CheckCircle2 size={24} />
                </div>
                <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">How to Fix It</h2>
              </div>
              <div className="space-y-8">
                {error.solutions.map((solution, i) => (
                  <div key={i} className="p-8 bg-zinc-50 dark:bg-zinc-950 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-inner">
                    <p className="text-zinc-900 dark:text-white font-bold text-lg mb-6 leading-relaxed">{solution}</p>
                    {error.codeExamples[i] && (
                      <div className="relative group">
                        <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                          <button 
                            onClick={() => navigator.clipboard.writeText(error.codeExamples[i])}
                            className="p-2.5 bg-white dark:bg-zinc-800 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:text-brand-500 transition-all active:scale-95"
                            title="Copy Code"
                          >
                            <Share2 size={16} />
                          </button>
                        </div>
                        <pre className="p-6 bg-zinc-900 dark:bg-black rounded-2xl overflow-x-auto text-sm font-mono text-zinc-300 shadow-2xl">
                          <code>{error.codeExamples[i]}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Pro Tip */}
            <div className="p-10 bg-brand-500/5 dark:bg-brand-500/10 rounded-[2rem] border border-brand-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Lightbulb size={120} className="text-brand-500" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-brand-500 text-white rounded-lg">
                    <Lightbulb size={20} />
                  </div>
                  <h3 className="text-xl font-black text-brand-600 dark:text-brand-400 tracking-tight">Pro Tip</h3>
                </div>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 italic leading-relaxed">
                  Always use debugging tools to inspect the state of your application when this error occurs. 
                  You can use our <Link to="/tools/explain-my-error" className="text-brand-600 dark:text-brand-400 font-black hover:underline underline-offset-4">AI Error Explainer</Link> for personalized help.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Related Resources */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-10 saas-card">
            <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-8 tracking-tight">Related Errors</h3>
            <div className="space-y-4">
              {error.relatedErrors.map(id => {
                const related = ERRORS.find(e => e.id === id);
                if (!related) return null;
                return (
                  <Link 
                    key={id} 
                    to={`/errors/${related.slug}`}
                    className="flex items-center justify-between p-4 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all group border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
                  >
                    <span className="font-bold text-zinc-600 dark:text-zinc-400 group-hover:text-brand-500 transition-colors">{related.title}</span>
                    <ArrowLeft size={18} className="rotate-180 text-zinc-400 group-hover:text-brand-500 transition-colors" />
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="p-10 bg-brand-600 rounded-[2.5rem] shadow-2xl shadow-brand-500/30 text-white flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-4 tracking-tight">Still Stuck?</h3>
              <p className="text-brand-100 text-lg mb-8 leading-relaxed">Our AI can analyze your specific error and provide a custom solution in seconds.</p>
            </div>
            <Link 
              to="/tools/explain-my-error" 
              className="relative z-10 w-full py-4 bg-white text-brand-600 rounded-2xl font-black text-center hover:bg-brand-50 transition-all flex items-center justify-center gap-2 shadow-xl active:scale-95"
            >
              Explain My Error <ArrowLeft size={20} className="rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
