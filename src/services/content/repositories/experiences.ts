import { getCollection } from "astro:content";

const year = (date: Date) => date.getUTCFullYear();

const formatYears = (start: Date, end?: Date) => {
	if (!end) return `${year(start)} – Present`;
	if (year(end) === year(start)) return `${year(start)}`;
	return `${year(start)} – ${year(end)}`;
};

// Roles newest first, with the years they span.
export const getExperiences = async () =>
	(await getCollection("experiences"))
		.sort((a, b) => b.data.start.getTime() - a.data.start.getTime())
		.map(({ id, data }) => ({ id, ...data, years: formatYears(data.start, data.end) }));
