import type { Locale } from ".";

// Interface text. The French entries must cover every English one.
const en = {
	seo: {
		description:
			"Portfolio of Nekena Rayane Ratiarivelo, a Software Engineer based in Madagascar building web and mobile applications with React Native, React and TypeScript.",
		jobTitle: "Software Engineer",
		imageAlt: "Nekena Rayane Ratiarivelo, software engineer",
	},
	language: {
		label: "Language",
		names: { en: "English", fr: "Français" },
	},
	about: {
		subtitle: "Software engineer / React Native enthusiast",
		profileAlt: "profile picture",
		resumeLink: "View full resume",
		findMe: "Find me on :",
	},
	hoverCard: { soon: "Content coming soon." },
	projects: {
		heading: "Active projects",
		empty: "No active projects at the moment.",
		github: "More open source work on GitHub",
		detail: "Project detail",
		role: "Role",
		description: "Description",
		highlights: "Highlights",
		technologies: "Technologies",
		viewOnGithub: "View on GitHub",
		close: "Close",
	},
	blog: { heading: "Blog", empty: "Coming soon...", draft: "(in progress)" },
	footer: {
		taglineStart: "Through code, simple ideas become something",
		taglineEmphasis: "alive",
		taglineEnd: "built into software that feels clear, useful, and human.",
		credit: "© This site was designed and developed by @Rayane",
	},
	clock: { hint: "Click the time to change it", hours: "Hours", minutes: "Minutes", now: "Now" },
	resume: {
		label: "Resume",
		close: "Close",
		download: "Download PDF",
		present: "Present",
		about: "About",
		experience: "Experience",
		sideProjects: "Side projects",
		education: "Education",
		certifications: "Certifications",
		languages: "Languages",
		tools: "Tools",
		jobTypes: { "Full-time": "Full-time", Consultant: "Consultant", Freelance: "Freelance", Internship: "Internship" },
	},
	notFound: {
		title: "Not found",
		message: "This page doesn't exist.",
		hint: "The link may be broken, or the page may have moved.",
		back: "Back to the home page",
	},
};

const fr: typeof en = {
	seo: {
		description:
			"Portfolio de Nekena Rayane Ratiarivelo, ingénieur logiciel basé à Madagascar qui crée des applications web et mobiles avec React Native, React et TypeScript.",
		jobTitle: "Ingénieur logiciel",
		imageAlt: "Nekena Rayane Ratiarivelo, ingénieur logiciel",
	},
	language: {
		label: "Langue",
		names: { en: "English", fr: "Français" },
	},
	about: {
		subtitle: "Ingénieur logiciel / passionné de React Native",
		profileAlt: "photo de profil",
		resumeLink: "Voir le CV complet",
		findMe: "Retrouvez-moi sur :",
	},
	hoverCard: { soon: "Contenu bientôt disponible." },
	projects: {
		heading: "Projets en cours",
		empty: "Aucun projet en cours pour le moment.",
		github: "Plus de projets open source sur GitHub",
		detail: "Détail du projet",
		role: "Rôle",
		description: "Description",
		highlights: "Points clés",
		technologies: "Technologies",
		viewOnGithub: "Voir sur GitHub",
		close: "Fermer",
	},
	blog: { heading: "Blog", empty: "Bientôt disponible...", draft: "(en cours)" },
	footer: {
		taglineStart: "Par le code, de simples idées deviennent quelque chose de",
		taglineEmphasis: "vivant",
		taglineEnd: "façonné en logiciels clairs, utiles et humains.",
		credit: "© Ce site a été conçu et développé par @Rayane",
	},
	clock: { hint: "Cliquez sur l'heure pour la changer", hours: "Heures", minutes: "Minutes", now: "Maintenant" },
	resume: {
		label: "CV",
		close: "Fermer",
		download: "Télécharger le PDF",
		present: "Aujourd'hui",
		about: "Profil",
		experience: "Expérience",
		sideProjects: "Projets personnels",
		education: "Formation",
		certifications: "Certifications",
		languages: "Langues",
		tools: "Outils",
		jobTypes: { "Full-time": "Temps plein", Consultant: "Consultant", Freelance: "Freelance", Internship: "Stage" },
	},
	notFound: {
		title: "Page introuvable",
		message: "Cette page n'existe pas.",
		hint: "Le lien est peut-être cassé, ou la page a été déplacée.",
		back: "Retour à l'accueil",
	},
};

const ui: Record<Locale, typeof en> = { en, fr };

export const t = (locale: Locale) => ui[locale];
