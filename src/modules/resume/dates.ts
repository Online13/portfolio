export const formatMonth = (date: Date, year = true) =>
	date.toLocaleDateString("en-US", {
		month: "short",
		year: year ? "numeric" : undefined,
		timeZone: "UTC",
	});

// Whole months from `start` to `end`, both months included.
export const monthsBetween = (start: Date, end: Date) =>
	(end.getUTCFullYear() - start.getUTCFullYear()) * 12 +
	end.getUTCMonth() -
	start.getUTCMonth() +
	1;

export const formatDuration = (months: number) => {
	const years = Math.floor(months / 12);
	const rest = months % 12;
	return [
		years > 0 && `${years} yr${years > 1 ? "s" : ""}`,
		rest > 0 && `${rest} mo${rest > 1 ? "s" : ""}`,
	]
		.filter(Boolean)
		.join(" ");
};

// Groups items already sorted newest first, keeping that order.
export const groupByYear = <T>(items: T[], year: (item: T) => number) =>
	[...Map.groupBy(items, year)].map(([label, entries]) => ({
		label: String(label),
		entries,
	}));
