import type React from "react";
import ReactDOM from "react-dom/client";

import { wrapMatchesInText, wrapMultipleMatchesInText } from "../src";

const Highlight = ({ children }: { children: React.ReactNode }) => (
	<mark>{children}</mark>
);

const HighlightOrange = ({ children }: { children: React.ReactNode }) => (
	<mark style={{ backgroundColor: "oklch(75% 0.183 55.934)" }}>{children}</mark>
);

const text = "This is a test. This test works.";

const resultHighlight = wrapMatchesInText(text, "test", (match, i) => (
	<Highlight key={i}>{match}</Highlight>
));

const resultReplace = wrapMatchesInText(text, "test", (_, i) => (
	<Highlight key={i}>thing</Highlight>
));

const multiPayload: Parameters<typeof wrapMultipleMatchesInText>[1] = [
	{
		target: "This",
		render: (match, i) => <Highlight key={i}>{match}</Highlight>,
	},
	{
		target: "works",
		render: (match, i) => <HighlightOrange key={i}>{match}</HighlightOrange>,
	},
];

const resultMultiple = wrapMultipleMatchesInText(text, multiPayload);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<div>
		<div>
			<h2>Simple highlight</h2>
			<div>{resultHighlight}</div>
		</div>
		<div>
			<h2>Simple replace</h2>
			<div>{resultReplace}</div>
		</div>
		<div>
			<h2>Multiple</h2>
			<div>{resultMultiple}</div>
		</div>
	</div>,
);
