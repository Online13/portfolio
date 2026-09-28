import { getCollection } from "astro:content";

export const getProjects = async () => (await getCollection("projects")).map(({ data }) => data);

export const getActiveProjects = async () => (await getProjects()).filter((project) => project.active);
