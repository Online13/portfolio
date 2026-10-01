import { SOCIAL_LINKS } from "@/data";
import { homePath, resolve, type Locale } from "@/services/i18n";
import data from "../data/resume.json";
import { getCertifications, getEducation } from "./education";
import { getExperiences } from "./experiences";
import { getProjects } from "./projects";

// Everything the resume sheet shows, trimmed to fit one printed page.
export const getResume = async (locale: Locale) => {
	const resume = resolve(data, locale);
	const contacts = [
		{ href: `https://nekena-rayane.com${homePath(locale)}`, label: "Portfolio" },
		...SOCIAL_LINKS.filter(({ type }) => type !== "facebook").map(({ to, type, handle }) => ({
			href: to,
			label: type === "github" ? "Github" : type === "linkedin" ? "LinkedIn" : handle,
		})),
	];

	// Two highlights and the city alone keep each role to a few lines.
	const experiences = (await getExperiences(locale)).map((role) => ({
		...role,
		city: role.location?.split(",")[0],
		highlights: role.highlights.slice(0, 2),
	}));

	const projects = (await getProjects(locale))
		.filter((project) => project.role)
		.sort((a, b) => Number(b.active) - Number(a.active));

	return {
		...resume,
		// Tool rows left empty are not shown.
		tools: resume.tools.filter(({ value }) => value),
		contacts,
		experiences,
		projects,
		education: await getEducation(locale),
		certifications: await getCertifications(locale),
	};
};
