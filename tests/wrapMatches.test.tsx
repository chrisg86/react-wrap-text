import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { wrapMatchesInText, wrapMultipleMatchesInText } from "../src";

describe("wrapMatchesInText", () => {
	it("returns original text without target", () => {
		const input = "This is the original text.";
		const result = wrapMatchesInText(input, "", (match, i) => (
			<i key={i}>{match}</i>
		));

		expect(result).toEqual(["This is the original text."]);
	});

	it("wraps a single match", () => {
		const input = "Let's highlight some words.";
		const result = wrapMatchesInText(input, "highlight", (match, i) => (
			<mark key={i}>{match}</mark>
		));

		expect(result).toEqual([
			"Let's ",
			<mark key={0}>highlight</mark>,
			" some words.",
		]);
	});
});

describe("wrapMultipleMatchesInText", () => {
	it("wraps multiple words", () => {
		const input = "Let's highlight multiple words.";
		const result = wrapMultipleMatchesInText(input, [
			{ target: "highlight", render: (m, i) => <mark key={i}>{m}</mark> },
			{ target: "multiple", render: (m, i) => <em key={i}>{m}</em> },
		]);

		const { container } = render(<p>{result}</p>);
		expect(container.innerHTML).toBe(
			"<p>Let's <mark>highlight</mark> <em>multiple</em> words.</p>",
		);
	});

	it("supports ReactNodes as input", () => {
		const input = [
			"Let's highlight multiple ",
			<mark key={0}>words</mark>,
			".",
		];
		const result = wrapMultipleMatchesInText(input, [
			{ target: "highlight", render: (m, i) => <em key={i}>{m}</em> },
		]);

		const { container } = render(<p>{result}</p>);
		expect(container.innerHTML).toBe(
			"<p>Let's <em>highlight</em> multiple <mark>words</mark>.</p>",
		);
	});
});
