import type { ImageMetadata } from "astro";
import { getExperiences, getProjects } from "@/services/content";
import { homePath, t, type Locale } from "@/services/i18n";

// A piece of work as the site shows it, in its list and on its own page: a role held for a client, or a personal
// project.
export type Work = {
	slug: string;
	// The company, or the project's name.
	title: string;
	// The dimmed line over the title on the work's page.
	kicker: string;
	years?: string;
	summary?: string;
	body?: string;
	role?: string;
	highlights: string[];
	metrics: { value: string; label: string }[];
	projects: { name: string; description: string }[];
	technologies: string[];
	link?: string;
	images: ImageMetadata[];
};

export const workPath = (locale: Locale, slug: string) => `${homePath(locale)}work/${slug}/`;

// Roles, newest first.
export const getClientWork = async (locale: Locale): Promise<Work[]> =>
	(await getExperiences(locale)).map(({ id, company, role, years, ...experience }) => ({
		...experience,
		slug: id,
		title: company,
		kicker: `${role}, ${years}.`,
		years,
	}));

export const getPersonalWork = async (locale: Locale): Promise<Work[]> =>
	(await getProjects(locale)).map(({ description, full_description, ...project }) => ({
		...project,
		kicker: t(locale).pro.work.personalProject,
		summary: description,
		body: full_description,
		metrics: [],
		projects: [],
	}));

// One page per work, for getStaticPaths.
export const getWorkPaths = async (locale: Locale) =>
	[...(await getClientWork(locale)), ...(await getPersonalWork(locale))].map((work) => ({
		params: { slug: work.slug },
		props: { work },
	}));
