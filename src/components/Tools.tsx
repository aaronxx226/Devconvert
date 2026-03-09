import React, { useState, useCallback, useMemo } from 'react';
import TurndownService from 'turndown';
import { format as formatSql } from 'sql-formatter';
import { html as beautifyHtml } from 'js-beautify';
import { format as formatDate } from 'date-fns';
import { Plus, X } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import CryptoJS from 'crypto-js';
import yaml from 'js-yaml';

// Shared Textarea Component
export function ToolTextarea({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  readOnly = false,
  error = false
}: { 
  label: string; 
  value: string; 
  onChange?: (val: string) => void; 
  placeholder?: string;
  readOnly?: boolean;
  error?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 flex-1 min-w-[300px]">
      <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`
          w-full h-64 p-4 font-mono text-sm rounded-xl border transition-all outline-none
          ${error 
            ? 'border-red-500 bg-red-50/30 dark:bg-red-900/10' 
            : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'}
          ${readOnly ? 'cursor-default' : ''}
          dark:text-zinc-200
        `}
      />
    </div>
  );
}

// 1. JSON to CSV
export function useJSONToCSV() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const process = useCallback(() => {
    try {
      setError('');
      if (!input.trim()) { setOutput(''); return; }
      const json = JSON.parse(input);
      const array = Array.isArray(json) ? json : [json];
      if (array.length === 0) {
        setOutput('');
        return;
      }
      const headers = Object.keys(array[0]);
      const csvRows = [
        headers.join(','),
        ...array.map(row => headers.map(header => JSON.stringify(row[header] ?? '')).join(','))
      ];
      setOutput(csvRows.join('\n'));
    } catch (e) {
      setError('Invalid JSON format');
    }
  }, [input]);

  return { input, setInput, output, setOutput, error, process };
}

// 2. CSV to JSON
export function useCSVToJSON() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const process = useCallback(() => {
    try {
      setError('');
      if (!input.trim()) { setOutput(''); return; }
      const lines = input.split('\n').filter(l => l.trim());
      if (lines.length < 2) {
        setOutput('[]');
        return;
      }
      const headers = lines[0].split(',').map(h => h.trim());
      const result = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim());
        const obj: any = {};
        headers.forEach((header, i) => {
          let val: any = values[i];
          if (val === 'true') val = true;
          else if (val === 'false') val = false;
          else if (!isNaN(val) && val !== '') val = Number(val);
          obj[header] = val;
        });
        return obj;
      });
      setOutput(JSON.stringify(result, null, 2));
    } catch (e) {
      setError('Invalid CSV format');
    }
  }, [input]);

  return { input, setInput, output, setOutput, error, process };
}

// 3. JSON Formatter
export function useJSONFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const process = useCallback(() => {
    try {
      setError('');
      if (!input.trim()) { setOutput(''); return; }
      const json = JSON.parse(input);
      setOutput(JSON.stringify(json, null, 2));
    } catch (e) {
      setError('Invalid JSON format');
    }
  }, [input]);

  return { input, setInput, output, setOutput, error, process };
}

// 4. JSON Validator
export function useJSONValidator() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [errorDetails, setErrorDetails] = useState<{line?: number, column?: number} | null>(null);

  const process = useCallback(() => {
    try {
      setError('');
      setErrorDetails(null);
      if (!input.trim()) { setOutput(''); return; }
      JSON.parse(input);
      setOutput('Valid JSON ✅');
    } catch (e: any) {
      const msg = e.message;
      setError('Invalid JSON: ' + msg);
      setOutput('Invalid JSON ❌');
      
      // Try to extract position
      const posMatch = msg.match(/at position (\d+)/);
      if (posMatch) {
        const pos = parseInt(posMatch[1]);
        const lines = input.substring(0, pos).split('\n');
        setErrorDetails({
          line: lines.length,
          column: lines[lines.length - 1].length + 1
        });
      }
    }
  }, [input]);

  return { input, setInput, output, setOutput, error, errorDetails, process };
}

