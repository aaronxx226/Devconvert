import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { TOOLS } from '../data/tools';
import { ToolPageLayout } from '../components/ToolPageLayout';
import { 
  ToolTextarea,
  useJSONToCSV,
  useCSVToJSON,
  useJSONFormatter,
  useJSONValidator,
  useJSONMinifier,
  useBase64Encoder,
  useBase64Decoder,
  useURLEncoderDecoder,
  useJWTDecoder,
  useTimestampConverter,
  useRegexTester,
  useHTMLBeautifier,
  useSQLFormatter,
  useHTMLToMarkdown,
  useTextToSlug,
  useImageToBase64,
  useJSONErrorFinder,
  useAPIRequestBuilder,
  useJSONToTypeScript,
  useCronGenerator,
  useUUIDGenerator,
  usePasswordHashGenerator,
  useTextDiffChecker,
  DiffViewer,
  useColorConverter,
  useAITool,
  useJWTExpirationChecker,
  useHTTPHeaderAnalyzer,
  useJSONYAMLConverter,
  useMarkdownPreview,
  useExplainMyError,
  Plus,
  X
} from '../components/Tools';

export function ToolPage({ overrideTool, minimal = false }: { overrideTool?: any; minimal?: boolean }) {
  const { slug } = useParams<{ slug: string }>();
  const tool = overrideTool || TOOLS.find(t => t.slug === slug);

  if (!tool) {
    return <Navigate to="/" replace />;
  }

  // Hook selection based on tool ID
  const renderTool = () => {
    switch (tool.id) {
      case 'json-to-csv': return <JSONToCSVTool tool={tool} minimal={minimal} />;
      case 'csv-to-json': return <CSVToJSONTool tool={tool} minimal={minimal} />;
      case 'json-formatter': return <JSONFormatterTool tool={tool} minimal={minimal} />;
      case 'json-validator': return <JSONValidatorTool tool={tool} minimal={minimal} />;
      case 'json-minifier': return <JSONMinifierTool tool={tool} minimal={minimal} />;
      case 'base64-encoder': return <Base64EncoderTool tool={tool} minimal={minimal} />;
      case 'base64-decoder': return <Base64DecoderTool tool={tool} minimal={minimal} />;
      case 'url-encoder-decoder': return <URLEncoderDecoderTool tool={tool} minimal={minimal} />;
      case 'jwt-decoder': return <JWTDecoderTool tool={tool} minimal={minimal} />;
      case 'timestamp-converter': return <TimestampConverterTool tool={tool} minimal={minimal} />;
      case 'regex-tester': return <RegexTesterTool tool={tool} minimal={minimal} />;
      case 'html-beautifier': return <HTMLBeautifierTool tool={tool} minimal={minimal} />;
      case 'sql-formatter': return <SQLFormatterTool tool={tool} minimal={minimal} />;
      case 'html-to-markdown': return <HTMLToMarkdownTool tool={tool} minimal={minimal} />;
      case 'text-to-slug': return <TextToSlugTool tool={tool} minimal={minimal} />;
      case 'image-to-base64': return <ImageToBase64Tool tool={tool} minimal={minimal} />;
      case 'json-error-finder': return <JSONErrorFinderTool tool={tool} minimal={minimal} />;
      case 'api-request-builder': return <APIRequestBuilderTool tool={tool} minimal={minimal} />;
      case 'json-to-typescript': return <JSONToTypeScriptTool tool={tool} minimal={minimal} />;
      case 'cron-generator': return <CronGeneratorTool tool={tool} minimal={minimal} />;
      case 'uuid-generator': return <UUIDGeneratorTool tool={tool} minimal={minimal} />;
      case 'password-hash-generator': return <PasswordHashGeneratorTool tool={tool} minimal={minimal} />;
      case 'text-diff-checker': return <TextDiffCheckerTool tool={tool} minimal={minimal} />;
      case 'color-converter': return <ColorConverterTool tool={tool} minimal={minimal} />;
      case 'ai-regex-generator': return <AITool tool={tool} type="regex" minimal={minimal} />;
      case 'ai-sql-generator': return <AITool tool={tool} type="sql" minimal={minimal} />;
      case 'ai-json-fixer': return <AITool tool={tool} type="json-fix" minimal={minimal} />;
      case 'jwt-expiration-checker': return <JWTExpirationCheckerTool tool={tool} minimal={minimal} />;
      case 'http-header-analyzer': return <HTTPHeaderAnalyzerTool tool={tool} minimal={minimal} />;
      case 'json-yaml-converter': return <JSONYAMLConverterTool tool={tool} minimal={minimal} />;
      case 'markdown-preview': return <MarkdownPreviewTool tool={tool} minimal={minimal} />;
      case 'explain-my-error': return <ExplainMyErrorTool tool={tool} minimal={minimal} />;
      default: return <div>Tool not implemented yet.</div>;
    }
  };

  return renderTool();
}

// Helper for downloads
const downloadFile = (content: string, filename: string, type: string = 'text/plain') => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

