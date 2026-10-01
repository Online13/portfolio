import { LANGUAGE_TAGS, type Locale } from "@/services/i18n";

export const formatMonth = (date: Date, locale: Locale) =>
	date.toLocaleDateString(LANGUAGE_TAGS[locale], { month: "short", year: "numeric", timeZone: "UTC" });
