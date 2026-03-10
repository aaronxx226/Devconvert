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
        <div className="flex flex-wrap items-center gap-3 pb-6 border-b border-zinc-100 dark:border-zinc-800/50">
          <button
            onClick={onProcess}
            className="btn-primary flex items-center gap-2"
          >
            Process <ArrowRight size={18} />
          </button>
          {onAutoFormat && (
            <button
              onClick={onAutoFormat}
              className="btn-secondary flex items-center gap-2"
            >
              Auto-Format
            </button>
          )}
          <button
            onClick={onClear}
            className="btn-secondary flex items-center gap-2"
          >
            <Trash2 size={18} /> Clear
          </button>
          
          <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-2 hidden sm:block" />

          <button
            onClick={handleCopy}
            disabled={!output}
            className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 active:scale-95 ${
              !output 
                ? 'bg-zinc-50 dark:bg-zinc-900 text-zinc-300 dark:text-zinc-700 cursor-not-allowed' 
                : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
            {copied ? 'Copied!' : 'Copy Result'}
          </button>

          {onDownload && (
            <button
              onClick={onDownload}
              disabled={!output}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 active:scale-95 ${
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
    <div className="max-w-6xl mx-auto px-4 py-16">
      <Helmet>
        <title>{tool.name} - DevConvert</title>
        <meta name="description" content={tool.metaDescription} />
      </Helmet>

      <div className="mb-12">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="p-4 bg-brand-500/10 rounded-2xl text-brand-600 dark:text-brand-400 w-fit shadow-sm">
            <tool.icon size={40} />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tight">{tool.name}</h1>
              <span className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 text-[10px] font-bold uppercase tracking-widest rounded-md border border-zinc-200 dark:border-zinc-700">
                {tool.category}
              </span>
            </div>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl">{tool.description}</p>
          </div>
        </div>
      </div>

      <AdPlaceholder label="Top Ad Unit" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="saas-card p-8 mb-16"
      >
        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap items-center gap-3 pb-8 border-b border-zinc-100 dark:border-zinc-800/50">
            <button
              onClick={onProcess}
              className="btn-primary flex items-center gap-2"
            >
              Process <ArrowRight size={18} />
            </button>
            {onAutoFormat && (
              <button
                onClick={onAutoFormat}
                className="btn-secondary flex items-center gap-2"
              >
                Auto-Format
              </button>
            )}
            <button
              onClick={onClear}
              className="btn-secondary flex items-center gap-2"
            >
              <Trash2 size={18} /> Clear
            </button>
            
            <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-2 hidden sm:block" />

            <button
              onClick={handleCopy}
              disabled={!output}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 active:scale-95 ${
                !output 
                  ? 'bg-zinc-50 dark:bg-zinc-900 text-zinc-300 dark:text-zinc-700 cursor-not-allowed' 
                  : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
              {copied ? 'Copied!' : 'Copy Result'}
            </button>

            {onDownload && (
              <button
                onClick={onDownload}
                disabled={!output}
                className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 active:scale-95 ${
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
                className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 active:scale-95 ${
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
        <div className="md:col-span-2 space-y-16">
          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">What is {tool.name}?</h2>
            <div className="prose dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <p>{tool.explanation}</p>
            </div>
          </section>

          {tool.exampleInput && (
            <section>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">Example Usage</h2>
              <div className="bg-zinc-50 dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 font-mono text-sm overflow-x-auto shadow-inner">
                <pre className="text-zinc-700 dark:text-zinc-300">{tool.exampleInput}</pre>
              </div>
            </section>
          )}

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8 tracking-tight">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {tool.faqs.map((faq, i) => (
                <div key={i} className="saas-card p-8">
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-3">{faq.q}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <div className="bg-brand-500/5 border border-brand-500/10 p-8 rounded-3xl">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">Related Tools</h3>
            <div className="space-y-3">
              {relatedTools.map(t => (
                <Link 
                  key={t.id} 
                  to={`/tools/${t.slug}`}
                  className="flex items-center gap-3 p-3 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl hover:border-brand-500/50 transition-all group shadow-sm"
                >
                  <div className="p-2 bg-brand-500/10 rounded-lg text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                    <t.icon size={18} />
                  </div>
                  <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{t.name}</span>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 p-8 rounded-3xl">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">Quick Links</h3>
            <div className="flex flex-wrap gap-2">
              {SEO_VARIANTS.map(v => (
                <Link 
                  key={v.suffix} 
                  to={`/${tool.slug}${v.suffix}`}
                  className="px-3 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hover:text-brand-500 hover:border-brand-500/50 transition-all shadow-sm"
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
