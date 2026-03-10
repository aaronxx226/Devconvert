import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, BookOpen, ArrowRight, AlertCircle } from 'lucide-react';
import { ERRORS } from '../data/errors';

export function ErrorLibrary() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredErrors = ERRORS.filter(error => 
    error.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    error.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    error.language.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-32 pb-24 px-4">
      <Helmet>
        <title>Common Developer Errors & Solutions | DevConvert Knowledge Base</title>
        <meta name="description" content="Browse our library of common programming errors, stack traces, and bugs. Find clear explanations and proven solutions for JavaScript, Python, SQL, and more." />
      </Helmet>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-[10px] font-black uppercase tracking-widest mb-6 border border-brand-500/20"
          >
            <BookOpen size={14} />
            <span>Developer Knowledge Base</span>
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight">
            Common Developer Errors
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            A comprehensive library of common programming errors, their causes, and how to fix them.
          </p>
        </div>

        <div className="relative max-w-2xl mx-auto mb-20">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
          <input 
            type="text"
            placeholder="Search for an error (e.g. 'NullPointerException', 'CORS')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-6 py-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:border-brand-500 outline-none shadow-xl shadow-black/5 dark:text-white transition-all text-lg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredErrors.map((error, index) => (
            <motion.div
              key={error.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link 
                to={`/errors/${error.slug}`}
                className="group block p-8 h-full saas-card hover:border-brand-500/50 transition-all"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-zinc-600 dark:text-zinc-400 group-hover:bg-brand-500 group-hover:text-white transition-all shadow-sm">
                    <AlertCircle size={24} />
                  </div>
                  <span className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 text-[10px] font-bold uppercase tracking-widest rounded-md border border-zinc-200 dark:border-zinc-700">
                    {error.language}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-3 group-hover:text-brand-500 transition-colors tracking-tight">
                  {error.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 line-clamp-3 mb-6 leading-relaxed">
                  {error.description}
                </p>
                <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-bold text-sm">
                  <span>View Solution</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredErrors.length === 0 && (
          <div className="text-center py-32">
            <p className="text-zinc-500 text-lg mb-6">No errors found matching your search.</p>
            <Link to="/tools/explain-my-error" className="btn-primary inline-flex items-center gap-2">
              Try AI Error Explainer <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
