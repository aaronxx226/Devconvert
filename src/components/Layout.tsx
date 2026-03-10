import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Terminal, Github, Shield, Zap } from 'lucide-react';

export function Header() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800/50 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-500/20 group-hover:rotate-6 transition-transform">
            <Terminal size={20} />
          </div>
          <span className="text-xl font-black tracking-tight text-zinc-900 dark:text-white">DevConvert</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-6">
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Tools</Link>
            <Link to="/errors" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Error Library</Link>
          </nav>
          
          <div className="h-4 w-px bg-zinc-200 dark:border-zinc-800 hidden md:block" />

          <div className="flex items-center gap-2">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200 dark:border-zinc-800/50 py-20 mt-20 bg-zinc-50/50 dark:bg-zinc-900/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-7 h-7 bg-brand-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-brand-500/20">
                <Terminal size={16} />
              </div>
              <span className="text-lg font-black text-zinc-900 dark:text-white">DevConvert</span>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-8">
              The ultimate developer utility belt. Free, fast, and secure online tools for modern developers. 
              All processing happens 100% in your browser.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-9 h-9 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-brand-600 hover:border-brand-500/50 transition-all"><Github size={18} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-zinc-900 dark:text-white mb-6 text-xs uppercase tracking-widest">Utilities</h4>
            <ul className="space-y-4 text-zinc-500 dark:text-zinc-400 text-sm">
              <li><Link to="/" className="hover:text-brand-600 transition-colors">All Tools</Link></li>
              <li><Link to="/tools/json-formatter" className="hover:text-brand-600 transition-colors">JSON Formatter</Link></li>
              <li><Link to="/tools/jwt-decoder" className="hover:text-brand-600 transition-colors">JWT Decoder</Link></li>
              <li><Link to="/tools/base64-encoder" className="hover:text-brand-600 transition-colors">Base64 Encoder</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-zinc-900 dark:text-white mb-6 text-xs uppercase tracking-widest">Resources</h4>
            <ul className="space-y-4 text-zinc-500 dark:text-zinc-400 text-sm">
              <li><Link to="/errors" className="hover:text-brand-600 transition-colors">Error Library</Link></li>
              <li><Link to="/about" className="hover:text-brand-600 transition-colors">About Us</Link></li>
              <li><Link to="/privacy" className="hover:text-brand-600 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-zinc-900 dark:text-white mb-6 text-xs uppercase tracking-widest">Stay Updated</h4>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs mb-6">Get notified when we add new tools.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="flex-1 px-4 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs outline-none focus:border-brand-500 transition-all"
              />
              <button className="px-4 py-2.5 bg-brand-600 text-white rounded-xl text-xs font-bold hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/10">Join</button>
            </div>
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-zinc-200 dark:border-zinc-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-500 dark:text-zinc-500 text-[11px] font-medium">
            © {new Date().getFullYear()} DevConvert. Built for the developer community.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-zinc-500 dark:text-zinc-500 text-[11px] font-medium flex items-center gap-1.5">
              <Shield size={12} className="text-emerald-500" /> 100% Client-Side
            </span>
            <span className="text-zinc-500 dark:text-zinc-500 text-[11px] font-medium flex items-center gap-1.5">
              <Zap size={12} className="text-amber-500" /> Instant
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
