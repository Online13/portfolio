export const formatMonth = (date: Date) =>
	date.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
