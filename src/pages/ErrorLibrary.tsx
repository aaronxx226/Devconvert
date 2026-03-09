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
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-24 pb-12 px-4">
      <Helmet>
        <title>Common Developer Errors & Solutions | DevConvert Knowledge Base</title>
        <meta name="description" content="Browse our library of common programming errors, stack traces, and bugs. Find clear explanations and proven solutions for JavaScript, Python, SQL, and more." />
      </Helmet>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 text-sm font-bold mb-4"
          >
            <BookOpen size={16} />
            <span>Developer Knowledge Base</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight">
            Common Developer Errors
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            A comprehensive library of common programming errors, their causes, and how to fix them.
          </p>
        </div>

        <div className="relative max-w-2xl mx-auto mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
          <input 
            type="text"
            placeholder="Search for an error (e.g. 'NullPointerException', 'CORS')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:border-indigo-500 outline-none shadow-sm dark:text-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredErrors.map((error, index) => (
            <motion.div
              key={error.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link 
                to={`/errors/${error.slug}`}
                className="group block p-6 h-full bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500 transition-all shadow-sm hover:shadow-md"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                    <AlertCircle size={20} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">{error.language}</span>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-indigo-500 transition-colors">
                  {error.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-4">
                  {error.description}
                </p>
                <div className="flex items-center gap-2 text-indigo-500 font-bold text-sm">
                  <span>View Solution</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredErrors.length === 0 && (
          <div className="text-center py-24">
            <p className="text-zinc-500">No errors found matching your search.</p>
            <Link to="/tools/explain-my-error" className="mt-4 inline-flex items-center gap-2 text-indigo-500 font-bold hover:underline">
              Try AI Error Explainer <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
