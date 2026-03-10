import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Search, ArrowRight, Star, Bookmark, Zap, Shield, LayoutGrid, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TOOLS, Tool } from '../data/tools';
import { SEO_VARIANTS } from '../data/seo';

const CATEGORIES = [
  { id: 'all', name: 'All Tools' },
  { id: 'json', name: 'JSON' },
  { id: 'encoding', name: 'Encoding' },
  { id: 'text', name: 'Text' },
  { id: 'web', name: 'Web' },
  { id: 'data', name: 'Data' },
  { id: 'time', name: 'Time' },
  { id: 'debug', name: 'Debug' },
  { id: 'ai', name: 'AI Tools' },
];

export function Home() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [showBookmarkToast, setShowBookmarkToast] = useState(false);

  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase()) || 
                           tool.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'all' || tool.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const popularTools = useMemo(() => TOOLS.filter(t => t.featured).slice(0, 6), []);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>DevConvert - All Developer Converters in One Place</title>
        <meta name="description" content="Fast, privacy-friendly developer tools. JSON formatter, Base64 encoder, JWT decoder, and more. 100% client-side processing." />
        <link rel="canonical" href="https://devconvert.online" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[500px] bg-brand-500/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider mb-6 border border-brand-100 dark:border-brand-800">
              <Zap size={14} />
              Fast & Privacy-First
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight leading-[1.1]">
              All Developer Converters <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-violet-600">in One Place</span>
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              DevConvert provides fast, privacy-friendly developer tools. 
              All processing happens 100% in your browser—your data never leaves your machine.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <button 
                onClick={() => document.getElementById('tools-grid')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                Explore Tools <ArrowRight size={18} />
              </button>
              <button 
                onClick={() => {
                  setShowBookmarkToast(true);
                  setTimeout(() => setShowBookmarkToast(false), 3000);
                }}
                className="btn-secondary flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <Bookmark size={18} /> Bookmark DevConvert
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-zinc-400 dark:text-zinc-500 text-sm font-medium">
              <div className="flex items-center gap-2">
                <Shield size={18} className="text-emerald-500" />
                100% Client-Side
              </div>
              <div className="flex items-center gap-2">
                <Zap size={18} className="text-amber-500" />
                Instant Processing
              </div>
              <div className="flex items-center gap-2">
                <LayoutGrid size={18} className="text-brand-500" />
                50+ Utilities
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Popular Tools Section */}
      <section className="py-20 bg-zinc-50/50 dark:bg-zinc-900/20 border-y border-zinc-100 dark:border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-2 rounded-lg bg-brand-500/10 text-brand-500">
              <TrendingUp size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Popular Tools</h2>
              <p className="text-sm text-zinc-500">Most used utilities by developers</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTools.map(tool => (
              <Link key={tool.id} to={`/tools/${tool.slug}`}>
                <ToolCard tool={tool} compact />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Tools Grid Section */}
      <section id="tools-grid" className="py-24 max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">Explore All Utilities</h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Search through our collection of developer tools. From JSON formatting to JWT decoding, we have everything you need.
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-96 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input 
              type="text"
              placeholder="Search tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all dark:text-white"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                category === cat.id 
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/20' 
                  : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-brand-500/50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map(tool => (
              <Link key={tool.id} to={`/tools/${tool.slug}`}>
                <ToolCard tool={tool} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 saas-card border-dashed">
            <p className="text-zinc-500 dark:text-zinc-400">No tools found matching your search.</p>
          </div>
        )}
      </section>

      {/* SEO Content Section */}
      <section className="py-24 border-t border-zinc-100 dark:border-zinc-800/50 bg-zinc-50/30 dark:bg-zinc-900/10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">Built for Modern Developers</h2>
            <p className="text-zinc-500 dark:text-zinc-400">Why thousands of developers trust DevConvert every day.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield size={24} />
              </div>
              <h3 className="font-bold text-zinc-900 dark:text-white mb-3">Privacy First</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Your data never leaves your browser. All processing is done locally, ensuring maximum security for sensitive information.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-500/10 text-brand-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap size={24} />
              </div>
              <h3 className="font-bold text-zinc-900 dark:text-white mb-3">Lightning Fast</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                No server round-trips or bloated libraries. DevConvert is optimized for speed, providing instant results for all converters.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-violet-500/10 text-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <LayoutGrid size={24} />
              </div>
              <h3 className="font-bold text-zinc-900 dark:text-white mb-3">All-in-One</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Stop searching for individual tools. DevConvert brings all essential developer utilities into a single, cohesive interface.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Footer Links */}
      <section className="py-16 border-t border-zinc-100 dark:border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-8 text-center">Popular Resources</h2>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {TOOLS.slice(0, 12).map(tool => (
              <React.Fragment key={tool.id}>
                {SEO_VARIANTS.slice(0, 1).map(variant => (
                  <Link 
                    key={`${tool.id}-${variant.suffix}`}
                    to={`/${tool.slug}${variant.suffix}`}
                    className="text-xs text-zinc-500 hover:text-brand-500 transition-colors"
                  >
                    {variant.h1Template(tool.name)}
                  </Link>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
      {/* Bookmark Toast */}
      {showBookmarkToast && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl shadow-2xl font-bold flex items-center gap-3 border border-white/10 dark:border-black/10"
        >
          <Bookmark size={18} className="text-brand-500" />
          Press {navigator.userAgent.indexOf('Mac') !== -1 ? 'Cmd' : 'Ctrl'} + D to bookmark this page
        </motion.div>
      )}
    </div>
  );
}

function ToolCard({ tool, compact = false }: { tool: Tool, compact?: boolean }) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className={`saas-card p-6 flex flex-col h-full group ${compact ? 'flex-row items-center gap-4' : ''}`}
    >
      <div className={`p-3 rounded-xl w-fit transition-colors bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 group-hover:bg-brand-500 group-hover:text-white ${compact ? 'mb-0' : 'mb-5'}`}>
        <tool.icon size={compact ? 20 : 24} />
      </div>
      
      <div className="flex-grow">
        <h3 className={`font-bold text-zinc-900 dark:text-white group-hover:text-brand-500 transition-colors ${compact ? 'text-base' : 'text-lg mb-2'}`}>
          {tool.name}
        </h3>
        {!compact && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-6">
            {tool.description}
          </p>
        )}
      </div>

      {!compact && (
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xs font-bold text-brand-500 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Open Tool <ArrowRight size={14} />
          </span>
          <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-md">
            {tool.category}
          </div>
        </div>
      )}
    </motion.div>
  );
}
