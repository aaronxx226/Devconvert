import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Search, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TOOLS, Tool } from '../data/tools';
import { SEO_VARIANTS } from '../data/seo';
import { AdPlaceholder } from '../components/ToolPageLayout';

const CATEGORIES = [
  { id: 'all', name: 'All Tools' },
  { id: 'json', name: 'JSON' },
  { id: 'encoding', name: 'Encoding' },
  { id: 'text', name: 'Text' },
  { id: 'web', name: 'Web' },
  { id: 'data', name: 'Data' },
  { id: 'time', name: 'Time' },
  { id: 'debug', name: 'Debug & Inspection' },
  { id: 'ai', name: 'AI Developer Tools' },
  { id: 'image', name: 'Image' },
];

export function Home() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase()) || 
                           tool.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'all' || tool.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const featuredTools = useMemo(() => TOOLS.filter(t => t.featured && t.id !== 'explain-my-error'), []);
  const primaryTool = useMemo(() => TOOLS.find(t => t.id === 'explain-my-error'), []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Helmet>
        <title>DevConvert - Ultimate Developer Utility Belt | Free Online Tools</title>
        <meta name="description" content="Free online developer tools: JSON formatter, Base64 encoder, JWT decoder, SQL formatter, and more. Fast, secure, and 100% client-side." />
        <link rel="canonical" href="https://devconvert.com" />
      </Helmet>
      {/* Hero Section */}
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-extrabold text-zinc-900 dark:text-white mb-6 tracking-tight"
        >
          DevConvert
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10"
        >
          Free online developer converters and utilities. Fast, secure, and 100% client-side processing.
        </motion.p>

        <AdPlaceholder label="Homepage Header Ad" />

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative mb-8 mt-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
          <input 
            type="text"
            placeholder="Search for tools (e.g. JSON, Base64, JWT)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all dark:text-white text-lg"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                category === cat.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Tools */}
      {!search && category === 'all' && (
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <Star className="text-amber-500 fill-amber-500" size={24} />
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Featured Tools</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Primary Highlight */}
            {primaryTool && (
              <div className="lg:col-span-3 mb-4">
                <Link to={`/tools/${primaryTool.slug}`}>
                  <div className="relative overflow-hidden p-8 rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-2xl shadow-indigo-500/20 group">
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                      <div className="flex-1 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                          <Star size={12} className="fill-white" />
                          Primary Assistant
                        </div>
                        <h3 className="text-4xl font-black mb-4 group-hover:translate-x-2 transition-transform">{primaryTool.name}</h3>
                        <p className="text-indigo-100 text-lg mb-6 max-w-xl">
                          {primaryTool.description}
                        </p>
                        <div className="flex items-center justify-center md:justify-start gap-4">
                          <span className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors flex items-center gap-2">
                            Try Debugger <ArrowRight size={18} />
                          </span>
                        </div>
                      </div>
                      <div className="w-32 h-32 md:w-48 md:h-48 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                        <primaryTool.icon size={64} />
                      </div>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl"></div>
                  </div>
                </Link>
              </div>
            )}
            
            {featuredTools.map(tool => (
              <Link key={tool.id} to={`/tools/${tool.slug}`}>
                <ToolCard tool={tool} featured />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All Tools Grid */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
            {search ? `Search Results (${filteredTools.length})` : category === 'all' ? 'All Utilities' : `${CATEGORIES.find(c => c.id === category)?.name} Tools`}
          </h2>
          {search && (
            <button onClick={() => setSearch('')} className="text-sm text-indigo-500 font-medium hover:underline">Clear search</button>
          )}
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
          <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800">
            <p className="text-zinc-500 dark:text-zinc-400">No tools found matching your search.</p>
          </div>
        )}
      </section>

      <AdPlaceholder label="Homepage Footer Ad" />

      <section className="mt-24 py-16 border-t border-zinc-100 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8 text-center">Popular Developer Searches</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {TOOLS.slice(0, 10).map(tool => (
              <React.Fragment key={tool.id}>
                {SEO_VARIANTS.slice(0, 2).map(variant => (
                  <Link 
                    key={`${tool.id}-${variant.suffix}`}
                    to={`/${tool.slug}${variant.suffix}`}
                    className="text-sm text-zinc-500 hover:text-indigo-500 transition-colors"
                  >
                    {variant.h1Template(tool.name)}
                  </Link>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="mt-24 py-16 border-t border-zinc-100 dark:border-zinc-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">Why use DevConvert?</h2>
          <div className="prose dark:prose-invert text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-4">
            <p>
              DevConvert is a comprehensive suite of free online developer tools designed to simplify your daily workflow. 
              Whether you need to format JSON, decode a JWT, or convert timestamps, we've got you covered.
            </p>
            <p>
              <strong>Privacy First:</strong> Unlike other tool websites, all processing on DevConvert happens 100% client-side in your browser. 
              Your sensitive data like API keys, tokens, or private JSON never leaves your computer.
            </p>
            <p>
              <strong>Fast & Minimal:</strong> We focus on speed and usability. No bloated libraries, no unnecessary server round-trips. 
              Just the tools you need, exactly when you need them.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function ToolCard({ tool, featured = false }: { tool: Tool, featured?: boolean }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`h-full p-6 rounded-2xl border transition-all group flex flex-col ${
        featured 
          ? 'bg-white dark:bg-zinc-900 border-indigo-500/50 dark:border-indigo-500/30 shadow-xl shadow-indigo-500/10' 
          : 'bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 hover:border-indigo-500/50 hover:shadow-lg dark:hover:shadow-indigo-500/5'
      }`}
    >
      <div className={`p-3 rounded-xl w-fit mb-4 transition-colors ${
        featured 
          ? 'bg-indigo-500 text-white' 
          : 'bg-indigo-500/10 text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white'
      }`}>
        <tool.icon size={24} />
      </div>
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
          {tool.name}
        </h3>
        {featured && (
          <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold uppercase tracking-wider rounded-md">
            Featured
          </span>
        )}
      </div>
      <p className="text-sm mb-6 flex-grow text-zinc-500 dark:text-zinc-400">
        {tool.description}
      </p>
      <div className="flex items-center gap-2 text-sm font-bold text-indigo-500">
        Open Tool <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      </div>
    </motion.div>
  );
}
