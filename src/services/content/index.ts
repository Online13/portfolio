// The UI reads content only through these repositories, never from astro:content directly.
export { getArticles } from "./repositories/articles";
export { getCertifications, getEducation } from "./repositories/education";
export { getExperiences, getExperienceYears } from "./repositories/experiences";
export { getGalleryImages } from "./repositories/images";
export { getProjects } from "./repositories/projects";
export { getResume } from "./repositories/resume";
