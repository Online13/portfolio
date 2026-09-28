import { getCollection } from "astro:content";

// Degrees newest first.
export const getEducation = async () =>
	(await getCollection("education")).map(({ data }) => data).sort((a, b) => b.start - a.start);

// Certifications newest first.
export const getCertifications = async () =>
	(await getCollection("certifications")).map(({ data }) => data).sort((a, b) => b.date.getTime() - a.date.getTime());
