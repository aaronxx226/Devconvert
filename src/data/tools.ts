import { 
  FileJson, 
  FileSpreadsheet, 
  Braces, 
  CheckCircle, 
  Hash, 
  Link, 
  Key, 
  Type, 
  Image as ImageIcon,
  Code,
  Clock,
  SearchCode,
  Minimize2,
  Database,
  FileCode,
  Terminal,
  Globe,
  AlertTriangle,
  RefreshCw,
  FileText
} from 'lucide-react';

export interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  metaDescription: string;
  icon: any;
  category: 'json' | 'encoding' | 'text' | 'web' | 'data' | 'time' | 'debug' | 'ai' | 'image';
  explanation: string;
  faqs: { q: string; a: string }[];
  exampleInput?: string;
  featured?: boolean;
}

export const TOOLS: Tool[] = [
  {
    id: 'explain-my-error',
    name: 'Explain My Error',
    slug: 'explain-my-error',
    description: 'Paste your programming error or stack trace and get a clear explanation and fix.',
    metaDescription: 'Debug programming errors instantly with AI. Get explanations, causes, and suggested fixes for JavaScript, Python, SQL, and more.',
    icon: AlertTriangle,
    category: 'ai',
    explanation: 'Explain My Error is an AI-powered debugging assistant. It analyzes complex stack traces and cryptic error messages to provide a human-readable summary, detailed explanation, common causes, and actionable fixes with code snippets.',
    faqs: [
      { q: 'Which languages are supported?', a: 'It supports JavaScript, Node.js, Python, SQL, React, CSS, and many other popular programming languages and frameworks.' },
      { q: 'Can it fix the code for me?', a: 'It provides suggested fixes and corrected code snippets that you can apply to your project.' }
    ],
    exampleInput: 'TypeError: Cannot read property "map" of undefined\n    at UserList.render (UserList.js:15:24)',
    featured: true
  },
  {
    id: 'json-to-csv',
    name: 'JSON to CSV',
    slug: 'json-to-csv',
    description: 'Convert JSON data to CSV format easily.',
    metaDescription: 'Free online tool to convert JSON arrays to CSV files. Fast, secure, and runs entirely in your browser.',
    icon: FileSpreadsheet,
    category: 'json',
    explanation: 'JSON to CSV converter is a utility that transforms structured JSON data into a Comma Separated Values (CSV) format. This is particularly useful for data analysts and developers who need to import JSON data into spreadsheet software like Microsoft Excel or Google Sheets.',
    faqs: [
      { q: 'What kind of JSON is supported?', a: 'The tool expects an array of objects. Each object represents a row, and the keys represent the column headers.' },
      { q: 'Is my data uploaded to a server?', a: 'No, all processing happens locally in your browser using JavaScript. Your data never leaves your computer.' },
      { q: 'What is JSON?', a: 'JSON (JavaScript Object Notation) is a lightweight data-interchange format that is easy for humans to read and write and easy for machines to parse and generate.' }
    ],
    exampleInput: '[{"id": 1, "name": "John Doe", "email": "john@example.com"}, {"id": 2, "name": "Jane Smith", "email": "jane@example.com"}]'
  },
  {
    id: 'csv-to-json',
    name: 'CSV to JSON',
    slug: 'csv-to-json',
    description: 'Convert CSV data to JSON format.',
    metaDescription: 'Easily convert CSV files or raw text to JSON format. Perfect for developers and data processing.',
    icon: FileJson,
    category: 'json',
    explanation: 'CSV to JSON converter allows you to take flat data from a CSV file and turn it into a structured JSON array. This makes it easy to use CSV data in web applications or APIs.',
    faqs: [
      { q: 'Does it handle headers?', a: 'Yes, the first row of your CSV is automatically used as the keys for the resulting JSON objects.' }
    ],
    exampleInput: 'id,name,email\n1,John Doe,john@example.com\n2,Jane Smith,jane@example.com'
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    slug: 'json-formatter',
    description: 'Beautify and format messy JSON code.',
    metaDescription: 'Clean up and prettify your JSON code with our free online JSON formatter. Makes minified JSON readable.',
    icon: Braces,
    category: 'json',
    explanation: 'JSON Formatter (or Prettifier) takes minified or poorly formatted JSON and adds indentation and line breaks to make it human-readable. It helps developers debug data structures more efficiently.',
    faqs: [
      { q: 'What is the default indentation?', a: 'We use a standard 2-space indentation for maximum readability.' },
      { q: 'Can it handle large files?', a: 'Yes, it can handle large JSON strings, though performance depends on your browser\'s memory.' },
      { q: 'Why use JSON Formatter?', a: 'JSON Formatter makes minified or messy JSON code readable by adding proper indentation and line breaks, which is essential for debugging.' },
      { q: 'Is my data private?', a: 'Yes, DevConvert processes all data client-side. Your JSON code never leaves your browser.' }
    ],
    exampleInput: '{"user":{"id":1,"name":"John","meta":{"login":"jdoe","active":true}}}',
    featured: true
  },
  {
    id: 'json-validator',
    name: 'JSON Validator',
    slug: 'json-validator',
    description: 'Check if your JSON is valid and find errors.',
    metaDescription: 'Validate your JSON syntax online. Get detailed error messages to find and fix broken JSON code instantly.',
    icon: CheckCircle,
    category: 'json',
    explanation: 'JSON Validator checks your JSON string against the official JSON specification. If your JSON is invalid, it provides the exact line and character where the error occurred.',
    faqs: [
      { q: 'Why is my JSON invalid?', a: 'Common errors include missing commas, unquoted keys, or trailing commas in arrays/objects.' }
    ],
    exampleInput: '{"id": 1, "name": "John", "valid": true}'
  },
  {
    id: 'json-minifier',
    name: 'JSON Minifier',
    slug: 'json-minifier',
    description: 'Minify JSON by removing whitespace.',
    metaDescription: 'Compress your JSON code by removing all unnecessary whitespace and line breaks. Ideal for reducing payload size.',
    icon: Minimize2,
    category: 'json',
    explanation: 'JSON Minifier removes all whitespace, tabs, and newlines from your JSON string. This reduces the file size, which is beneficial for optimizing API responses and reducing network latency.',
    faqs: [
      { q: 'Does minification change the data?', a: 'No, it only removes non-essential characters. The data structure remains identical.' }
    ],
    exampleInput: '{\n  "id": 1,\n  "name": "John",\n  "active": true\n}'
  },
  {
    id: 'base64-encoder',
    name: 'Base64 Encoder',
    slug: 'base64-encoder',
    description: 'Encode text to Base64 format.',
    metaDescription: 'Convert plain text to Base64 encoding online. Secure and fast binary-to-text encoding tool.',
    icon: Hash,
    category: 'encoding',
    explanation: 'Base64 encoding schemes are used when there is a need to encode binary data that needs to be stored and transferred over media that are designed to deal with textual data. This ensures that the data remains intact without modification during transport.',
    faqs: [
      { q: 'What is Base64 used for?', a: 'It\'s commonly used to embed image data in CSS or HTML, or to transmit data in environments that only support text.' }
    ],
    exampleInput: 'DevConvert is awesome!'
  },
  {
    id: 'base64-decoder',
    name: 'Base64 Decoder',
    slug: 'base64-decoder',
    description: 'Decode Base64 strings back to text.',
    metaDescription: 'Decode Base64 strings back to readable plain text instantly. 100% client-side decoding.',
    icon: Hash,
    category: 'encoding',
    explanation: 'Base64 Decoder takes a Base64 encoded string and converts it back to its original UTF-8 text format.',
    faqs: [
      { q: 'Can it decode images?', a: 'This specific tool is for text. For images, use a dedicated Base64 to Image converter.' }
    ],
    exampleInput: 'RGV2Q29udmVydCBpcyBhd2Vzb21lIQ=='
  },
  {
    id: 'url-encoder-decoder',
    name: 'URL Encoder / Decoder',
    slug: 'url-encoder-decoder',
    description: 'Encode or decode URLs safely.',
    metaDescription: 'Safely encode or decode URL parameters. Handles special characters and percent-encoding correctly.',
    icon: Link,
    category: 'encoding',
    explanation: 'URL encoding, also known as percent-encoding, is a mechanism for encoding information in a Uniform Resource Identifier (URI). Characters that are not allowed in a URL must be encoded.',
    faqs: [
      { q: 'Why do I need to encode URLs?', a: 'URLs can only contain a limited set of characters from the US-ASCII character set. Other characters must be encoded.' }
    ],
    exampleInput: 'https://example.com/search?q=hello world & special characters'
  },
  {
    id: 'jwt-decoder',
    name: 'JWT Decoder',
    slug: 'jwt-decoder',
    description: 'Decode JSON Web Tokens and display contents.',
    metaDescription: 'Decode JWT tokens online. View header, payload, and signature information without a secret key.',
    icon: Key,
    category: 'encoding',
    explanation: 'JWT Decoder allows you to see the contents of a JSON Web Token. It splits the token into its three parts: Header, Payload, and Signature, and decodes the Base64Url encoded sections.',
    faqs: [
      { q: 'Can I see the password?', a: 'JWTs usually contain user claims, not passwords. However, never put sensitive data in a JWT as it can be easily decoded.' },
      { q: 'Does this verify the token?', a: 'No, this tool only decodes the information. Verification requires the server\'s secret key.' }
    ],
    exampleInput: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoyNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    featured: true
  },
  {
    id: 'timestamp-converter',
    name: 'Timestamp Converter',
    slug: 'timestamp-converter',
    description: 'Convert Unix timestamps to readable dates.',
    metaDescription: 'Convert Unix Epoch timestamps to human-readable dates and vice versa. Supports seconds and milliseconds.',
    icon: Clock,
    category: 'time',
    explanation: 'Unix timestamp (also known as Epoch time) is a system for describing a point in time. It is the number of seconds that have elapsed since the Unix epoch, minus leap seconds.',
    faqs: [
      { q: 'What is the Unix Epoch?', a: 'The Unix Epoch is 00:00:00 UTC on 1 January 1970.' },
      { q: 'Does it support milliseconds?', a: 'Yes, the tool automatically detects if the input is in seconds or milliseconds.' }
    ],
    exampleInput: '1709654400',
    featured: true
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    slug: 'regex-tester',
    description: 'Test regular expressions with live highlighting.',
    metaDescription: 'Online Regex tester with live highlighting and match results. Test your regular expressions against sample text.',
    icon: SearchCode,
    category: 'web',
    explanation: 'Regex Tester allows you to write and test Regular Expressions against a sample text. It provides real-time feedback on matches and groups.',
    faqs: [
      { q: 'Which regex engine is used?', a: 'It uses the native JavaScript RegExp engine.' }
    ],
    exampleInput: '([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\\.([a-zA-Z]{2,})',
    featured: true
  },
  {
    id: 'html-beautifier',
    name: 'HTML Beautifier',
    slug: 'html-beautifier',
    description: 'Format messy HTML into clean code.',
    metaDescription: 'Prettify your HTML code online. Format messy, unindented HTML into clean, readable, and well-structured code.',
    icon: FileCode,
    category: 'web',
    explanation: 'HTML Beautifier takes messy, minified, or poorly indented HTML and formats it with proper nesting and indentation, making it much easier to read and maintain.',
    faqs: [
      { q: 'Does it fix broken HTML?', a: 'It attempts to format the code based on tags, but it won\'t fix structural errors like missing closing tags.' }
    ],
    exampleInput: '<div><h1>Title</h1><p>Some content<span>here</span></p></div>'
  },
  {
    id: 'sql-formatter',
    name: 'SQL Formatter',
    slug: 'sql-formatter',
    description: 'Format SQL queries for better readability.',
    metaDescription: 'Beautify your SQL queries online. Supports various SQL dialects and makes complex queries easy to read.',
    icon: Database,
    category: 'data',
    explanation: 'SQL Formatter takes raw SQL queries and applies consistent indentation and keyword capitalization. This is essential for debugging complex JOINs and subqueries.',
    faqs: [
      { q: 'Which SQL dialects are supported?', a: 'Standard SQL, MySQL, PostgreSQL, and more are supported.' }
    ],
    exampleInput: 'SELECT a.id, b.name FROM users a JOIN profiles b ON a.id = b.user_id WHERE a.active = 1 ORDER BY a.created_at DESC'
  },
  {
    id: 'json-error-finder',
    name: 'JSON Error Finder',
    slug: 'json-error-finder',
    description: 'Find exact line and column of JSON syntax errors.',
    metaDescription: 'Debug broken JSON with our JSON Error Finder. Detect the exact line and column where your JSON syntax is invalid.',
    icon: AlertTriangle,
    category: 'json',
    explanation: 'JSON Error Finder is a specialized debugging tool that goes beyond simple validation. It parses your JSON and identifies the precise location (line and column) of syntax errors, providing helpful messages to fix them quickly.',
    faqs: [
      { q: 'How does it find the line number?', a: 'The tool uses a custom parsing approach to map character offsets to line and column numbers in your input text.' },
      { q: 'Is it better than a standard validator?', a: 'Yes, because it focuses on error location and visualization, making it much faster to fix large, broken JSON files.' }
    ],
    exampleInput: '{\n  "name": "John",\n  "age": 30\n  "city": "New York"\n}' // Missing comma
  },
  {
    id: 'api-request-builder',
    name: 'API Request Builder',
    slug: 'api-request-builder',
    description: 'Build API requests and generate code snippets.',
    metaDescription: 'Build HTTP requests online. Select method, add headers, and generate code snippets for curl, fetch, and Python requests.',
    icon: Globe,
    category: 'web',
    explanation: 'API Request Builder is a lightweight alternative to Postman. It allows you to construct HTTP requests (GET, POST, PUT, DELETE) and automatically generates the corresponding code for curl, JavaScript Fetch, and Python Requests.',
    faqs: [
      { q: 'Does it actually send the request?', a: 'This version focuses on building the request and generating code. It does not execute the request to avoid CORS issues.' },
      { q: 'Can I add custom headers?', a: 'Yes, you can add any number of custom HTTP headers to your request.' }
    ],
    exampleInput: 'https://api.example.com/v1/users'
  },
  {
    id: 'json-to-typescript',
    name: 'JSON to TypeScript',
    slug: 'json-to-typescript',
    description: 'Generate TypeScript interfaces from JSON.',
    metaDescription: 'Convert JSON objects to TypeScript interfaces automatically. Save time writing types for your API responses.',
    icon: Terminal,
    category: 'json',
    explanation: 'JSON to TypeScript generator analyzes the structure of your JSON data and automatically creates corresponding TypeScript interfaces. It handles nested objects, arrays, and basic types.',
    faqs: [
      { q: 'Does it handle nested objects?', a: 'Yes, it recursively generates interfaces for all nested structures found in the JSON.' },
      { q: 'Can I customize the interface name?', a: 'By default, it uses "RootObject", but you can easily rename it in the output.' }
    ],
    exampleInput: '{\n  "id": 1,\n  "name": "Leanne Graham",\n  "username": "Bret",\n  "email": "Sincere@april.biz",\n  "address": {\n    "street": "Kulas Light",\n    "suite": "Apt. 556",\n    "city": "Gwenborough"\n  }\n}',
  },
  {
    id: 'html-to-markdown',
    name: 'HTML to Markdown',
    slug: 'html-to-markdown',
    description: 'Convert HTML code to Markdown syntax.',
    metaDescription: 'Convert HTML snippets to Markdown online. Perfect for migrating content to static sites or documentation.',
    icon: Code,
    category: 'text',
    explanation: 'HTML to Markdown converter helps you migrate content from legacy HTML systems to modern Markdown-based platforms like GitHub, Notion, or Jekyll.',
    faqs: [
      { q: 'Are all HTML tags supported?', a: 'Most common structural tags (h1-h6, p, a, img, ul, ol, li, blockquote, code) are supported.' }
    ],
    exampleInput: '<h1>Hello</h1><p>This is <b>bold</b> text.</p>'
  },
  {
    id: 'text-to-slug',
    name: 'Text to Slug',
    slug: 'text-to-slug',
    description: 'Generate URL-friendly slugs from text.',
    metaDescription: 'Convert any string into a SEO-friendly URL slug. Removes special characters and handles spaces correctly.',
    icon: Type,
    category: 'text',
    explanation: 'A slug is the part of a URL which identifies a particular page on a website in a human-readable format. This tool converts any text into a clean, lowercase, hyphenated slug.',
    faqs: [
      { q: 'Why are slugs important for SEO?', a: 'Slugs provide both users and search engines with a clear idea of what the page content is about.' }
    ],
    exampleInput: 'How to Build a Great Developer Tools Website'
  },
  {
    id: 'image-to-base64',
    name: 'Image to Base64',
    slug: 'image-to-base64',
    description: 'Convert images to Base64 data strings.',
    metaDescription: 'Convert images to Base64 strings online. Embed images directly into HTML or CSS without external files.',
    icon: ImageIcon,
    category: 'image',
    explanation: 'Image to Base64 converter allows you to transform an image file into a data URI string. This is useful for small icons or images that you want to embed directly into your code to reduce HTTP requests.',
    faqs: [
      { q: 'Does it increase file size?', a: 'Yes, Base64 encoding typically increases the file size by about 33% compared to the original binary file.' }
    ]
  },
  {
    id: 'cron-generator',
    name: 'Cron Expression Generator',
    slug: 'cron-generator',
    description: 'Build cron schedules and generate cron expressions.',
    metaDescription: 'Visual cron expression builder. Generate cron schedules for Linux, AWS, and more with human-readable explanations.',
    icon: Clock,
    category: 'debug',
    explanation: 'Cron Expression Generator helps you create complex cron schedules without needing to memorize the syntax. It provides a visual interface to select minutes, hours, days, and months, and translates them into a valid cron expression with a human-readable description.',
    faqs: [
      { q: 'What is a cron expression?', a: 'A cron expression is a string representing a schedule that specifies when a task should run.' },
      { q: 'Is it compatible with AWS?', a: 'Yes, it generates standard cron expressions compatible with most systems including AWS EventBridge and Linux crontab.' }
    ],
    exampleInput: '0 0 * * *'
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    slug: 'uuid-generator',
    description: 'Generate UUID v1 and v4 strings.',
    metaDescription: 'Generate unique UUIDs (v1 and v4) online. Supports bulk generation for developers and testers.',
    icon: Terminal,
    category: 'debug',
    explanation: 'UUID (Universally Unique Identifier) is a 128-bit label used for information in computer systems. This tool allows you to generate version 1 (time-based) and version 4 (random) UUIDs, either individually or in bulk.',
    faqs: [
      { q: 'What is the difference between v1 and v4?', a: 'v1 is generated using the current time and the MAC address of the computer. v4 is generated using random numbers.' }
    ],
    exampleInput: '5',
    featured: true
  },
  {
    id: 'password-hash-generator',
    name: 'Password Hash Generator',
    slug: 'password-hash-generator',
    description: 'Generate hashes using MD5, SHA1, SHA256, and SHA512.',
    metaDescription: 'Securely generate password hashes online. Supports MD5, SHA-1, SHA-256, and SHA-512 algorithms.',
    icon: Key,
    category: 'debug',
    explanation: 'Password Hash Generator allows you to create cryptographic hashes of text strings. This is useful for verifying data integrity or storing passwords securely (though modern systems should use salted hashes like bcrypt).',
    faqs: [
      { q: 'Is MD5 secure?', a: 'No, MD5 is considered cryptographically broken and should not be used for sensitive data like passwords.' }
    ],
    exampleInput: 'mysecretpassword'
  },
  {
    id: 'text-diff-checker',
    name: 'Text Diff Checker',
    slug: 'text-diff-checker',
    description: 'Compare two text blocks and find differences.',
    metaDescription: 'Compare two text snippets side-by-side. Highlight additions, deletions, and modifications instantly.',
    icon: Type,
    category: 'debug',
    explanation: 'Text Diff Checker provides a side-by-side comparison of two pieces of text. It highlights exactly what has changed, making it easy to spot differences in code, configuration files, or documents.',
    faqs: [
      { q: 'Does it support line-by-line comparison?', a: 'Yes, it compares text line by line and highlights specific character changes within those lines.' }
    ],
    exampleInput: 'Text 1: Hello World\nText 2: Hello Developer'
  },
  {
    id: 'color-converter',
    name: 'Color Converter',
    slug: 'color-converter',
    description: 'Convert between HEX, RGB, and HSL colors.',
    metaDescription: 'Convert color codes between HEX, RGB, and HSL formats. Includes a live color preview and color picker.',
    icon: ImageIcon,
    category: 'debug',
    explanation: 'Color Converter helps web designers and developers translate color values between different formats used in CSS and design tools. It supports HEX, RGB, and HSL with real-time conversion and preview.',
    faqs: [
      { q: 'What is HSL?', a: 'HSL stands for Hue, Saturation, and Lightness. It is often more intuitive for humans to work with than RGB.' }
    ],
    exampleInput: '#6366f1'
  },
  {
    id: 'ai-regex-generator',
    name: 'AI Regex Generator',
    slug: 'ai-regex-generator',
    description: 'Generate regex patterns using AI.',
    metaDescription: 'Use AI to generate complex regular expressions from natural language descriptions. Fast and accurate regex builder.',
    icon: SearchCode,
    category: 'ai',
    explanation: 'AI Regex Generator uses lightweight AI to translate your natural language descriptions into valid regular expression patterns. Simply describe what you want to match, and the AI will provide the regex and an explanation.',
    faqs: [
      { q: 'How accurate is the AI?', a: 'The AI is highly accurate for common patterns, but you should always verify the generated regex with the included tester.' }
    ],
    exampleInput: 'Match an email address'
  },
  {
    id: 'ai-sql-generator',
    name: 'AI SQL Query Generator',
    slug: 'ai-sql-generator',
    description: 'Generate SQL queries from natural language.',
    metaDescription: 'Convert plain English into SQL queries using AI. Supports SELECT, JOIN, and complex filtering logic.',
    icon: Database,
    category: 'ai',
    explanation: 'AI SQL Query Generator helps you write SQL queries by describing what data you want to retrieve in plain English. It can generate SELECT statements, JOINs, and WHERE clauses based on your description.',
    faqs: [
      { q: 'Does it know my database schema?', a: 'It generates generic SQL based on your description. For best results, mention table and column names in your prompt.' }
    ],
    exampleInput: 'Select all users who joined in 2023 and have more than 5 orders'
  },
  {
    id: 'ai-json-fixer',
    name: 'AI JSON Fixer',
    slug: 'ai-json-fixer',
    description: 'Fix broken or invalid JSON using AI.',
    metaDescription: 'Repair malformed JSON strings instantly with AI. Fixes missing commas, quotes, and structural errors.',
    icon: Braces,
    category: 'ai',
    explanation: 'AI JSON Fixer analyzes broken JSON strings and suggests corrections to make them valid. It can fix common syntax errors like missing commas, unquoted keys, and mismatched brackets.',
    faqs: [
      { q: 'Can it fix deeply nested errors?', a: 'Yes, the AI is capable of understanding and repairing complex, nested JSON structures.' }
    ],
    exampleInput: '{ name: "John" age: 30 }'
  },
  {
    id: 'jwt-expiration-checker',
    name: 'JWT Expiration Checker',
    slug: 'jwt-expiration-checker',
    description: 'Check if a JWT token is expired and view its lifespan.',
    metaDescription: 'Instantly check the expiration status of a JSON Web Token. View Issued At (iat) and Expires At (exp) timestamps.',
    icon: Key,
    category: 'debug',
    explanation: 'JWT Expiration Checker is a specialized utility for security debugging. It decodes the payload of a JWT and calculates the remaining validity period based on the current system time.',
    faqs: [
      { q: 'What if there is no exp claim?', a: 'If the token does not have an "exp" field, it is technically valid indefinitely according to the spec, but this is usually a security risk.' }
    ],
    exampleInput: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoyNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  },
  {
    id: 'http-header-analyzer',
    name: 'HTTP Header Analyzer',
    slug: 'http-header-analyzer',
    description: 'Inspect HTTP response headers for any URL.',
    metaDescription: 'Analyze HTTP response headers online. Check status codes, cache-control, security headers, and more.',
    icon: Globe,
    category: 'debug',
    explanation: 'HTTP Header Analyzer allows you to inspect the metadata sent by a web server. It displays status codes and all response headers, which is critical for debugging caching, security policies (CORS, CSP), and server configurations.',
    faqs: [
      { q: 'Why do some URLs fail?', a: 'Browser security (CORS) prevents scripts from accessing headers of websites that do not explicitly allow it. This tool works best with APIs that have CORS enabled.' }
    ],
    exampleInput: 'https://httpbin.org/get'
  },
  {
    id: 'json-yaml-converter',
    name: 'JSON ↔ YAML Converter',
    slug: 'json-yaml-converter',
    description: 'Convert between JSON and YAML formats instantly.',
    metaDescription: 'Convert JSON to YAML and YAML to JSON online. Fast, secure, and preserves data structure.',
    icon: RefreshCw,
    category: 'json',
    explanation: 'JSON ↔ YAML Converter is a essential tool for developers working with configuration files. JSON is common in web APIs, while YAML is preferred for human-readable configurations like Docker, Kubernetes, and CI/CD pipelines.',
    faqs: [
      { q: 'Does it support complex objects?', a: 'Yes, it handles deeply nested objects, arrays, and all standard JSON/YAML data types.' },
      { q: 'Is the conversion lossless?', a: 'Yes, the data structure is preserved, although comments in YAML are lost when converting to JSON.' }
    ],
    exampleInput: '{"name": "DevConvert", "version": 1}'
  },
  {
    id: 'markdown-preview',
    name: 'Markdown Preview Editor',
    slug: 'markdown-preview',
    description: 'Write Markdown and see the live HTML preview.',
    metaDescription: 'Online Markdown editor with real-time preview. Supports GitHub Flavored Markdown (GFM).',
    icon: FileText,
    category: 'text',
    explanation: 'Markdown Preview Editor allows you to write content using Markdown syntax and see exactly how it will look when rendered. It supports standard Markdown and GitHub Flavored Markdown (GFM) features like tables and task lists.',
    faqs: [
      { q: 'Does it support GitHub Flavored Markdown?', a: 'Yes, it includes support for GFM features like tables, task lists, and strikethrough.' },
      { q: 'Can I copy the HTML?', a: 'Currently, it provides a visual preview. You can use our HTML to Markdown tool for the reverse process.' }
    ],
    exampleInput: '# Title\n\n- Item 1\n- Item 2'
  }
];