// Individual Tool Components using the hooks
function JSONToCSVTool({ tool, minimal }: { tool: any; minimal?: boolean }) {
  const { input, setInput, output, setOutput, error, process } = useJSONToCSV();
  const autoFormat = () => {
    try {
      if (!input.trim()) return;
      const json = JSON.parse(input);
      setInput(JSON.stringify(json, null, 2));
    } catch (e) {}
  };
  const download = () => {
    const blob = new Blob([output], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    a.click();
  };
  return (
    <ToolPageLayout 
      tool={tool} input={input} output={output} error={error} minimal={minimal}
      onProcess={process} onClear={() => { setInput(''); setOutput(''); }}
      onCopy={() => navigator.clipboard.writeText(output)}
      onDownload={() => downloadFile(output, 'data.csv', 'text/csv')}
      onExport={() => downloadFile(output, 'data.csv', 'text/csv')}
      onAutoFormat={autoFormat}
    >
      <div className="flex flex-col md:flex-row gap-6">
        <ToolTextarea label="JSON Input" value={input} onChange={setInput} placeholder='[{"id": 1, "name": "John"}]' />
        <ToolTextarea label="CSV Output" value={output} readOnly placeholder="CSV result will appear here..." />
      </div>
    </ToolPageLayout>
  );
}

function CSVToJSONTool({ tool, minimal }: { tool: any; minimal?: boolean }) {
  const { input, setInput, output, setOutput, error, process } = useCSVToJSON();
  return (
    <ToolPageLayout 
      tool={tool} input={input} output={output} error={error} minimal={minimal}
      onProcess={process} onClear={() => { setInput(''); setOutput(''); }}
      onCopy={() => navigator.clipboard.writeText(output)}
      onDownload={() => downloadFile(output, 'data.json', 'application/json')}
      onExport={() => downloadFile(output, 'data.json', 'application/json')}
    >
      <div className="flex flex-col md:flex-row gap-6">
        <ToolTextarea label="CSV Input" value={input} onChange={setInput} placeholder="id,name\n1,John" />
        <ToolTextarea label="JSON Output" value={output} readOnly placeholder="JSON result will appear here..." />
      </div>
    </ToolPageLayout>
  );
}

function JSONFormatterTool({ tool, minimal }: { tool: any; minimal?: boolean }) {
  const { input, setInput, output, setOutput, error, process } = useJSONFormatter();
  const autoFormat = () => {
    try {
      if (!input.trim()) return;
      const json = JSON.parse(input);
      setInput(JSON.stringify(json, null, 2));
    } catch (e) {}
  };
  return (
    <ToolPageLayout 
      tool={tool} input={input} output={output} error={error} minimal={minimal}
      onProcess={process} onClear={() => { setInput(''); setOutput(''); }}
      onCopy={() => navigator.clipboard.writeText(output)}
      onDownload={() => downloadFile(output, 'formatted.json', 'application/json')}
      onExport={() => downloadFile(output, 'formatted.json', 'application/json')}
      onAutoFormat={autoFormat}
    >
      <div className="flex flex-col md:flex-row gap-6">
        <ToolTextarea label="Minified JSON" value={input} onChange={setInput} placeholder='{"id":1,"name":"John"}' />
        <ToolTextarea label="Beautified JSON" value={output} readOnly placeholder="Formatted JSON will appear here..." />
      </div>
    </ToolPageLayout>
  );
}

function JSONValidatorTool({ tool, minimal }: { tool: any; minimal?: boolean }) {
  const { input, setInput, output, setOutput, error, errorDetails, process } = useJSONValidator();
  const autoFormat = () => {
    try {
      if (!input.trim()) return;
      const json = JSON.parse(input);
      setInput(JSON.stringify(json, null, 2));
    } catch (e) {}
  };
  return (
    <ToolPageLayout 
      tool={tool} input={input} output={output} error={error} minimal={minimal}
      onProcess={process} onClear={() => { setInput(''); setOutput(''); }}
      onCopy={() => navigator.clipboard.writeText(output)}
      onDownload={() => downloadFile(output, 'validation.txt')}
      onExport={() => downloadFile(output, 'validation.txt')}
      onAutoFormat={autoFormat}
    >
      <div className="flex flex-col gap-6">
        <ToolTextarea label="JSON Input" value={input} onChange={setInput} placeholder='{"id":1}' />
        <div className="p-6 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-4 uppercase tracking-wider">Validation Result</h3>
          <div className={`text-lg font-bold mb-2 ${output.includes('Valid JSON ✅') ? 'text-emerald-500' : 'text-rose-500'}`}>
            {output || 'Awaiting input...'}
          </div>
          {errorDetails && (
            <div className="mt-4 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl">
              <p className="text-rose-500 font-medium">Error at Line {errorDetails.line}, Column {errorDetails.column}</p>
              <p className="text-sm text-rose-400 mt-1">Check the syntax around this position.</p>
            </div>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
}

function JSONMinifierTool({ tool, minimal }: { tool: any; minimal?: boolean }) {
  const { input, setInput, output, setOutput, error, process } = useJSONMinifier();
  const autoFormat = () => {
    try {
      if (!input.trim()) return;
      const json = JSON.parse(input);
      setInput(JSON.stringify(json, null, 2));
    } catch (e) {}
  };
  return (
    <ToolPageLayout 
      tool={tool} input={input} output={output} error={error} minimal={minimal}
      onProcess={process} onClear={() => { setInput(''); setOutput(''); }}
      onCopy={() => navigator.clipboard.writeText(output)}
      onDownload={() => downloadFile(output, 'minified.json', 'application/json')}
      onExport={() => downloadFile(output, 'minified.json', 'application/json')}
      onAutoFormat={autoFormat}
    >
      <div className="flex flex-col md:flex-row gap-6">
        <ToolTextarea label="JSON Input" value={input} onChange={setInput} placeholder='{ "id": 1 }' />
        <ToolTextarea label="Minified JSON" value={output} readOnly placeholder="Minified JSON will appear here..." />
      </div>
    </ToolPageLayout>
  );
}

function Base64EncoderTool({ tool, minimal }: { tool: any; minimal?: boolean }) {
  const { input, setInput, output, setOutput, process } = useBase64Encoder();
  return (
    <ToolPageLayout 
      tool={tool} input={input} output={output} minimal={minimal}
      onProcess={process} onClear={() => { setInput(''); setOutput(''); }}
      onCopy={() => navigator.clipboard.writeText(output)}
      onDownload={() => downloadFile(output, 'encoded.txt')}
      onExport={() => downloadFile(output, 'encoded.txt')}
    >
      <div className="flex flex-col md:flex-row gap-6">
        <ToolTextarea label="Plain Text" value={input} onChange={setInput} placeholder="Enter text to encode..." />
        <ToolTextarea label="Base64 Output" value={output} readOnly placeholder="Base64 result will appear here..." />
      </div>
    </ToolPageLayout>
  );
}

function Base64DecoderTool({ tool, minimal }: { tool: any; minimal?: boolean }) {
  const { input, setInput, output, setOutput, error, process } = useBase64Decoder();
  return (
    <ToolPageLayout 
      tool={tool} input={input} output={output} error={error} minimal={minimal}
      onProcess={process} onClear={() => { setInput(''); setOutput(''); }}
      onCopy={() => navigator.clipboard.writeText(output)}
      onDownload={() => downloadFile(output, 'decoded.txt')}
      onExport={() => downloadFile(output, 'decoded.txt')}
    >
      <div className="flex flex-col md:flex-row gap-6">
        <ToolTextarea label="Base64 Input" value={input} onChange={setInput} placeholder="Enter Base64 string..." />
        <ToolTextarea label="Plain Text Output" value={output} readOnly placeholder="Decoded text will appear here..." />
      </div>
    </ToolPageLayout>
  );
}

function URLEncoderDecoderTool({ tool, minimal }: { tool: any; minimal?: boolean }) {
  const { input, setInput, output, setOutput, mode, setMode, process } = useURLEncoderDecoder();
  return (
    <ToolPageLayout 
      tool={tool} input={input} output={output} minimal={minimal}
      onProcess={process} onClear={() => { setInput(''); setOutput(''); }}
      onCopy={() => navigator.clipboard.writeText(output)}
      onDownload={() => downloadFile(output, 'url-result.txt')}
      onExport={() => downloadFile(output, 'url-result.txt')}
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg w-fit">
          <button 
            onClick={() => setMode('encode')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${mode === 'encode' ? 'bg-white dark:bg-zinc-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-zinc-500'}`}
          >
            Encode
          </button>
          <button 
            onClick={() => setMode('decode')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${mode === 'decode' ? 'bg-white dark:bg-zinc-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-zinc-500'}`}
          >
            Decode
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <ToolTextarea label="Input" value={input} onChange={setInput} placeholder="Enter URL or text..." />
          <ToolTextarea label="Output" value={output} readOnly placeholder="Result will appear here..." />
        </div>
      </div>
    </ToolPageLayout>
  );
}

function JWTDecoderTool({ tool, minimal }: { tool: any; minimal?: boolean }) {
  const { input, setInput, output, setOutput, error, process } = useJWTDecoder();
  return (
    <ToolPageLayout 
      tool={tool} input={input} output={output} error={error} minimal={minimal}
      onProcess={process} onClear={() => { setInput(''); setOutput(''); }}
      onCopy={() => navigator.clipboard.writeText(output)}
      onDownload={() => downloadFile(output, 'jwt-payload.json', 'application/json')}
      onExport={() => downloadFile(output, 'jwt-payload.json', 'application/json')}
    >
      <div className="flex flex-col md:flex-row gap-6">
        <ToolTextarea label="JWT Token" value={input} onChange={setInput} placeholder="Paste your JWT token here..." />
        <ToolTextarea label="Decoded Payload" value={output} readOnly placeholder="Decoded JWT will appear here..." />
      </div>
    </ToolPageLayout>
  );
}

function TimestampConverterTool({ tool, minimal }: { tool: any; minimal?: boolean }) {
  const { input, setInput, output, setOutput, error, process } = useTimestampConverter();
  return (
    <ToolPageLayout 
      tool={tool} input={input} output={output} error={error} minimal={minimal}
      onProcess={process} onClear={() => { setInput(''); setOutput(''); }}
      onCopy={() => navigator.clipboard.writeText(output)}
      onDownload={() => downloadFile(output, 'timestamp.txt')}
      onExport={() => downloadFile(output, 'timestamp.txt')}
    >
      <div className="flex flex-col md:flex-row gap-6">
        <ToolTextarea label="Timestamp or Date String" value={input} onChange={setInput} placeholder="e.g. 1709654400 or 2024-03-05" />
        <ToolTextarea label="Converted Result" value={output} readOnly placeholder="Result will appear here..." />
      </div>
    </ToolPageLayout>
  );
}

function RegexTesterTool({ tool, minimal }: { tool: any; minimal?: boolean }) {
  const { input, setInput, regex, setRegex, flags, setFlags, output, setOutput, error, process } = useRegexTester();
  return (
    <ToolPageLayout 
      tool={tool} input={input} output={output} error={error} minimal={minimal}
      onProcess={process} onClear={() => { setInput(''); setRegex(''); setOutput(''); }}
      onCopy={() => navigator.clipboard.writeText(output)}
      onDownload={() => downloadFile(output, 'regex-results.txt')}
      onExport={() => downloadFile(output, 'regex-results.txt')}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2 block">Regular Expression</label>
            <input 
              type="text" 
              value={regex} 
              onChange={(e) => setRegex(e.target.value)}
              placeholder="e.g. ([a-z]+)"
              className="w-full p-3 font-mono text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:border-indigo-500 outline-none dark:text-white"
            />
          </div>
          <div className="w-32">
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2 block">Flags</label>
            <input 
              type="text" 
              value={flags} 
              onChange={(e) => setFlags(e.target.value)}
              placeholder="g, i, m"
              className="w-full p-3 font-mono text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:border-indigo-500 outline-none dark:text-white"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <ToolTextarea label="Sample Text" value={input} onChange={setInput} placeholder="Enter text to test against..." />
          <ToolTextarea label="Match Results" value={output} readOnly placeholder="Matches will appear here..." />
        </div>
      </div>
    </ToolPageLayout>
  );
}

function HTMLBeautifierTool({ tool, minimal }: { tool: any; minimal?: boolean }) {
  const { input, setInput, output, setOutput, error, process } = useHTMLBeautifier();
  return (
    <ToolPageLayout 
      tool={tool} input={input} output={output} error={error} minimal={minimal}
      onProcess={process} onClear={() => { setInput(''); setOutput(''); }}
      onCopy={() => navigator.clipboard.writeText(output)}
      onDownload={() => downloadFile(output, 'formatted.html', 'text/html')}
      onExport={() => downloadFile(output, 'formatted.html', 'text/html')}
      onAutoFormat={process} // For beautifier, process is auto-format
    >
      <div className="flex flex-col md:flex-row gap-6">
        <ToolTextarea label="Messy HTML" value={input} onChange={setInput} placeholder="<div><h1>Title</h1></div>" />
        <ToolTextarea label="Beautified HTML" value={output} readOnly placeholder="Formatted HTML will appear here..." />
      </div>
    </ToolPageLayout>
  );
}

function SQLFormatterTool({ tool, minimal }: { tool: any; minimal?: boolean }) {
  const { input, setInput, output, setOutput, error, process } = useSQLFormatter();
  return (
    <ToolPageLayout 
      tool={tool} input={input} output={output} error={error} minimal={minimal}
      onProcess={process} onClear={() => { setInput(''); setOutput(''); }}
      onCopy={() => navigator.clipboard.writeText(output)}
      onDownload={() => downloadFile(output, 'formatted.sql', 'application/sql')}
      onExport={() => downloadFile(output, 'formatted.sql', 'application/sql')}
      onAutoFormat={process} // For formatter, process is auto-format
    >
      <div className="flex flex-col md:flex-row gap-6">
        <ToolTextarea label="Raw SQL" value={input} onChange={setInput} placeholder="SELECT * FROM users WHERE id = 1" />
        <ToolTextarea label="Formatted SQL" value={output} readOnly placeholder="Formatted SQL will appear here..." />
      </div>
    </ToolPageLayout>
  );
}

function HTMLToMarkdownTool({ tool, minimal }: { tool: any; minimal?: boolean }) {
  const { input, setInput, output, setOutput, process } = useHTMLToMarkdown();
  return (
    <ToolPageLayout 
      tool={tool} input={input} output={output} minimal={minimal}
      onProcess={process} onClear={() => { setInput(''); setOutput(''); }}
      onCopy={() => navigator.clipboard.writeText(output)}
      onDownload={() => downloadFile(output, 'converted.md')}
      onExport={() => downloadFile(output, 'converted.md')}
    >
      <div className="flex flex-col md:flex-row gap-6">
        <ToolTextarea label="HTML Input" value={input} onChange={setInput} placeholder="<h1>Hello</h1>" />
        <ToolTextarea label="Markdown Output" value={output} readOnly placeholder="Markdown result will appear here..." />
      </div>
    </ToolPageLayout>
  );
}

function TextToSlugTool({ tool, minimal }: { tool: any; minimal?: boolean }) {
  const { input, setInput, output, setOutput, process } = useTextToSlug();
  return (
    <ToolPageLayout 
      tool={tool} input={input} output={output} minimal={minimal}
      onProcess={process} onClear={() => { setInput(''); setOutput(''); }}
      onCopy={() => navigator.clipboard.writeText(output)}
      onDownload={() => downloadFile(output, 'slug.txt')}
      onExport={() => downloadFile(output, 'slug.txt')}
    >
      <div className="flex flex-col md:flex-row gap-6">
        <ToolTextarea label="Text Input" value={input} onChange={setInput} placeholder="Enter text to slugify..." />
        <ToolTextarea label="Slug Output" value={output} readOnly placeholder="Slug will appear here..." />
      </div>
    </ToolPageLayout>
  );
}

function ImageToBase64Tool({ tool, minimal }: { tool: any; minimal?: boolean }) {
  const { output, setOutput, preview, setPreview, handleFile } = useImageToBase64();
  return (
    <ToolPageLayout 
      tool={tool} input="" output={output} minimal={minimal}
      onProcess={() => {}} onClear={() => { setOutput(''); setPreview(''); }}
      onCopy={() => navigator.clipboard.writeText(output)}
      onDownload={() => downloadFile(output, 'base64.txt')}
      onExport={() => downloadFile(output, 'base64.txt')}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl p-12 transition-all hover:border-indigo-500 group">
          <input type="file" onChange={handleFile} className="hidden" id="image-upload" accept="image/*" />
          <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-4">
            <div className="p-4 bg-indigo-500/10 rounded-full text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-all">
              <tool.icon size={32} />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-zinc-900 dark:text-white">Click to upload image</p>
              <p className="text-sm text-zinc-500">PNG, JPG, GIF or WebP (Max 5MB)</p>
            </div>
          </label>
        </div>
        {preview && (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2 block">Preview</label>
              <div className="w-full h-64 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center p-4">
                <img src={preview} alt="Preview" className="max-w-full max-h-full object-contain rounded-lg" />
              </div>
            </div>
            <ToolTextarea label="Base64 Data URI" value={output} readOnly placeholder="Base64 string will appear here..." />
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}

function JSONErrorFinderTool({ tool, minimal }: { tool: any; minimal?: boolean }) {
  const { input, setInput, output, error, errorPos, process } = useJSONErrorFinder();
  const autoFormat = () => {
    try {
      if (!input.trim()) return;
      const json = JSON.parse(input);
      setInput(JSON.stringify(json, null, 2));
    } catch (e) {}
  };
  return (
    <ToolPageLayout 
      tool={tool} input={input} output={output} error={error} minimal={minimal}
      onProcess={process} onClear={() => { setInput(''); }}
      onCopy={() => navigator.clipboard.writeText(output)}
      onDownload={() => downloadFile(output, 'json-errors.txt')}
      onExport={() => downloadFile(output, 'json-errors.txt')}
      onAutoFormat={autoFormat}
    >
      <div className="flex flex-col gap-6">
        <ToolTextarea label="JSON Input" value={input} onChange={setInput} placeholder='Paste JSON with errors here...' error={!!errorPos} />
        <div className="p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <p className={`text-sm font-medium ${error ? 'text-red-500' : 'text-green-500'}`}>
            {output}
          </p>
          {errorPos && (
            <p className="text-xs text-zinc-500 mt-1">
              Check line {errorPos.line}, column {errorPos.col}
            </p>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
}

function APIRequestBuilderTool({ tool, minimal }: { tool: any; minimal?: boolean }) {
  const { url, setUrl, method, setMethod, headers, addHeader, removeHeader, updateHeader, body, setBody, output, process } = useAPIRequestBuilder();
  return (
    <ToolPageLayout 
      tool={tool} input={url} output={output} minimal={minimal}
      onProcess={process} onClear={() => { setUrl(''); setBody(''); }}
      onCopy={() => navigator.clipboard.writeText(output)}
      onDownload={() => downloadFile(output, 'api-request.txt')}
      onExport={() => downloadFile(output, 'api-request.txt')}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-4">
          <select 
            value={method} 
            onChange={(e) => setMethod(e.target.value)}
            className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:border-indigo-500 outline-none dark:text-white font-semibold"
          >
            {['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <input 
            type="text" 
            value={url} 
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://api.example.com/v1/resource"
            className="flex-1 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:border-indigo-500 outline-none dark:text-white"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Headers</h3>
            <button onClick={addHeader} className="text-xs flex items-center gap-1 text-indigo-500 hover:text-indigo-600">
              <Plus size={14} /> Add Header
            </button>
          </div>
          <div className="space-y-2">
            {headers.map((h, i) => (
              <div key={i} className="flex gap-2">
                <input 
                  type="text" value={h.key} onChange={(e) => updateHeader(i, 'key', e.target.value)} placeholder="Key"
                  className="flex-1 p-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 outline-none dark:text-white"
                />
                <input 
                  type="text" value={h.value} onChange={(e) => updateHeader(i, 'value', e.target.value)} placeholder="Value"
                  className="flex-1 p-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 outline-none dark:text-white"
                />
                <button onClick={() => removeHeader(i)} className="p-2 text-zinc-400 hover:text-red-500">
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {method !== 'GET' && (
          <ToolTextarea label="Request Body" value={body} onChange={setBody} placeholder='{ "key": "value" }' />
        )}

        <ToolTextarea label="Generated Code Snippets" value={output} readOnly placeholder="Code snippets will appear here..." />
      </div>
    </ToolPageLayout>
  );
}

function JSONToTypeScriptTool({ tool, minimal }: { tool: any; minimal?: boolean }) {
  const { input, setInput, output, error, process } = useJSONToTypeScript();
  const autoFormat = () => {
    try {
      if (!input.trim()) return;
      const json = JSON.parse(input);
      setInput(JSON.stringify(json, null, 2));
    } catch (e) {}
  };
  return (
    <ToolPageLayout 
      tool={tool} input={input} output={output} error={error} minimal={minimal}
      onProcess={process} onClear={() => { setInput(''); }}
      onCopy={() => navigator.clipboard.writeText(output)}
      onDownload={() => downloadFile(output, 'types.ts')}
      onExport={() => downloadFile(output, 'types.ts')}
      onAutoFormat={autoFormat}
    >
      <div className="flex flex-col md:flex-row gap-6">
        <ToolTextarea label="JSON Input" value={input} onChange={setInput} placeholder='Paste JSON here...' />
        <ToolTextarea label="TypeScript Interfaces" value={output} readOnly placeholder="Interfaces will appear here..." />
      </div>
    </ToolPageLayout>
  );
}

function CronGeneratorTool({ tool, minimal }: { tool: any; minimal?: boolean }) {
  const { input, setInput, output, setOutput, error, process } = useCronGenerator();
  return (
    <ToolPageLayout 
      tool={tool} input={input} output={output} error={error} minimal={minimal}
      onProcess={process} onClear={() => { setInput(''); setOutput(''); }}
      onCopy={() => navigator.clipboard.writeText(input)}
      onDownload={() => downloadFile(input, 'cron.txt')}
      onExport={() => downloadFile(input, 'cron.txt')}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Cron Expression</label>
          <input 
            type="text" value={input} onChange={(e) => setInput(e.target.value)}
            placeholder="0 0 * * *"
            className="w-full p-4 font-mono text-lg rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:border-indigo-500 outline-none dark:text-white"
          />
        </div>
        <div className="p-6 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
          <h3 className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-2 uppercase tracking-wider">Human Readable</h3>
          <p className="text-xl font-medium text-zinc-900 dark:text-white">{output}</p>
        </div>
      </div>
    </ToolPageLayout>
  );
}

function UUIDGeneratorTool({ tool, minimal }: { tool: any; minimal?: boolean }) {
  const { count, setCount, version, setVersion, output, setOutput, process } = useUUIDGenerator();
  return (
    <ToolPageLayout 
      tool={tool} input={count} output={output} minimal={minimal}
      onProcess={process} onClear={() => { setCount('1'); setOutput(''); }}
      onCopy={() => navigator.clipboard.writeText(output)}
      onDownload={() => downloadFile(output, 'uuids.txt')}
      onExport={() => downloadFile(output, 'uuids.txt')}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2 block">Number of UUIDs</label>
            <input 
              type="number" value={count} onChange={(e) => setCount(e.target.value)}
              className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:border-indigo-500 outline-none dark:text-white"
            />
          </div>
          <div className="flex-1">
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2 block">Version</label>
            <select 
              value={version} onChange={(e) => setVersion(e.target.value as 'v1' | 'v4')}
              className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:border-indigo-500 outline-none dark:text-white"
            >
              <option value="v4">Version 4 (Random)</option>
              <option value="v1">Version 1 (Timestamp)</option>
            </select>
          </div>
        </div>
        <ToolTextarea label="Generated UUIDs" value={output} readOnly placeholder="UUIDs will appear here..." />
      </div>
    </ToolPageLayout>
  );
}

function PasswordHashGeneratorTool({ tool, minimal }: { tool: any; minimal?: boolean }) {
  const { input, setInput, algorithm, setAlgorithm, output, setOutput, process } = usePasswordHashGenerator();
  return (
    <ToolPageLayout 
      tool={tool} input={input} output={output} minimal={minimal}
      onProcess={process} onClear={() => { setInput(''); setOutput(''); }}
      onCopy={() => navigator.clipboard.writeText(output)}
      onDownload={() => downloadFile(output, 'hash.txt')}
      onExport={() => downloadFile(output, 'hash.txt')}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Algorithm</label>
          <div className="flex flex-wrap gap-2">
            {['MD5', 'SHA-1', 'SHA-256', 'SHA-512'].map(alg => (
              <button 
                key={alg}
                onClick={() => setAlgorithm(alg as any)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${algorithm === alg ? 'bg-indigo-500 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'}`}
              >
                {alg}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <ToolTextarea label="Input Text" value={input} onChange={setInput} placeholder="Enter text to hash..." />
          <ToolTextarea label="Hash Output" value={output} readOnly placeholder="Hash will appear here..." />
        </div>
      </div>
    </ToolPageLayout>
  );
}

function TextDiffCheckerTool({ tool, minimal }: { tool: any; minimal?: boolean }) {
  const { text1, setText1, text2, setText2, diffResult, process } = useTextDiffChecker();
  return (
    <ToolPageLayout 
      tool={tool} input={text1} output={diffResult.length > 0 ? 'Diff generated' : ''} minimal={minimal}
      onProcess={process} onClear={() => { setText1(''); setText2(''); }}
      onCopy={() => {
        const text = diffResult.map(c => (c.added ? '+ ' : c.removed ? '- ' : '  ') + c.value).join('');
        navigator.clipboard.writeText(text);
      }}
      onDownload={() => {
        const text = diffResult.map(c => (c.added ? '+ ' : c.removed ? '- ' : '  ') + c.value).join('');
        downloadFile(text, 'diff.txt');
      }}
    >
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ToolTextarea label="Original Text" value={text1} onChange={setText1} placeholder="Paste original text here..." />
          <ToolTextarea label="Modified Text" value={text2} onChange={setText2} placeholder="Paste modified text here..." />
        </div>
        
        {diffResult.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Visual Comparison</h3>
            <DiffViewer changes={diffResult} />
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}

function ColorConverterTool({ tool, minimal }: { tool: any; minimal?: boolean }) {
  const { input, setInput, output, setOutput, process } = useColorConverter();
  return (
    <ToolPageLayout 
      tool={tool} input={input} output={output} minimal={minimal}
      onProcess={process} onClear={() => { setInput('#6366f1'); setOutput(''); }}
      onCopy={() => navigator.clipboard.writeText(output)}
      onDownload={() => downloadFile(output, 'colors.txt')}
      onExport={() => downloadFile(output, 'colors.txt')}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 w-full">
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2 block">HEX Color</label>
            <div className="flex gap-4">
              <input 
                type="text" value={input} onChange={(e) => setInput(e.target.value)}
                placeholder="#6366f1"
                className="flex-1 p-4 font-mono text-lg rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:border-indigo-500 outline-none dark:text-white"
              />
              <input 
                type="color" value={input.startsWith('#') ? input : '#6366f1'} onChange={(e) => setInput(e.target.value)}
                className="w-16 h-16 p-1 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 cursor-pointer"
              />
            </div>
          </div>
          <div className="w-full md:w-64 h-32 rounded-2xl shadow-lg border border-white/10" style={{ backgroundColor: input }}>
            <div className="w-full h-full flex items-center justify-center bg-black/10 backdrop-blur-[2px] rounded-2xl">
              <span className="text-white font-mono font-bold drop-shadow-md">{input}</span>
            </div>
          </div>
        </div>
        <ToolTextarea label="Converted Values" value={output} readOnly placeholder="RGB and HSL values will appear here..." />
      </div>
    </ToolPageLayout>
  );
}

function AITool({ tool, type, minimal }: { tool: any, type: 'regex' | 'sql' | 'json-fix', minimal?: boolean }) {
  const { input, setInput, output, loading, error, process } = useAITool(type);
  return (
    <ToolPageLayout 
      tool={tool} input={input} output={output} error={error} minimal={minimal}
      onProcess={process} onClear={() => { setInput(''); }}
      onCopy={() => navigator.clipboard.writeText(output)}
      onDownload={() => downloadFile(output, `${type}-result.txt`)}
      onExport={() => downloadFile(output, `${type}-result.txt`)}
    >
      <div className="flex flex-col gap-6">
        <div className="relative">
          <ToolTextarea 
            label={type === 'regex' ? 'Describe the pattern' : type === 'sql' ? 'Describe the query' : 'Paste broken JSON'} 
            value={input} onChange={setInput} 
            placeholder={type === 'regex' ? 'Match an email address' : type === 'sql' ? 'Select all users over 18' : '{ name: "John" }'} 
          />
          {loading && (
            <div className="absolute inset-0 bg-white/50 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-xl z-10">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">AI is thinking...</p>
              </div>
            </div>
          )}
        </div>
        <ToolTextarea label="AI Generated Result" value={output} readOnly placeholder="AI result will appear here..." />
      </div>
    </ToolPageLayout>
  );
}

function JWTExpirationCheckerTool({ tool, minimal }: { tool: any; minimal?: boolean }) {
  const { input, setInput, output, setOutput, error, process } = useJWTExpirationChecker();
  return (
    <ToolPageLayout 
      tool={tool} input={input} output={output} error={error} minimal={minimal}
      onProcess={process} onClear={() => { setInput(''); setOutput(''); }}
      onCopy={() => navigator.clipboard.writeText(output)}
      onDownload={() => downloadFile(output, 'jwt-expiration.txt')}
      onExport={() => downloadFile(output, 'jwt-expiration.txt')}
    >
      <div className="flex flex-col md:flex-row gap-6">
        <ToolTextarea label="JWT Token" value={input} onChange={setInput} placeholder="Paste JWT token here..." />
        <ToolTextarea label="Expiration Info" value={output} readOnly placeholder="Expiration details will appear here..." />
      </div>
    </ToolPageLayout>
  );
}

function HTTPHeaderAnalyzerTool({ tool, minimal }: { tool: any; minimal?: boolean }) {
  const { url, setUrl, output, setOutput, loading, error, process } = useHTTPHeaderAnalyzer();
  return (
    <ToolPageLayout 
      tool={tool} input={url} output={output} error={error} minimal={minimal}
      onProcess={process} onClear={() => { setUrl(''); setOutput(''); }}
      onCopy={() => navigator.clipboard.writeText(output)}
      onDownload={() => downloadFile(output, 'headers.txt')}
      onExport={() => downloadFile(output, 'headers.txt')}
    >
      <div className="flex flex-col gap-6">
        <div className="relative">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2 block">Target URL</label>
          <input 
            type="text" value={url} onChange={(e) => setUrl(e.target.value)}
            placeholder="https://api.example.com"
            className="w-full p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:border-indigo-500 outline-none dark:text-white"
          />
          {loading && (
            <div className="absolute inset-0 bg-white/50 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-xl z-10">
              <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        <ToolTextarea label="Response Headers" value={output} readOnly placeholder="Headers will appear here..." />
      </div>
    </ToolPageLayout>
  );
}

function JSONYAMLConverterTool({ tool, minimal }: { tool: any; minimal?: boolean }) {
  const { input, setInput, output, setOutput, error, mode, setMode, process } = useJSONYAMLConverter();
  return (
    <ToolPageLayout 
      tool={tool} input={input} output={output} error={error} minimal={minimal}
      onProcess={process} onClear={() => { setInput(''); setOutput(''); }}
      onCopy={() => navigator.clipboard.writeText(output)}
      onDownload={() => downloadFile(output, mode === 'json-to-yaml' ? 'data.yaml' : 'data.json')}
      onExport={() => downloadFile(output, mode === 'json-to-yaml' ? 'data.yaml' : 'data.json')}
    >
      <div className="flex flex-col gap-6">
        <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-xl w-fit">
          <button 
            onClick={() => setMode('json-to-yaml')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'json-to-yaml' ? 'bg-white dark:bg-zinc-800 text-indigo-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
          >
            JSON to YAML
          </button>
          <button 
            onClick={() => setMode('yaml-to-json')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'yaml-to-json' ? 'bg-white dark:bg-zinc-800 text-indigo-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
          >
            YAML to JSON
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <ToolTextarea 
            label={mode === 'json-to-yaml' ? 'JSON Input' : 'YAML Input'} 
            value={input} onChange={setInput} 
            placeholder={mode === 'json-to-yaml' ? '{"key": "value"}' : 'key: value'} 
          />
          <ToolTextarea 
            label={mode === 'json-to-yaml' ? 'YAML Output' : 'JSON Output'} 
            value={output} readOnly 
            placeholder="Result will appear here..." 
          />
        </div>
      </div>
    </ToolPageLayout>
  );
}

function MarkdownPreviewTool({ tool, minimal }: { tool: any; minimal?: boolean }) {
  const { input, setInput } = useMarkdownPreview();
  return (
    <ToolPageLayout 
      tool={tool} input={input} output={input} minimal={minimal}
      onProcess={() => {}} onClear={() => setInput('')}
      onCopy={() => navigator.clipboard.writeText(input)}
      onDownload={() => downloadFile(input, 'document.md')}
      onExport={() => downloadFile(input, 'document.md')}
    >
      <div className="flex flex-col md:flex-row gap-6 h-[600px]">
        <div className="flex-1 flex flex-col gap-2">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Markdown Editor</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-4 font-mono text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:border-indigo-500 outline-none dark:text-zinc-200 resize-none"
            placeholder="Write markdown here..."
          />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Live Preview</label>
          <div className="flex-1 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-auto prose dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{input}</ReactMarkdown>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}

function ExplainMyErrorTool({ tool, minimal }: { tool: any; minimal?: boolean }) {
  const { input, setInput, output, loading, error, process } = useExplainMyError();
  
  const examples = [
    { name: 'JS ReferenceError', code: 'ReferenceError: x is not defined\n    at Object.<anonymous> (index.js:1:13)' },
    { name: 'Python IndexError', code: 'IndexError: list index out of range\n  File "main.py", line 3, in <module>\n    print(my_list[10])' },
    { name: 'React Hook Error', code: 'Error: Invalid hook call. Hooks can only be called inside of the body of a function component.' },
    { name: 'SQL Syntax Error', code: 'ERROR: syntax error at or near "FROM"\nLINE 1: SELECT * FROM FROM users;' },
  ];

  return (
    <ToolPageLayout 
      tool={tool} input={input} output={output} error={error} minimal={minimal}
      onProcess={process} onClear={() => { setInput(''); }}
      onCopy={() => navigator.clipboard.writeText(output)}
      onDownload={() => downloadFile(output, 'explanation.md')}
      onExport={() => downloadFile(output, 'explanation.md')}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap gap-2">
          {examples.map((ex, i) => (
            <button
              key={i}
              onClick={() => setInput(ex.code)}
              className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-xs font-medium rounded-lg border border-indigo-100 dark:border-indigo-800/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
            >
              {ex.name}
            </button>
          ))}
        </div>
        <div className="relative">
          <ToolTextarea 
            label="Paste your error or stack trace" 
            value={input} onChange={setInput} 
            placeholder="ReferenceError: x is not defined..." 
          />
          {loading && (
            <div className="absolute inset-0 bg-white/50 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-xl z-10">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">AI is analyzing...</p>
              </div>
            </div>
          )}
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">AI Explanation</label>
          <div className="w-full min-h-[400px] p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 prose dark:prose-invert max-w-none">
            {output ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{output}</ReactMarkdown>
            ) : (
              <p className="text-zinc-400 italic">AI explanation will appear here...</p>
            )}
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
