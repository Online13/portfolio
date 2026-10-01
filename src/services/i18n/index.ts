// English lives at /, French at /fr/ (see i18n in astro.config.mjs).
export const LOCALES = ["en", "fr"] as const;
export type Locale = (typeof LOCALES)[number];

const DEFAULT_LOCALE: Locale = "en";

// Astro.currentLocale, narrowed: anything unknown falls back to English.
export const toLocale = (value: string | undefined): Locale =>
	LOCALES.includes(value as Locale) ? (value as Locale) : DEFAULT_LOCALE;

// The home page of each language.
export const homePath = (locale: Locale) => (locale === DEFAULT_LOCALE ? "/" : `/${locale}/`);

// BCP 47 tags, for <html lang>, dates and og:locale.
export const LANGUAGE_TAGS: Record<Locale, string> = { en: "en-US", fr: "fr-FR" };

// Content text that differs by language is stored as { en, fr }; text shared by both stays a plain string.
type Translated = Record<Locale, string>;

export type Resolved<T> = T extends Translated
	? string
	: T extends Date
		? T
		: T extends readonly (infer U)[]
			? Resolved<U>[]
			: T extends object
				? { [K in keyof T]: Resolved<T[K]> }
				: T;

const isTranslated = (value: object): value is Translated =>
	!Array.isArray(value) &&
	Object.keys(value).length === LOCALES.length &&
	LOCALES.every((locale) => typeof (value as Record<string, unknown>)[locale] === "string");

// Swaps every { en, fr } in the value for its text in the locale.
export function resolve<T>(value: T, locale: Locale): Resolved<T> {
	if (value === null || typeof value !== "object" || value instanceof Date) return value as Resolved<T>;
	if (Array.isArray(value)) return value.map((item) => resolve(item, locale)) as Resolved<T>;
	if (isTranslated(value)) return value[locale] as Resolved<T>;
	return Object.fromEntries(
		Object.entries(value).map(([key, item]) => [key, resolve(item, locale)]),
	) as Resolved<T>;
}

export { t } from "./ui";
