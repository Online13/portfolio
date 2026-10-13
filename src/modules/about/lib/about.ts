import { homePath, type Locale } from "@/services/i18n";

export const aboutPath = (locale: Locale) => `${homePath(locale)}about/`;
