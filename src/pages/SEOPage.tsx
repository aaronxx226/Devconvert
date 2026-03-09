import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { TOOLS } from '../data/tools';
import { getSEOMetadata, SEO_VARIANTS } from '../data/seo';
import { ToolPage } from './ToolPage';
import { ArrowRight, Info, HelpCircle, Code, Link as LinkIcon, Search } from 'lucide-react';

export function SEOPage() {
  const { seoSlug } = useParams<{ seoSlug: string }>();
  
  // Find the variant first to know the suffix
  const variant = SEO_VARIANTS.find(v => seoSlug?.endsWith(v.suffix));
  
  // Find the tool by checking if the seoSlug matches tool.slug + variant.suffix
  const tool = TOOLS.find(t => {
    if (!seoSlug) return false;
    if (variant) {
      return seoSlug === t.slug + variant.suffix;
    }
    return seoSlug === t.slug;
  });
  
  if (!tool || !seoSlug) {
    return <Navigate to="/" replace />;
  }

  const seoData = getSEOMetadata(tool, seoSlug);
  
  if (!seoData) {
    // If it's just the tool slug without a variant, redirect to the main tool page
    if (tool.slug === seoSlug) {
      return <Navigate to={`/tools/${tool.slug}`} replace />;
    }
    return <Navigate to="/" replace />;
  }

  // Related tools (same category)
  const relatedTools = TOOLS.filter(t => t.category === tool.category && t.id !== tool.id).slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{seoData.title} | DevConvert</title>
        <meta name="description" content={seoData.description} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white mb-6 tracking-tight">
            {seoData.h1}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
            {seoData.intro}
          </p>
        </div>

        {/* The Tool Interface */}
        <div className="mb-20">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
            <div className="p-1 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 flex items-center px-6 py-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/20 border border-rose-500/40"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40"></div>
              </div>
              <span className="ml-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Live Tool Interface</span>
            </div>
            <div className="p-0">
              {/* We render the ToolPage component but we need to pass the tool context */}
              {/* Since ToolPage uses useParams, we can't easily just call it. */}
              {/* Actually, ToolPage is exported, we can just use it. */}
              {/* But ToolPage expects :slug in the URL. */}
              {/* We can wrap it in a custom route or just use the tool rendering logic. */}
              <ToolPage overrideTool={tool} minimal />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-16">
            {/* Explanation Section */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-500">
                  <Info size={20} />
                </div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">What is {tool.name}?</h2>
              </div>
              <div className="prose dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400">
                <p>{tool.explanation}</p>
                <p className="mt-4">
                  Using a {tool.name} is essential for modern web development. It helps in maintaining clean code, 
                  debugging complex data structures, and ensuring that your applications are performant and error-free.
                </p>
              </div>
            </section>

            {/* Example Section */}
            {tool.exampleInput && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                    <Code size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">{tool.name} Example</h2>
                </div>
                <div className="bg-zinc-950 rounded-2xl p-6 overflow-hidden border border-white/5">
                  <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Input Example</h3>
                  <pre className="text-emerald-400 font-mono text-sm overflow-x-auto">
                    <code>{tool.exampleInput}</code>
                  </pre>
                </div>
                <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                  The above example shows a typical input for the {tool.name}. You can paste this directly into the tool 
                  above to see how it processes the data.
                </p>
              </section>
            )}

            {/* FAQ Section */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
                  <HelpCircle size={20} />
                </div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-6">
                {tool.faqs.map((faq, index) => (
                  <div key={index} className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-6 border border-zinc-100 dark:border-zinc-800">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">{faq.q}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-500/20">
              <h3 className="text-xl font-bold mb-4">Main Tool Page</h3>
              <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
                Access the full version of the {tool.name} with all features and advanced options.
              </p>
              <Link 
                to={`/tools/${tool.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors"
              >
                Go to Main Tool <ArrowRight size={16} />
              </Link>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2 mb-6">
                <Search size={18} className="text-indigo-500" />
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Other Resources</h3>
              </div>
              <div className="space-y-4">
                {SEO_VARIANTS.filter(v => !seoSlug.endsWith(v.suffix)).map(v => (
                  <Link 
                    key={v.suffix} 
                    to={`/${tool.slug}${v.suffix}`}
                    className="flex items-center justify-between p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:border-indigo-500/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all group"
                  >
                    <span className="font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-indigo-500">{v.h1Template(tool.name)}</span>
                    <ArrowRight size={14} className="text-zinc-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2 mb-6">
                <LinkIcon size={18} className="text-indigo-500" />
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Related Tools</h3>
              </div>
              <div className="space-y-4">
                {relatedTools.map(t => (
                  <Link 
                    key={t.id} 
                    to={`/tools/${t.slug}`}
                    className="flex items-center justify-between p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:border-indigo-500/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all group"
                  >
                    <span className="font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-indigo-500">{t.name}</span>
                    <ArrowRight size={14} className="text-zinc-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
