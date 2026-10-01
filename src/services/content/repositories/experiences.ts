import { getCollection } from "astro:content";
import { resolve, t, type Locale } from "@/services/i18n";

const year = (date: Date) => date.getUTCFullYear();

const formatYears = (locale: Locale, start: Date, end?: Date) => {
	if (!end) return `${year(start)} – ${t(locale).resume.present}`;
	if (year(end) === year(start)) return `${year(start)}`;
	return `${year(start)} – ${year(end)}`;
};

// Roles newest first, with the years they span.
export const getExperiences = async (locale: Locale) =>
	(await getCollection("experiences"))
		.sort((a, b) => b.data.start.getTime() - a.data.start.getTime())
		.map(({ id, data }) => ({ id, ...resolve(data, locale), years: formatYears(locale, data.start, data.end) }));
