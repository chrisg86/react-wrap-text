import type React from 'react';
import ReactDOM from 'react-dom/client';

import { wrapMatchesInText } from '../src';

const Highlight = ({ children }: { children: React.ReactNode }) => (
  <mark>{children}</mark>
);

const text = "This is a test. This test works.";

const result = wrapMatchesInText(text, "test", (match, i) => (
  <Highlight key={i}>{match}</Highlight>
));

ReactDOM.createRoot(document.getElementById('root')!).render(<p>{result}</p>);
