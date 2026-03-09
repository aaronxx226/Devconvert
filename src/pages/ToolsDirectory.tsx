import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { TOOLS } from '../data/tools';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const CATEGORIES = [
  { id: 'json', name: 'JSON Tools' },
  { id: 'encoding', name: 'Encoding Tools' },
  { id: 'text', name: 'Text Tools' },
  { id: 'web', name: 'Web Tools' },
  { id: 'data', name: 'Data Tools' },
  { id: 'time', name: 'Time Tools' },
  { id: 'debug', name: 'Debug & Inspection Tools' },
  { id: 'ai', name: 'AI Developer Tools' },
  { id: 'image', name: 'Image Tools' },
];

export function ToolsDirectory() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Helmet>
        <title>Tools Directory - DevConvert</title>
        <meta name="description" content="Browse all developer tools on DevConvert. Grouped by category for easy navigation." />
      </Helmet>

      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">Tools Directory</h1>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          Explore our complete collection of developer utilities, converters, and debugging tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {CATEGORIES.map(category => {
          const categoryTools = TOOLS.filter(t => t.category === category.id);
          if (categoryTools.length === 0) return null;

          return (
            <motion.div 
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-indigo-600 rounded-full"></span>
                {category.name}
              </h2>
              <ul className="space-y-3">
                {categoryTools.map(tool => (
                  <li key={tool.id}>
                    <Link 
                      to={`/tools/${tool.slug}`}
                      className="group flex items-center justify-between p-4 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl hover:border-indigo-500/50 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-500">
                          <tool.icon size={18} />
                        </div>
                        <span className="font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {tool.name}
                        </span>
                      </div>
                      <ArrowRight size={16} className="text-zinc-300 dark:text-zinc-700 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
