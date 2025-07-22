# ✨ react-wrap-text
A tiny utility for highlighting or replacing specific text matches inside strings with custom React components.

Perfect for inline highlighting, smart mentions, tokenized UI, or simple templating in JSX.

## 🚀 Install
```
npm install react-wrap-matches
```

## Usage

### Example 1: Highlight
Perfect for if you want to highlight specific parts of the text.

```ts
import { wrapMatchesInText } from 'react-wrap-matches';

// Define an optional wrapper component
const Highlight = ({ children }: { children: React.ReactNode }) => (
  <mark>{children}</mark>
);

const text = "Hit or miss, I guess they never miss, huh?";

const result = wrapMatchesInText(text, "miss", (match, i) => (
  <Highlight key={i}>{match}</Highlight>
));

// Output: 
// Hit or <mark>miss</mark>, I guess they never <mark>miss</mark>, huh?
return <p>{result}</p>;
```


### Example 2: Replace
Perfect for if you want to replace matching parts of the text with a JSX component.

```ts
import { wrapMatchesInText } from 'react-wrap-matches';

const text = "You've scored 100 points!";

const result = wrapMatchesInText(text, "100", (_, i) => (
  // This also works with inline jsx
  <strong key={i}>💯</strong>
));

// Output
// You've scored <strong>💯</strong> points!
return <p>{result}</p>;
```
