import { getCollection } from "astro:content";
import { resolve, t, type Locale } from "@/services/i18n";
import { getWorkImages } from "./images";

const year = (date: Date) => date.getUTCFullYear();

const formatYears = (locale: Locale, start: Date, end?: Date) => {
	if (!end) return `${year(start)} – ${t(locale).resume.present}`;
	if (year(end) === year(start)) return `${year(start)}`;
	return `${year(start)} – ${year(end)}`;
};

// Roles newest first, with the years they span and their screenshots.
export const getExperiences = async (locale: Locale) =>
	(await getCollection("experiences"))
		.sort((a, b) => b.data.start.getTime() - a.data.start.getTime())
		.map(({ id, data }) => ({
			id,
			...resolve(data, locale),
			years: formatYears(locale, data.start, data.end),
			images: getWorkImages(id),
		}));

// Full years since my first role started, counted at build time.
export const getExperienceYears = async (now = new Date()) => {
	const starts = (await getCollection("experiences")).map(({ data }) => data.start.getTime());
	const start = new Date(Math.min(...starts));
	const months = (now.getUTCFullYear() - year(start)) * 12 + now.getUTCMonth() - start.getUTCMonth();
	return Math.floor(months / 12);
};
