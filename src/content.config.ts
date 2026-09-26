import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const projects = defineCollection({
	loader: glob({ pattern: "**/*.json", base: "src/modules/project/contents" }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		description: z.string(),
		full_description: z.string(),
		technologies: z.array(z.string()),
		link: z.string().url(),
		active: z.boolean().default(false),
	}),
});

const articles = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "src/modules/blog/contents" }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		description: z.string(),
		date: z.date(),
	}),
});

export const collections = {
	articles,
	projects,
};