// 5. JSON Minifier
export function useJSONMinifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const process = useCallback(() => {
    try {
      setError('');
      if (!input.trim()) { setOutput(''); return; }
      const json = JSON.parse(input);
      setOutput(JSON.stringify(json));
    } catch (e) {
      setError('Invalid JSON format');
    }
  }, [input]);

  return { input, setInput, output, setOutput, error, process };
}

// 6. Base64 Encoder
export function useBase64Encoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const process = useCallback(() => {
    try {
      if (!input.trim()) { setOutput(''); return; }
      setOutput(btoa(input));
    } catch (e) {
      setOutput('Error encoding to Base64');
    }
  }, [input]);

  return { input, setInput, output, setOutput, process };
}

// 7. Base64 Decoder
export function useBase64Decoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const process = useCallback(() => {
    try {
      setError('');
      if (!input.trim()) { setOutput(''); return; }
      setOutput(atob(input));
    } catch (e) {
      setError('Invalid Base64 string');
    }
  }, [input]);

  return { input, setInput, output, setOutput, error, process };
}

// 8. URL Encoder Decoder
export function useURLEncoderDecoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const process = useCallback(() => {
    try {
      if (!input.trim()) { setOutput(''); return; }
      if (mode === 'encode') {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch (e) {
      setOutput('Error processing URL');
    }
  }, [input, mode]);

  return { input, setInput, output, setOutput, mode, setMode, process };
}

// 9. JWT Decoder
export function useJWTDecoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const process = useCallback(() => {
    try {
      setError('');
      if (!input.trim()) { setOutput(''); return; }
      const parts = input.split('.');
      if (parts.length !== 3) throw new Error('Invalid JWT format');
      const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      setOutput(JSON.stringify({ header, payload }, null, 2));
    } catch (e) {
      setError('Invalid JWT token');
    }
  }, [input]);

  return { input, setInput, output, setOutput, error, process };
}

// 10. Timestamp Converter
export function useTimestampConverter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const process = useCallback(() => {
    try {
      setError('');
      if (!input.trim()) { setOutput(''); return; }
      
      // Check if it's a timestamp or a date string
      if (/^\d+$/.test(input)) {
        let ts = parseInt(input);
        // Detect seconds vs milliseconds
        if (input.length <= 10) ts *= 1000;
        const date = new Date(ts);
        setOutput(formatDate(date, 'yyyy-MM-dd HH:mm:ss XXX'));
      } else {
        const date = new Date(input);
        if (isNaN(date.getTime())) throw new Error('Invalid Date');
        setOutput(Math.floor(date.getTime() / 1000).toString());
      }
    } catch (e) {
      setError('Invalid Timestamp or Date');
    }
  }, [input]);

  return { input, setInput, output, setOutput, error, process };
}

// 11. Regex Tester
export function useRegexTester() {
  const [input, setInput] = useState(''); // Sample text
  const [regex, setRegex] = useState('');
  const [flags, setFlags] = useState('g');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const process = useCallback(() => {
    try {
      setError('');
      if (!regex.trim()) { setOutput(''); return; }
      const re = new RegExp(regex, flags);
      const matches = Array.from(input.matchAll(re)) as RegExpExecArray[];
      if (matches.length === 0) {
        setOutput('No matches found');
      } else {
        const results = matches.map((m, i) => {
          return `Match ${i + 1}: "${m[0]}" at index ${m.index}\nGroups: ${JSON.stringify(m.slice(1))}`;
        });
        setOutput(results.join('\n\n'));
      }
    } catch (e: any) {
      setError('Invalid Regex: ' + e.message);
    }
  }, [input, regex, flags]);

  return { input, setInput, regex, setRegex, flags, setFlags, output, setOutput, error, process };
}

// 12. HTML Beautifier
export function useHTMLBeautifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const process = useCallback(() => {
    try {
      setError('');
      if (!input.trim()) { setOutput(''); return; }
      setOutput(beautifyHtml(input, { indent_size: 2 }));
    } catch (e) {
      setError('Error beautifying HTML');
    }
  }, [input]);

  return { input, setInput, output, setOutput, error, process };
}

