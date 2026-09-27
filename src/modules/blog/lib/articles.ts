import { getCollection } from "astro:content";

/** All articles, newest first. */
export async function getArticles() {
	const articles = await getCollection("articles");
	return articles.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function formatArticleDate(date: Date) {
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}
