import { getCollection } from "astro:content";
import { resolve, type Locale } from "@/services/i18n";

export const getProjects = async (locale: Locale) =>
	(await getCollection("projects")).map(({ data }) => resolve(data, locale));

export const getActiveProjects = async (locale: Locale) =>
	(await getProjects(locale)).filter((project) => project.active);