// 13. SQL Formatter
export function useSQLFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const process = useCallback(() => {
    try {
      setError('');
      if (!input.trim()) { setOutput(''); return; }
      setOutput(formatSql(input, { language: 'sql', keywordCase: 'upper' }));
    } catch (e) {
      setError('Error formatting SQL');
    }
  }, [input]);

  return { input, setInput, output, setOutput, error, process };
}

// 14. HTML to Markdown
export function useHTMLToMarkdown() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const turndown = new TurndownService();

  const process = useCallback(() => {
    if (!input.trim()) { setOutput(''); return; }
    setOutput(turndown.turndown(input));
  }, [input]);

  return { input, setInput, output, setOutput, process };
}

// 15. Text to Slug
export function useTextToSlug() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const process = useCallback(() => {
    if (!input.trim()) { setOutput(''); return; }
    setOutput(
      input
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
    );
  }, [input]);

  return { input, setInput, output, setOutput, process };
}

// 16. Image to Base64
export function useImageToBase64() {
  const [output, setOutput] = useState('');
  const [preview, setPreview] = useState('');

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setOutput(base64);
        setPreview(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  return { output, setOutput, preview, setPreview, handleFile };
}

// 17. JSON Error Finder
export function useJSONErrorFinder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [errorPos, setErrorPos] = useState<{ line: number; col: number } | null>(null);

  const process = useCallback(() => {
    try {
      setError('');
      setErrorPos(null);
      if (!input.trim()) { setOutput(''); return; }
      JSON.parse(input);
      setOutput('JSON is valid! No errors found. ✅');
    } catch (e: any) {
      const msg = e.message;
      let line = 1;
      let col = 1;
      
      // Try to extract position from V8 error message: "at position 123"
      const posMatch = msg.match(/at position (\d+)/);
      if (posMatch) {
        const pos = parseInt(posMatch[1]);
        const lines = input.substring(0, pos).split('\n');
        line = lines.length;
        col = lines[lines.length - 1].length + 1;
        setErrorPos({ line, col });
        setError(`Error at Line ${line}, Column ${col}: ${msg}`);
      } else {
        setError(msg);
      }
      setOutput('Invalid JSON ❌');
    }
  }, [input]);

  return { input, setInput, output, setOutput, error, errorPos, process };
}

// 18. API Request Builder
export function useAPIRequestBuilder() {
  const [url, setUrl] = useState('https://api.example.com/data');
  const [method, setMethod] = useState('GET');
  const [headers, setHeaders] = useState<{ key: string; value: string }[]>([{ key: 'Content-Type', value: 'application/json' }]);
  const [body, setBody] = useState('{\n  "key": "value"\n}');
  const [output, setOutput] = useState('');

  const addHeader = () => setHeaders([...headers, { key: '', value: '' }]);
  const removeHeader = (index: number) => setHeaders(headers.filter((_, i) => i !== index));
  const updateHeader = (index: number, field: 'key' | 'value', val: string) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = val;
    setHeaders(newHeaders);
  };

  const process = useCallback(() => {
    const headerObj = headers.reduce((acc, h) => {
      if (h.key.trim()) acc[h.key.trim()] = h.value;
      return acc;
    }, {} as any);

    const curlHeaders = Object.entries(headerObj).map(([k, v]) => `-H "${k}: ${v}"`).join(' ');
    const curl = `curl -X ${method} "${url}" ${curlHeaders} ${method !== 'GET' ? `-d '${body.replace(/'/g, "\\'")}'` : ''}`;

    const fetchHeaders = JSON.stringify(headerObj, null, 2);
    const fetchCode = `fetch("${url}", {
  method: "${method}",
  headers: ${fetchHeaders},
  ${method !== 'GET' ? `body: JSON.stringify(${body})` : ''}
})
.then(response => response.json())
.then(data => console.log(data));`;

    const pyHeaders = JSON.stringify(headerObj, null, 2);
    const python = `import requests

url = "${url}"
headers = ${pyHeaders}
${method !== 'GET' ? `data = ${body}` : ''}

response = requests.${method.toLowerCase()}(url, headers=headers${method !== 'GET' ? ', json=data' : ''})
print(response.json())`;

    setOutput(`### cURL\n${curl}\n\n### JavaScript Fetch\n${fetchCode}\n\n### Python Requests\n${python}`);
  }, [url, method, headers, body]);

  return { url, setUrl, method, setMethod, headers, addHeader, removeHeader, updateHeader, body, setBody, output, process };
}

