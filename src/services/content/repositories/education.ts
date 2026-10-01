import { getCollection } from "astro:content";
import { resolve, type Locale } from "@/services/i18n";

// Degrees newest first.
export const getEducation = async (locale: Locale) =>
	(await getCollection("education"))
		.map(({ data }) => resolve(data, locale))
		.sort((a, b) => b.start - a.start);

// Certifications newest first.
export const getCertifications = async (locale: Locale) =>
	(await getCollection("certifications"))
		.map(({ data }) => resolve(data, locale))
		.sort((a, b) => b.date.getTime() - a.date.getTime());
