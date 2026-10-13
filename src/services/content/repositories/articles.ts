import { getCollection, render } from "astro:content";
import type { Locale } from "@/services/i18n";

// The articles written in the locale, newest first.
export const getArticles = async (locale: Locale) =>
	(await getCollection("articles", ({ id }) => id.startsWith(`${locale}/`)))
		.sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
		.map((entry) => ({
			...entry.data,
			slug: entry.id.slice(locale.length + 1),
			render: () => render(entry),
		}));