export { Plus, X };

// 19. JSON to TypeScript
export function useJSONToTypeScript() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const process = useCallback(() => {
    try {
      setError('');
      if (!input.trim()) { setOutput(''); return; }
      const json = JSON.parse(input);
      
      const interfaces: string[] = [];
      const seenInterfaces = new Set<string>();

      const toPascalCase = (str: string) => str.replace(/(^\w|-\w)/g, clear => clear.replace('-', '').toUpperCase());

      const generateInterface = (obj: any, name: string): string => {
        if (seenInterfaces.has(name)) return name;
        
        let res = `interface ${name} {\n`;
        for (const key in obj) {
          const val = obj[key];
          const type = typeof val;
          if (val === null) {
            res += `  ${key}: any;\n`;
          } else if (Array.isArray(val)) {
            if (val.length > 0 && typeof val[0] === 'object') {
              const subName = toPascalCase(key) + 'Item';
              generateInterface(val[0], subName);
              res += `  ${key}: ${subName}[];\n`;
            } else {
              res += `  ${key}: ${val.length > 0 ? typeof val[0] : 'any'}[];\n`;
            }
          } else if (type === 'object') {
            const subName = toPascalCase(key);
            generateInterface(val, subName);
            res += `  ${key}: ${subName};\n`;
          } else {
            res += `  ${key}: ${type};\n`;
          }
        }
        res += `}\n`;
        if (!seenInterfaces.has(name)) {
          interfaces.push(res);
          seenInterfaces.add(name);
        }
        return name;
      };

      generateInterface(json, 'RootObject');
      setOutput(interfaces.reverse().join('\n'));
    } catch (e) {
      setError('Invalid JSON format');
    }
  }, [input]);

  return { input, setInput, output, setOutput, error, process };
}

// 20. Cron Expression Generator
export function useCronGenerator() {
  const [input, setInput] = useState('0 0 * * *');
  const [output, setOutput] = useState('At 00:00 every day');
  const [error, setError] = useState('');

  const process = useCallback(() => {
    const parts = input.trim().split(/\s+/);
    if (parts.length !== 5) {
      setError('Invalid cron expression. Expected 5 parts.');
      return;
    }
    setError('');
    const [min, hour, day, month, dow] = parts;
    let desc = 'At ';
    desc += min === '*' ? 'every minute ' : `${min.padStart(2, '0')}:`;
    desc += hour === '*' ? 'every hour ' : `${hour.padStart(2, '0')} `;
    desc += day === '*' ? 'every day ' : `on day ${day} `;
    desc += month === '*' ? '' : `in month ${month} `;
    desc += dow === '*' ? '' : `on day of week ${dow}`;
    setOutput(desc.trim());
  }, [input]);

  return { input, setInput, output, setOutput, error, process };
}

// 21. UUID Generator
export function useUUIDGenerator() {
  const [count, setCount] = useState('1');
  const [version, setVersion] = useState<'v1' | 'v4'>('v4');
  const [output, setOutput] = useState('');

  const generateUUID = (v: 'v1' | 'v4') => {
    if (v === 'v4') {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    } else {
      const now = Date.now();
      return `${now.toString(16)}-${Math.floor(Math.random() * 0xffff).toString(16)}-1xxx-8xxx-${Math.floor(Math.random() * 0xffffffffffff).toString(16)}`;
    }
  };

  const process = useCallback(() => {
    const n = parseInt(count) || 1;
    const results = [];
    for (let i = 0; i < n; i++) {
      results.push(generateUUID(version));
    }
    setOutput(results.join('\n'));
  }, [count, version]);

  return { count, setCount, version, setVersion, output, setOutput, process };
}

