import { getCollection } from "astro:content";
import { resolve, type Locale } from "@/services/i18n";

/** All articles, newest first. */
export async function getArticles(locale: Locale) {
	const articles = await getCollection("articles");
	return articles
		.sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
		.map(({ data }) => resolve(data, locale));
}
