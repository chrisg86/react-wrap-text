import type { ReactNode } from "react";

/**
 * Replaces all instances of a target substring in the input with a custom ReactNode.
 *
 * @param input - The input string.
 * @param target - The exact string to match.
 * @param render - A render function that returns a ReactNode for each match.
 * @returns An array of strings and ReactNodes.
 */
export function wrapMatchesInText(
	input: string,
	target: string,
	render: (match: string, index: number) => ReactNode,
): ReactNode[] {
	if (!target) return [input];

	const parts = input.split(target);
	const result: ReactNode[] = [];

	parts.forEach((part, index) => {
		result.push(part);
		if (index < parts.length) {
			result.push(render(target, index));
		}
	});

	return result;
}

/**
 * Applies `wrapMatchesInText` repeatedly over an input string or ReactNode array
 * using multiple match/render rules.
 *
 * @param input - The initial string or ReactNode array
 * @param matches - An array of { target, render } match definitions
 */
export function wrapMultipleMatchesInText(
	input: string | ReactNode[],
	matches: {
		target: string;
		render: (match: string, index: number) => ReactNode;
	}[],
): ReactNode[] {
	return matches.reduce(
		(current, { target, render }) => {
			// Wrap all strings inside the current array
			return current.flatMap((node, outerIndex) => {
				if (typeof node === "string") {
					// Apply match to string segments only
					return wrapMatchesInText(
						node,
						target,
						(match, i) => render(match, outerIndex * 1000 + i), // key strategy
					);
				}
				// Leave already-wrapped nodes as-is
				return [node];
			});
		},
		typeof input === "string" ? [input] : input,
	);
}
