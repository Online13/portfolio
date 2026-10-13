import { homePath, LANGUAGE_TAGS, type Locale } from "@/services/i18n";
import { getArticles } from "@/services/content";

export const blogPath = (locale: Locale) => `${homePath(locale)}blog/`;

export const articlePath = (locale: Locale, slug: string) => `${blogPath(locale)}${slug}/`;

export const formatArticleDate = (date: Date, locale: Locale) =>
	date.toLocaleDateString(LANGUAGE_TAGS[locale], { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

// One page per article, for getStaticPaths. A draft has its page too, marked as one and kept out of search engines.
export const getArticlePaths = async (locale: Locale) =>
	(await getArticles(locale)).map((article) => ({ params: { slug: article.slug }, props: { article } }));

export type Article = Awaited<ReturnType<typeof getArticles>>[number];
