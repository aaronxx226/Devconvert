import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Copy, Trash2, Download, ArrowRight, Check, AlertCircle, Share2 } from 'lucide-react';
import { Tool } from '../data/tools';
import { TOOLS } from '../data/tools';
import { SEO_VARIANTS } from '../data/seo';
import { Link } from 'react-router-dom';

interface ToolPageLayoutProps {
  tool: Tool;
  children: React.ReactNode;
  onProcess: () => void;
  onClear: () => void;
  onCopy: () => void;
  onDownload?: () => void;
  onExport?: () => void;
  onAutoFormat?: () => void;
  input: string;
  output: string;
  error?: string;
  minimal?: boolean;
}

export function AdPlaceholder({ label = "Advertisement" }: { label?: string }) {
  return (
    <div className="w-full h-32 bg-zinc-100 dark:bg-zinc-900 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl flex items-center justify-center my-8">
      <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">{label}</span>
    </div>
  );
}

export function ToolPageLayout({
  tool,
  children,
  onProcess,
  onClear,
  onCopy,
  onDownload,
  onExport,
  onAutoFormat,
  input,
  output,
  error,
  minimal = false
}: ToolPageLayoutProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const relatedTools = TOOLS.filter(t => t.category === tool.category && t.id !== tool.id).slice(0, 3);

  if (minimal) {
    return (
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-wrap items-center gap-3 pb-6 border-b border-zinc-100 dark:border-zinc-800">
          <button
            onClick={onProcess}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/20"
          >
            Process <ArrowRight size={18} />
          </button>
          {onAutoFormat && (
            <button
              onClick={onAutoFormat}
              className="px-6 py-2.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl font-semibold transition-colors flex items-center gap-2"
            >
              Auto-Format
            </button>
          )}
          <button
            onClick={onClear}
            className="px-6 py-2.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl font-semibold transition-colors flex items-center gap-2"
          >
            <Trash2 size={18} /> Clear
          </button>
          
          <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-2 hidden sm:block" />

          <button
            onClick={handleCopy}
            disabled={!output}
            className={`px-6 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2 ${
              !output 
                ? 'bg-zinc-50 dark:bg-zinc-900 text-zinc-300 dark:text-zinc-700 cursor-not-allowed' 
                : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
            {copied ? 'Copied!' : 'Copy Result'}
          </button>

          {onDownload && (
            <button
              onClick={onDownload}
              disabled={!output}
              className={`px-6 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2 ${
                !output 
                  ? 'bg-zinc-50 dark:bg-zinc-900 text-zinc-300 dark:text-zinc-700 cursor-not-allowed' 
                  : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              <Download size={18} /> Download
            </button>
          )}
        </div>

        {children}

        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Helmet>
        <title>{tool.name} - DevConvert</title>
        <meta name="description" content={tool.metaDescription} />
      </Helmet>

      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-500">
            <tool.icon size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">{tool.name}</h1>
            <p className="text-zinc-500 dark:text-zinc-400">{tool.description}</p>
          </div>
        </div>
      </div>

      <AdPlaceholder label="Top Ad Unit" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm mb-12"
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3 pb-6 border-b border-zinc-100 dark:border-zinc-800">
            <button
              onClick={onProcess}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/20"
            >
              Process <ArrowRight size={18} />
            </button>
            {onAutoFormat && (
              <button
                onClick={onAutoFormat}
                className="px-6 py-2.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl font-semibold transition-colors flex items-center gap-2"
              >
                Auto-Format
              </button>
            )}
            <button
              onClick={onClear}
              className="px-6 py-2.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl font-semibold transition-colors flex items-center gap-2"
            >
              <Trash2 size={18} /> Clear
            </button>
            
            <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-2 hidden sm:block" />

            <button
              onClick={handleCopy}
              disabled={!output}
              className={`px-6 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2 ${
                !output 
                  ? 'bg-zinc-50 dark:bg-zinc-900 text-zinc-300 dark:text-zinc-700 cursor-not-allowed' 
                  : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
              {copied ? 'Copied!' : 'Copy Result'}
            </button>

            {onDownload && (
              <button
                onClick={onDownload}
                disabled={!output}
                className={`px-6 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2 ${
                  !output 
                    ? 'bg-zinc-50 dark:bg-zinc-900 text-zinc-300 dark:text-zinc-700 cursor-not-allowed' 
                    : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                <Download size={18} /> Download
              </button>
            )}

            {onExport && (
              <button
                onClick={onExport}
                disabled={!output}
                className={`px-6 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2 ${
                  !output 
                    ? 'bg-zinc-50 dark:bg-zinc-900 text-zinc-300 dark:text-zinc-700 cursor-not-allowed' 
                    : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                <Share2 size={18} /> Export
              </button>
            )}
          </div>

          {children}

          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}
        </div>
      </motion.div>

      <AdPlaceholder label="Middle Ad Unit" />

      {/* SEO Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <div className="md:col-span-2 space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">What is {tool.name}?</h2>
            <div className="prose dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <p>{tool.explanation}</p>
            </div>
          </section>

          {tool.exampleInput && (
            <section>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Example Usage</h2>
              <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 font-mono text-sm overflow-x-auto">
                <pre className="text-zinc-700 dark:text-zinc-300">{tool.exampleInput}</pre>
              </div>
            </section>
          )}

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {tool.faqs.map((faq, i) => (
                <div key={i} className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-6 rounded-2xl">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">{faq.q}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <div className="bg-indigo-500/5 border border-indigo-500/10 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Related Tools</h3>
            <div className="space-y-3">
              {relatedTools.map(t => (
                <Link 
                  key={t.id} 
                  to={`/tools/${t.slug}`}
                  className="flex items-center gap-3 p-3 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl hover:border-indigo-500/50 transition-all group"
                >
                  <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                    <t.icon size={18} />
                  </div>
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t.name}</span>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Quick Links</h3>
            <div className="flex flex-wrap gap-2">
              {SEO_VARIANTS.map(v => (
                <Link 
                  key={v.suffix} 
                  to={`/${tool.slug}${v.suffix}`}
                  className="px-3 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-indigo-500 hover:border-indigo-500/50 transition-all"
                >
                  {v.h1Template(tool.name)}
                </Link>
              ))}
            </div>
          </div>

          <AdPlaceholder label="Sidebar Ad" />
        </div>
      </div>

      <AdPlaceholder label="Bottom Ad Unit" />
    </div>
  );
}