// 22. Password Hash Generator
export function usePasswordHashGenerator() {
  const [input, setInput] = useState('');
  const [algorithm, setAlgorithm] = useState<'MD5' | 'SHA1' | 'SHA256' | 'SHA512'>('SHA256');
  const [output, setOutput] = useState('');

  const process = useCallback(() => {
    if (!input) { setOutput(''); return; }
    let hash;
    switch (algorithm) {
      case 'MD5': hash = CryptoJS.MD5(input); break;
      case 'SHA1': hash = CryptoJS.SHA1(input); break;
      case 'SHA256': hash = CryptoJS.SHA256(input); break;
      case 'SHA512': hash = CryptoJS.SHA512(input); break;
      default: hash = CryptoJS.SHA256(input);
    }
    setOutput(hash.toString());
  }, [input, algorithm]);

  return { input, setInput, algorithm, setAlgorithm, output, setOutput, process };
}

// 23. Text Diff Checker
export function useTextDiffChecker() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [output, setOutput] = useState('');

  const process = useCallback(() => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const maxLines = Math.max(lines1.length, lines2.length);
    let diff = '';
    for (let i = 0; i < maxLines; i++) {
      const l1 = lines1[i] || '';
      const l2 = lines2[i] || '';
      if (l1 === l2) {
        diff += `  ${l1}\n`;
      } else {
        if (i < lines1.length) diff += `- ${l1}\n`;
        if (i < lines2.length) diff += `+ ${l2}\n`;
      }
    }
    setOutput(diff);
  }, [text1, text2]);

  return { text1, setText1, text2, setText2, output, setOutput, process };
}

// 24. Color Converter
export function useColorConverter() {
  const [input, setInput] = useState('#6366f1');
  const [output, setOutput] = useState('');

  const process = useCallback(() => {
    let hex = input.trim();
    if (!hex.startsWith('#')) hex = '#' + hex;
    if (!/^#[0-9A-F]{6}$/i.test(hex)) {
      setOutput('Invalid HEX color');
      return;
    }
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const r_ = r / 255, g_ = g / 255, b_ = b / 255;
    const max = Math.max(r_, g_, b_), min = Math.min(r_, g_, b_);
    let h = 0, s, l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r_: h = (g_ - b_) / d + (g_ < b_ ? 6 : 0); break;
        case g_: h = (b_ - r_) / d + 2; break;
        case b_: h = (r_ - g_) / d + 4; break;
      }
      h /= 6;
    }
    setOutput(`RGB: rgb(${r}, ${g}, ${b})\nHSL: hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`);
  }, [input]);

  return { input, setInput, output, setOutput, process };
}

