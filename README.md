# ✨ react-wrap-text
A tiny utility for highlighting or replacing specific text matches inside strings with custom React components.

Perfect for inline highlighting, smart mentions, tokenized UI, or simple templating in JSX.

## 🚀 Install
```
npm install react-wrap-text
```

## Usage

### Example 1: Highlight
Use `wrapMatchesInText` if you want to highlight specific parts of the text.

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
Use `wrapMatchesInText` if you want to replace matching parts of the text with a JSX component.

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


### Example 3: Advanced - Highlight multiple
Use `wrapMultipleMatchesInText` if you need to highlight/replace multiple substrings.

```ts
import { wrapMultipleMatchesInText } from 'react-wrap-matches';

const Highlight = ({ children }: { children: React.ReactNode }) => (
	<mark>{children}</mark>
);

const HighlightOrange = ({ children }: { children: React.ReactNode }) => (
	<mark style={{ backgroundColor: "oklch(75% 0.183 55.934)" }}>{children}</mark>
);

const text = "This is a test. This test works.";

const multiPayload: Parameters<typeof wrapMultipleMatchesInText>[1] = [
	{
		target: "This",
		render: (match, i) => <Highlight key={i}>{match}</Highlight>,
	},
	{
		target: "works",
		render: (match, i) => <HighlightOrange key={i}>{match}</HighlightOrange>,
	}
];

const result = wrapMultipleMatchesInText(text, multiPayload);

// Output
// <mark>This</mark> is a test. <mark>This</mark> test <mark style="background-color: oklch(0.75 0.183 55.934);">works</mark>.
return <p>{result}</p>;
```
