import { LANGUAGE_TAGS, type Locale } from "@/services/i18n";

export function formatArticleDate(date: Date, locale: Locale) {
	return date.toLocaleDateString(LANGUAGE_TAGS[locale], {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}
