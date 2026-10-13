import { getCollection } from "astro:content";
import { resolve, type Locale } from "@/services/i18n";
import { getWorkImages } from "./images";

export const getProjects = async (locale: Locale) =>
	(await getCollection("projects")).map(({ data }) => ({ ...resolve(data, locale), images: getWorkImages(data.slug) }));
