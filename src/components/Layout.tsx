import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Terminal, Github } from 'lucide-react';

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
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white group-hover:rotate-12 transition-transform">
            <Terminal size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">DevConvert</span>
        </Link>

        <div className="flex items-center gap-4">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <Github size={18} />
            <span>GitHub</span>
          </a>
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 py-16 mt-20 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center text-white">
                <Terminal size={14} />
              </div>
              <span className="text-lg font-bold text-zinc-900 dark:text-white">DevConvert</span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
              The ultimate developer utility belt. Free, fast, and secure online tools for developers. 
              All processing happens 100% in your browser.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-zinc-400 hover:text-indigo-600 transition-colors"><Github size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-zinc-900 dark:text-white mb-6 uppercase text-xs tracking-widest">Tools</h4>
            <ul className="space-y-3 text-zinc-600 dark:text-zinc-400 text-sm">
              <li><Link to="/" className="hover:text-indigo-600 transition-colors">All Tools</Link></li>
              <li><Link to="/tools/json-formatter" className="hover:text-indigo-600 transition-colors">JSON Formatter</Link></li>
              <li><Link to="/tools/jwt-decoder" className="hover:text-indigo-600 transition-colors">JWT Decoder</Link></li>
              <li><Link to="/tools/base64-encoder" className="hover:text-indigo-600 transition-colors">Base64 Encoder</Link></li>
              <li><Link to="/tools/timestamp-converter" className="hover:text-indigo-600 transition-colors">Timestamp Converter</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-zinc-900 dark:text-white mb-6 uppercase text-xs tracking-widest">Company</h4>
            <ul className="space-y-3 text-zinc-600 dark:text-zinc-400 text-sm">
              <li><Link to="/about" className="hover:text-indigo-600 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-indigo-600 transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-zinc-900 dark:text-white mb-6 uppercase text-xs tracking-widest">Popular Resources</h4>
            <ul className="space-y-3 text-zinc-600 dark:text-zinc-400 text-sm">
              <li><Link to="/json-formatter-online" className="hover:text-indigo-600 transition-colors">JSON Formatter Online</Link></li>
              <li><Link to="/jwt-decoder-tutorial" className="hover:text-indigo-600 transition-colors">JWT Decoder Tutorial</Link></li>
              <li><Link to="/base64-encoder-example" className="hover:text-indigo-600 transition-colors">Base64 Encoder Example</Link></li>
              <li><Link to="/timestamp-converter-api-response" className="hover:text-indigo-600 transition-colors">API Response Timestamps</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-zinc-900 dark:text-white mb-6 uppercase text-xs tracking-widest">Newsletter</h4>
            <p className="text-zinc-600 dark:text-zinc-400 text-xs mb-4">Get notified when we add new tools.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="flex-1 px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs outline-none focus:border-indigo-500"
              />
              <button className="px-3 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors">Join</button>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 dark:text-zinc-500 text-xs">
            © {new Date().getFullYear()} DevConvert. Built with ❤️ for the developer community.
          </p>
          <p className="text-zinc-500 dark:text-zinc-500 text-xs">
            No data is stored on our servers. 100% Client-Side.
          </p>
        </div>
      </div>
    </footer>
  );
}
