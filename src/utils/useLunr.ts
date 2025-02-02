import { useState } from "react";

function getSearchResults(query: any, lng: string) {
	if (!query || !(window as any).__LUNR__) return [];
	const lunrIndex = (window as any).__LUNR__[lng];
	// you can customize your search, see https://lunrjs.com/guides/searching.html
	// Escape the lunr regex, add `*`s to partially match to act more like typical search
	const escapedStr = query.replace(/[-/\\^$*+?.()|[\]{}:]/g, "\\$&");
	// FIXME: This is super lazy and bad, please fix me I'm non-performant
	const lazyResults = lunrIndex.index.search(`*${escapedStr}*`);
	const fullResults = lunrIndex.index.search(escapedStr);
	const refs = new Set([
		...lazyResults.map(({ ref }: { ref: any }) => ref),
		...fullResults.map(({ ref }: { ref: any }) => ref)
	]);

	return Array.from(refs).map(
		ref => lunrIndex.store[ref] as { title: string; slug: string }
	);
}

/**
 *
 * @param [language]
 * @returns {object}
 * results - an array of matches {slug: string}[]
 * onSearch - A `onChange` event or a callback to pass a string
 */
export const useLunr = ({ language = "en" } = {}) => {
	const [results, setResults] = useState<any[] | null>(null);

	const searchUsingLunr = (str: string) => {
		const eventVal = str;
		if (!eventVal) {
			setResults(null);
			return;
		}
		const results = getSearchResults(eventVal, language);
		setResults(results);
	};

	return { searchUsingLunr, results };
};
