import { file, glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

// Text shown to visitors: one string when both languages share it, otherwise { en, fr } (see resolve in the i18n service).
const text = z.union([z.string(), z.object({ en: z.string(), fr: z.string() })]);

const projects = defineCollection({
	loader: glob({ pattern: "**/*.json", base: "src/services/content/data/projects" }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		description: text,
		full_description: text,
		technologies: z.array(z.string()),
		link: z.string().url(),
		active: z.boolean().default(false),
		role: text.optional(),
		highlights: z.array(text).default([]),
	}),
});

const articles = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "src/services/content/data/articles" }),
	schema: z.object({
		title: text,
		slug: z.string(),
		description: text,
		date: z.coerce.date(),
		// Unfinished articles stay listed, flagged "(in progress)".
		draft: z.boolean().default(false),
		tags: z.array(z.string()).default([]),
	}),
});

const experiences = defineCollection({
	loader: glob({ pattern: "**/*.json", base: "src/services/content/data/experiences" }),
	schema: z.object({
		role: text,
		company: z.string(),
		start: z.coerce.date(),
		end: z.coerce.date().optional(),
		type: z.enum(["Full-time", "Consultant", "Freelance", "Internship"]).optional(),
		location: text.optional(),
		summary: text.optional(),
		highlights: z.array(text).default([]),
		technologies: z.array(z.string()).default([]),
		metrics: z.array(z.object({ value: text, label: text })).default([]),
		projects: z.array(z.object({ name: text, description: text })).default([]),
	}),
});

const education = defineCollection({
	loader: file("src/services/content/data/education.json"),
	schema: z.object({
		degree: text,
		school: text,
		start: z.number().int(),
		end: z.number().int().optional(),
	}),
});

const certifications = defineCollection({
	loader: file("src/services/content/data/certifications.json"),
	schema: z.object({
		title: text,
		issuer: z.string().optional(),
		date: z.coerce.date(),
		href: z.string().url().optional(),
	}),
});

export const collections = {
	articles,
	certifications,
	education,
	experiences,
	projects,
};
