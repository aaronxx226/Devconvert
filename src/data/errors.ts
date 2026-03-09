export interface ErrorEntry {
  id: string;
  slug: string;
  title: string;
  language: string;
  description: string;
  causes: string[];
  solutions: string[];
  codeExamples: string[]; // Array of code snippets corresponding to solutions
  relatedErrors: string[]; // slugs
}

export const ERRORS: ErrorEntry[] = [
  {
    id: 'js-cannot-read-property',
    slug: 'javascript-cannot-read-property',
    title: 'JavaScript: Cannot read property of undefined',
    language: 'JavaScript',
    description: 'This error occurs when you try to access a property or call a method on a variable that is currently undefined or null.',
    causes: [
      'Accessing a property of an object that hasn\'t been initialized.',
      'A function returning undefined when an object was expected.',
      'Asynchronous data fetching where the component renders before data arrives.'
    ],
    solutions: [
      'Use optional chaining (?.) to safely access properties.',
      'Check if the object exists before accessing its properties using an if statement.'
    ],
    codeExamples: [
      'const name = user?.profile?.name ?? "Guest";',
      'if (user && user.profile) {\n  const name = user.profile.name;\n}'
    ],
    relatedErrors: ['react-hook-error']
  },
  {
    id: 'python-index-error',
    slug: 'python-index-error',
    title: 'Python: IndexError: list index out of range',
    language: 'Python',
    description: 'This error is raised when you try to access an index that does not exist in a list or sequence.',
    causes: [
      'Trying to access an index equal to or greater than the length of the list.',
      'Using a negative index that exceeds the list boundaries.',
      'Iterating with a range that goes beyond the list size.'
    ],
    solutions: [
      'Check the length of the list using len() before accessing an index.',
      'Ensure loop ranges are correctly defined.'
    ],
    codeExamples: [
      'my_list = [1, 2, 3]\nif len(my_list) > 3:\n    print(my_list[3])',
      'for i in range(len(my_list)):\n    print(my_list[i])'
    ],
    relatedErrors: []
  },
  {
    id: 'sql-syntax-error',
    slug: 'sql-syntax-error',
    title: 'SQL: Syntax Error',
    language: 'SQL',
    description: 'A generic error indicating that the SQL engine cannot parse the query due to incorrect syntax.',
    causes: [
      'Missing or misplaced commas in SELECT or INSERT statements.',
      'Incorrect keyword usage or spelling.',
      'Unbalanced parentheses or quotes.'
    ],
    solutions: [
      'Check for missing commas between column names.',
      'Verify that all opened parentheses and quotes are closed.'
    ],
    codeExamples: [
      'SELECT id, name FROM users; -- Ensure commas are present',
      'INSERT INTO users (name, email) VALUES ("John", "john@example.com");'
    ],
    relatedErrors: []
  },
  {
    id: 'react-hook-error',
    slug: 'react-hook-error',
    title: 'React: Hooks can only be called inside the body of a function component',
    language: 'React',
    description: 'This error occurs when React hooks (like useState or useEffect) are called in a way that violates the Rules of Hooks.',
    causes: [
      'Calling a hook inside a regular JavaScript function (not a component or custom hook).',
      'Calling a hook inside a loop, condition, or nested function.',
      'Calling a hook in a class component.'
    ],
    solutions: [
      'Ensure hooks are only called at the top level of functional components.',
      'Move hook calls out of loops or conditional blocks.'
    ],
    codeExamples: [
      'function MyComponent() {\n  const [count, setCount] = useState(0);\n  // ...\n}',
      'useEffect(() => {\n  if (user) { ... }\n}, [user]);'
    ],
    relatedErrors: ['javascript-cannot-read-property']
  },
  {
    id: 'css-z-index-not-working',
    slug: 'css-z-index-not-working',
    title: 'CSS: z-index Not Working',
    description: 'The z-index property only works on positioned elements (position: absolute, relative, fixed, or sticky).',
    language: 'CSS',
    causes: [
      'The element has position: static (default).',
      'The element is in a different stacking context.',
      'A parent element has an overflow property that clips the child.'
    ],
    solutions: [
      'Set the position property to relative, absolute, or fixed.',
      'Check the stacking context of parent elements.'
    ],
    codeExamples: [
      '.box {\n  position: relative;\n  z-index: 10;\n}',
      '.parent {\n  position: relative;\n  z-index: 1;\n}\n.child {\n  position: absolute;\n  z-index: 999;\n}'
    ],
    relatedErrors: []
  }
];
