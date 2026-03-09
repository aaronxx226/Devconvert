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
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-24 pb-12 px-4">
      <Helmet>
        <title>{error.title} - How to Fix & Common Causes | DevConvert</title>
        <meta name="description" content={error.description} />
      </Helmet>
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/errors" 
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-indigo-500 font-medium mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Error Library
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden"
        >
          <div className="p-8 md:p-12 border-b border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-bold uppercase tracking-widest">
                {error.language} Error
              </span>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <span className="text-zinc-500 text-sm">Knowledge Base ID: {error.id}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
              {error.title}
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {error.description}
            </p>
          </div>

          <div className="p-8 md:p-12 space-y-12">
            {/* Causes */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-rose-500/10 text-rose-500 rounded-lg">
                  <AlertCircle size={20} />
                </div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Common Causes</h2>
              </div>
              <ul className="space-y-4">
                {error.causes.map((cause, i) => (
                  <li key={i} className="flex gap-4 text-zinc-600 dark:text-zinc-400">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400">
                      {i + 1}
                    </span>
                    {cause}
                  </li>
                ))}
              </ul>
            </section>

            {/* Solutions */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">
                  <CheckCircle2 size={20} />
                </div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">How to Fix It</h2>
              </div>
              <div className="space-y-6">
                {error.solutions.map((solution, i) => (
                  <div key={i} className="p-6 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                    <p className="text-zinc-900 dark:text-white font-medium mb-4">{solution}</p>
                    {error.codeExamples[i] && (
                      <div className="relative group">
                        <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => navigator.clipboard.writeText(error.codeExamples[i])}
                            className="p-2 bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:text-indigo-500"
                          >
                            <Share2 size={14} />
                          </button>
                        </div>
                        <pre className="p-4 bg-zinc-900 dark:bg-black rounded-xl overflow-x-auto text-sm font-mono text-zinc-300">
                          <code>{error.codeExamples[i]}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Pro Tip */}
            <div className="p-8 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-3xl border border-indigo-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="text-indigo-500" size={24} />
                <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400">Pro Tip</h3>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 italic">
                Always use debugging tools to inspect the state of your application when this error occurs. 
                You can use our <Link to="/tools/explain-my-error" className="text-indigo-500 font-bold hover:underline">AI Error Explainer</Link> for personalized help.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Related Resources */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Related Errors</h3>
            <div className="space-y-3">
              {error.relatedErrors.map(id => {
                const related = ERRORS.find(e => e.id === id);
                if (!related) return null;
                return (
                  <Link 
                    key={id} 
                    to={`/errors/${related.slug}`}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors group"
                  >
                    <span className="text-zinc-600 dark:text-zinc-400 group-hover:text-indigo-500">{related.title}</span>
                    <ArrowLeft size={14} className="rotate-180 text-zinc-400" />
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="p-8 bg-indigo-600 rounded-3xl shadow-lg shadow-indigo-500/20 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Still Stuck?</h3>
              <p className="text-indigo-100 text-sm mb-6">Our AI can analyze your specific error and provide a custom solution in seconds.</p>
            </div>
            <Link 
              to="/tools/explain-my-error" 
              className="w-full py-3 bg-white text-indigo-600 rounded-xl font-bold text-center hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
            >
              Explain My Error <ArrowLeft size={16} className="rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