// 25. AI Tools (Gemini)
export function useAITool(type: 'regex' | 'sql' | 'json-fix') {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleProcess = useCallback(async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError('');
    console.log('AI Tool: Starting generation...', { type, inputLength: input.length });
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('Gemini API Key is missing. Please configure it in the AI Studio Secrets panel.');
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are a developer tool assistant. 
            Task: ${type === 'regex' ? 'Generate a regex pattern' : type === 'sql' ? 'Generate a SQL query' : 'Fix this broken JSON'}
            Description/Input: ${input}
            Return ONLY the code/result without any markdown formatting or extra text.`
      });
      
      console.log('AI Tool: Generation complete', { response });
      
      if (!response.text) {
        throw new Error('No response text received from AI');
      }
      
      setOutput(response.text.trim());
    } catch (e: any) {
      console.error('AI Tool Error:', e);
      setError('AI Error: ' + (e.message || 'Unknown error occurred'));
    } finally {
      setLoading(false);
    }
  }, [input, type]);

  return { input, setInput, output, setOutput, loading, error, process: handleProcess };
}

// 26. JWT Expiration Checker
export function useJWTExpirationChecker() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const process = useCallback(() => {
    try {
      setError('');
      if (!input.trim()) { setOutput(''); return; }
      const parts = input.split('.');
      if (parts.length !== 3) throw new Error('Invalid JWT format');
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      
      const iat = payload.iat ? new Date(payload.iat * 1000).toLocaleString() : 'N/A';
      const exp = payload.exp ? new Date(payload.exp * 1000).toLocaleString() : 'N/A';
      const now = Math.floor(Date.now() / 1000);
      const remaining = payload.exp ? payload.exp - now : null;
      
      let status = '';
      if (remaining === null) status = 'No expiration set';
      else if (remaining > 0) status = `Valid for ${Math.floor(remaining / 60)} minutes`;
      else status = 'Expired ❌';

      setOutput(`Issued At: ${iat}\nExpires At: ${exp}\nStatus: ${status}`);
    } catch (e) {
      setError('Invalid JWT token');
    }
  }, [input]);

  return { input, setInput, output, setOutput, error, process };
}

// 27. HTTP Header Analyzer
export function useHTTPHeaderAnalyzer() {
  const [url, setUrl] = useState('https://httpbin.org/get');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const process = useCallback(async () => {
    if (!url.trim()) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch(url, { method: 'HEAD' });
      const headers: any = {};
      response.headers.forEach((v, k) => headers[k] = v);
      setOutput(JSON.stringify({
        status: response.status,
        statusText: response.statusText,
        headers
      }, null, 2));
    } catch (e: any) {
      setError('Fetch Error (CORS might be blocking this request): ' + e.message);
      setOutput('Could not fetch headers. This is likely due to CORS restrictions on the target URL. Try a URL that allows cross-origin requests or use a browser extension.');
    } finally {
      setLoading(false);
    }
  }, [url]);

  return { url, setUrl, output, setOutput, loading, error, process };
}

// 28. JSON ↔ YAML Converter
export function useJSONYAMLConverter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'json-to-yaml' | 'yaml-to-json'>('json-to-yaml');

  const process = useCallback(() => {
    try {
      setError('');
      if (!input.trim()) { setOutput(''); return; }
      if (mode === 'json-to-yaml') {
        const json = JSON.parse(input);
        setOutput(yaml.dump(json));
      } else {
        const data = yaml.load(input);
        setOutput(JSON.stringify(data, null, 2));
      }
    } catch (e: any) {
      setError('Conversion Error: ' + e.message);
    }
  }, [input, mode]);

  return { input, setInput, output, setOutput, error, mode, setMode, process };
}

// 29. Markdown Preview
export function useMarkdownPreview() {
  const [input, setInput] = useState('# Hello World\n\nThis is a **markdown** preview.');
  const [output, setOutput] = useState('');

  const process = useCallback(() => {
    setOutput(input); // Just pass through for preview
  }, [input]);

  return { input, setInput, output, setOutput, process };
}

// 30. Explain My Error (AI)
export function useExplainMyError() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleProcess = useCallback(async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError('');
    console.log('AI Error Explainer: Starting analysis...', { inputLength: input.length });
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('Gemini API Key is missing. Please configure it in the AI Studio Secrets panel.');
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are an expert developer assistant. 
            Analyze this programming error or stack trace:
            ${input}
            
            Provide:
            1. A clear summary of what went wrong.
            2. Common causes.
            3. Detailed suggested fixes.
            4. Example code showing the fix.
            
            Format the response in clean Markdown.`
      });
      
      console.log('AI Error Explainer: Analysis complete', { response });
      
      if (!response.text) {
        throw new Error('No response text received from AI');
      }
      
      setOutput(response.text.trim());
    } catch (e: any) {
      console.error('AI Error Explainer Error:', e);
      setError('AI Error: ' + (e.message || 'Unknown error occurred'));
    } finally {
      setLoading(false);
    }
  }, [input]);

  return { input, setInput, output, setOutput, loading, error, process: handleProcess };
}
