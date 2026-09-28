import { file, glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const projects = defineCollection({
	loader: glob({ pattern: "**/*.json", base: "src/services/content/data/projects" }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		description: z.string(),
		full_description: z.string(),
		technologies: z.array(z.string()),
		link: z.string().url(),
		active: z.boolean().default(false),
		role: z.string().optional(),
		highlights: z.array(z.string()).default([]),
	}),
});

const articles = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "src/services/content/data/articles" }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		// Unfinished articles stay listed, flagged "(in progress)".
		draft: z.boolean().default(false),
		tags: z.array(z.string()).default([]),
	}),
});

const experiences = defineCollection({
	loader: glob({ pattern: "**/*.json", base: "src/services/content/data/experiences" }),
	schema: z.object({
		role: z.string(),
		company: z.string(),
		start: z.coerce.date(),
		end: z.coerce.date().optional(),
		type: z.enum(["Full-time", "Consultant", "Freelance", "Internship"]).optional(),
		location: z.string().optional(),
		summary: z.string().optional(),
		highlights: z.array(z.string()).default([]),
		technologies: z.array(z.string()).default([]),
		metrics: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
		projects: z
			.array(z.object({ name: z.string(), description: z.string() }))
			.default([]),
	}),
});

const education = defineCollection({
	loader: file("src/services/content/data/education.json"),
	schema: z.object({
		degree: z.string(),
		school: z.string(),
		start: z.number().int(),
		end: z.number().int().optional(),
	}),
});

const certifications = defineCollection({
	loader: file("src/services/content/data/certifications.json"),
	schema: z.object({
		title: z.string(),
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
