import type { ImageMetadata } from "astro";

// Screenshots are found by folder, not listed in the data: src/assets/images/work/<slug>/, shown in file-name order.
// <slug> is a project's slug, or an experience's file name.
const files = import.meta.glob<ImageMetadata>("/src/assets/images/work/*/*.{avif,jpg,jpeg,png,webp}", {
	eager: true,
	import: "default",
});

export const getWorkImages = (slug: string) =>
	Object.keys(files)
		.filter((path) => path.split("/").at(-2) === slug)
		.sort()
		.map((path) => files[path]);

// The about page's gallery, found the same way: every picture in src/assets/images/gallery/, in file-name order.
const gallery = import.meta.glob<ImageMetadata>("/src/assets/images/gallery/*.{avif,jpg,jpeg,png,webp}", {
	eager: true,
	import: "default",
});

// A picture's file name is its description: near-home.jpg reads "near home".
export const getGalleryImages = () =>
	Object.keys(gallery)
		.sort()
		.map((path) => ({ image: gallery[path], alt: path.split("/").at(-1)!.replace(/\.\w+$/, "").replaceAll("-", " ") }));
