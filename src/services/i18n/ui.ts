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
	pro: {
		nav: { services: "Services", work: "Work", blog: "Blog", contact: "Contact" },
		hero: {
			greeting: "Hi, I'm",
			role: "Software Engineer / React Native Enthusiast",
		},
		services: {
			kicker: "Services.",
			title: "What I can build for you.",
			previous: "Previous service",
			next: "Next service",
			details: "Read more",
			labels: { tools: "Tools", testing: "Testing", process: "Process" },
			items: [
				{
					title: "Mobile apps",
					lead: "I",
					phrase: "turn ideas into mobile apps",
					description: "iOS and Android apps from one React Native codebase, from the first screen to the stores.",
					tags: ["React Native", "Expo", "TypeScript"],
					tools: [
						{ name: "React Native", text: "The app itself: one codebase that renders native screens on iOS and Android." },
						{ name: "Expo", text: "Builds, device features such as camera and notifications, and delivery to the stores." },
						{ name: "TypeScript", text: "Typed code: many mistakes are caught before the app ever runs." },
					],
					testing: [
						{ name: "Jest", text: "Unit tests on the app's logic and components, run at every change." },
						{ name: "agent-device", text: "An AI agent drives the app on a simulator or a real phone to check whole flows." },
					],
					steps: [
						{ title: "Scope first", text: "We agree on the screens and on what the first version must do before any code is written." },
						{ title: "A build you can test", text: "You get the app on your own phone early, and a new build each time a feature lands." },
						{ title: "To the stores", text: "I handle the App Store and Google Play submissions, review included." },
					],
				},
				{
					title: "Landing pages",
					lead: "I",
					phrase: "tell your story in landing pages",
					description: "A fast page that presents your product or company, from the design to going online.",
					tags: ["Astro", "Tailwind CSS", "TypeScript"],
					tools: [
						{ name: "Astro", text: "Generates the pages as static files, with JavaScript only where a section needs it." },
						{ name: "Tailwind CSS", text: "Styles the page from the design's own scale of spacing, type and color." },
						{ name: "TypeScript", text: "Typed components and content: a missing field breaks the build, not the page." },
					],
					testing: [
						{ name: "Vitest", text: "Tests the page's logic, such as forms and content helpers." },
					],
					steps: [
						{ title: "Content first", text: "We settle what the page says, and to whom, before it gets a design." },
						{ title: "Design, then build", text: "You approve the design before I integrate it, so the result holds no surprise." },
						{ title: "Going online", text: "Domain, hosting and analytics are set up, and the page goes live." },
					],
				},
				{
					title: "Fullstack apps",
					lead: "I",
					phrase: "connect interface and data in fullstack apps",
					description: "A web application built end to end: the interface people use, and the server and data behind it.",
					tags: ["React", "Node.js", "PostgreSQL"],
					tools: [
						{ name: "React", text: "Frontend: the interface, built from components reused across screens." },
						{ name: "TypeScript", text: "Frontend and backend: one typed language on both sides, so they agree on the data they exchange." },
						{ name: "Node.js", text: "Backend: the API, the business rules and the scheduled jobs." },
						{ name: "PostgreSQL", text: "Backend: the database, with a schema that changes through migrations." },
					],
					testing: [
						{ name: "Vitest", text: "Tests the business rules and the API on sample data, at every change." },
					],
					steps: [
						{ title: "The data first", text: "We agree on what the application stores and who can do what before the screens are drawn." },
						{ title: "Front and back together", text: "Each feature is built across both sides at once, so it can be tried as soon as it lands." },
						{ title: "In production", text: "Deployment, domain and monitoring are part of the job." },
					],
				},
				{
					title: "SaaS",
					lead: "I",
					phrase: "launch SaaS products from scratch",
					description: "A complete web product: interface, accounts, data and everything needed to put it online.",
					tags: ["React", "Next.js", "Supabase"],
					tools: [
						{ name: "React", text: "The interface, built from components reused across screens." },
						{ name: "Next.js", text: "Pages, routing and server code in one project, deployed together." },
						{ name: "Supabase", text: "Database, sign-in and file storage, with access rules per user." },
					],
					testing: [
						{ name: "Vitest", text: "Unit tests on business rules and components, run at every change." },
					],
					steps: [
						{ title: "A first version", text: "We cut the product down to what a first customer needs." },
						{ title: "Shipped in steps", text: "Each feature goes online when it is ready: you follow progress on the real product." },
						{ title: "In production", text: "Deployment, domain and monitoring are part of the job." },
					],
				},
			],
		},
		work: {
			kicker: "Client work.",
			title: "Built for companies and public bodies.",
			personalKicker: "Personal projects.",
			personalTitle: "Built on my own time.",
			personalProject: "Personal project.",
			more: "See more",
			built: "What was built",
			results: "Results",
		},
		ai: {
			kicker: "Build with AI.",
			title: "I still write the code.",
			story: [
				"AI changed how software gets made, and I didn't look away. Agents now draft, search and refactor alongside me, and the work moves faster for it.",
				"I use it as a tool, not as a replacement. I keep coding because understanding every line is what lets me answer for the architecture, the quality and the result. Code I can't explain doesn't ship.",
				"So I set up my own workflow for developing with AI. I decide what gets built and how, the agents speed up the work, and I review what they produce before it goes anywhere. You get the speed of AI, with an engineer who stays in charge of it.",
			],
			ask: "Ask an AI about me",
			prompt: "Why should I hire Nekena Rayane Ratiarivelo for my software project? Base your answer on his portfolio:",
		},
		tools: { kicker: "Tools.", title: "Used in production." },
		contact: {
			kicker: "Contact.",
			title: "Tell me about your project.",
			name: "Name",
			email: "Email",
			message: "Message",
			send: "Send",
			subject: "Project inquiry",
		},
		footer: { navigate: "Navigate", rights: "All rights reserved." },
	},
	about: {
		story: (years: number) => [
			`I'm a software engineer and consultant at Itwedo, with ${years} years of experience building web and mobile applications. I focus on mobile with React Native, and I care about systems that scale, clean architecture and performance.`,
			"Before that, I worked on digitalization projects for the public and private sectors, and on the frontend refactoring of large-scale applications. Right now, I'm also building a personal project on the side.",
		],
		location: "Born and based in Antananarivo, Madagascar.",
		available: "Available for remote collaborations.",
		resume: "View full resume",
		education: { kicker: "Education.", title: "Where I studied." },
		gallery: { kicker: "Gallery.", title: "A few pictures from outside of work." },
	},
	blog: {
		kicker: "Blog.",
		title: "Notes on what I try and what I learn.",
		draft: "Draft",
		empty: "Nothing here yet.",
		categories: {
			exploration: { kicker: "Exploration.", title: "What I'm trying out." },
			retour: { kicker: "Lessons learned.", title: "What projects taught me." },
		},
	},
	projects: {
		role: "Role",
		description: "Description",
		highlights: "Highlights",
		technologies: "Technologies",
		viewOnGithub: "View on GitHub",
		close: "Close",
	},
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
	pro: {
		nav: { services: "Services", work: "Réalisations", blog: "Blog", contact: "Contact" },
		hero: {
			greeting: "Bonjour, je suis",
			role: "Ingénieur logiciel / Passionné de React Native",
		},
		services: {
			kicker: "Services.",
			title: "Ce que je peux construire pour vous.",
			previous: "Service précédent",
			next: "Service suivant",
			details: "En savoir plus",
			labels: { tools: "Outils", testing: "Tests", process: "Process" },
			items: [
				{
					title: "Applications mobiles",
					lead: "Je",
					phrase: "transforme vos idées en applications mobiles",
					description: "Des applications iOS et Android à partir d'une seule base React Native, du premier écran aux stores.",
					tags: ["React Native", "Expo", "TypeScript"],
					tools: [
						{ name: "React Native", text: "L'application elle-même : une seule base de code, des écrans natifs sur iOS et Android." },
						{ name: "Expo", text: "Les builds, les fonctions de l'appareil comme la caméra et les notifications, et l'envoi aux stores." },
						{ name: "TypeScript", text: "Du code typé : beaucoup d'erreurs sont repérées avant même que l'application ne tourne." },
					],
					testing: [
						{ name: "Jest", text: "Tests unitaires sur la logique et les composants de l'application, lancés à chaque modification." },
						{ name: "agent-device", text: "Un agent IA pilote l'application sur un simulateur ou un vrai téléphone pour vérifier des parcours entiers." },
					],
					steps: [
						{ title: "Le périmètre d'abord", text: "On s'accorde sur les écrans et sur ce que doit faire la première version avant d'écrire du code." },
						{ title: "Une version à tester", text: "Vous avez l'application sur votre téléphone tôt, et une nouvelle version à chaque fonctionnalité livrée." },
						{ title: "Jusqu'aux stores", text: "Je m'occupe des soumissions à l'App Store et à Google Play, validation comprise." },
					],
				},
				{
					title: "Landing pages",
					lead: "Je",
					phrase: "raconte votre histoire en landing pages",
					description: "Une page rapide qui présente votre produit ou votre entreprise, du design à la mise en ligne.",
					tags: ["Astro", "Tailwind CSS", "TypeScript"],
					tools: [
						{ name: "Astro", text: "Génère les pages en fichiers statiques, avec du JavaScript seulement là où une section en a besoin." },
						{ name: "Tailwind CSS", text: "Met la page en forme à partir de l'échelle d'espacements, de typographie et de couleurs du design." },
						{ name: "TypeScript", text: "Composants et contenu typés : un champ manquant casse le build, pas la page." },
					],
					testing: [
						{ name: "Vitest", text: "Teste la logique de la page, comme les formulaires et les utilitaires de contenu." },
					],
					steps: [
						{ title: "Le contenu d'abord", text: "On fixe ce que la page dit, et à qui, avant de la dessiner." },
						{ title: "Le design, puis l'intégration", text: "Vous validez le design avant que je l'intègre : le résultat est sans surprise." },
						{ title: "La mise en ligne", text: "Domaine, hébergement et mesure d'audience sont en place, et la page est en ligne." },
					],
				},
				{
					title: "Applications fullstack",
					lead: "Je",
					phrase: "relie interface et données dans des applications fullstack",
					description: "Une application web construite de bout en bout : l'interface que les gens utilisent, puis le serveur et les données derrière.",
					tags: ["React", "Node.js", "PostgreSQL"],
					tools: [
						{ name: "React", text: "Frontend : l'interface, construite avec des composants réutilisés d'un écran à l'autre." },
						{ name: "TypeScript", text: "Frontend et backend : un seul langage typé des deux côtés, qui s'accordent ainsi sur les données échangées." },
						{ name: "Node.js", text: "Backend : l'API, les règles métier et les tâches planifiées." },
						{ name: "PostgreSQL", text: "Backend : la base de données, avec un schéma qui évolue par migrations." },
					],
					testing: [
						{ name: "Vitest", text: "Teste les règles métier et l'API sur des données d'exemple, à chaque modification." },
					],
					steps: [
						{ title: "Les données d'abord", text: "On s'accorde sur ce que l'application enregistre et sur qui peut faire quoi avant de dessiner les écrans." },
						{ title: "Front et back ensemble", text: "Chaque fonctionnalité est construite des deux côtés à la fois : elle s'essaie dès qu'elle est livrée." },
						{ title: "En production", text: "Déploiement, domaine et supervision font partie du travail." },
					],
				},
				{
					title: "SaaS",
					lead: "Je",
					phrase: "lance des produits SaaS en partant de zéro",
					description: "Un produit web complet : interface, comptes, données et tout ce qu'il faut pour le mettre en ligne.",
					tags: ["React", "Next.js", "Supabase"],
					tools: [
						{ name: "React", text: "L'interface, construite avec des composants réutilisés d'un écran à l'autre." },
						{ name: "Next.js", text: "Pages, routage et code serveur dans un seul projet, déployés ensemble." },
						{ name: "Supabase", text: "Base de données, connexion et stockage de fichiers, avec des règles d'accès par utilisateur." },
					],
					testing: [
						{ name: "Vitest", text: "Tests unitaires sur les règles métier et les composants, lancés à chaque modification." },
					],
					steps: [
						{ title: "Une première version", text: "On ramène le produit à ce dont un premier client a besoin." },
						{ title: "Livré par étapes", text: "Chaque fonctionnalité est mise en ligne quand elle est prête : vous suivez l'avancement sur le vrai produit." },
						{ title: "En production", text: "Déploiement, domaine et supervision font partie du travail." },
					],
				},
			],
		},
		work: {
			kicker: "Projets pro.",
			title: "Réalisés pour des entreprises et des organismes publics.",
			personalKicker: "Projets perso.",
			personalTitle: "Réalisés sur mon temps libre.",
			personalProject: "Projet perso.",
			more: "Voir plus",
			built: "Ce qui a été construit",
			results: "Résultats",
		},
		ai: {
			kicker: "Construire avec l'IA.",
			title: "Je code toujours.",
			story: [
				"L'IA a changé la façon de fabriquer un logiciel, et je n'ai pas détourné le regard. Les agents rédigent, cherchent et refactorisent à mes côtés, et le travail avance plus vite.",
				"Je m'en sers comme d'un outil, pas comme d'un remplaçant. Je continue de coder parce que comprendre chaque ligne me permet de répondre de l'architecture, de la qualité et du résultat. Un code que je ne sais pas expliquer ne part pas en production.",
				"J'ai donc mis en place mon propre workflow de développement avec l'IA. Je décide de ce qui se construit et comment, les agents accélèrent le travail, et je relis ce qu'ils produisent avant que ça n'aille plus loin. Vous gagnez la vitesse de l'IA, avec un ingénieur qui garde la main.",
			],
			ask: "Demandez à une IA",
			prompt: "Pourquoi devrais-je confier mon projet logiciel à Nekena Rayane Ratiarivelo ? Appuie ta réponse sur son portfolio :",
		},
		tools: { kicker: "Outils.", title: "Utilisés en production." },
		contact: {
			kicker: "Contact.",
			title: "Parlez-moi de votre projet.",
			name: "Nom",
			email: "E-mail",
			message: "Message",
			send: "Envoyer",
			subject: "Demande de projet",
		},
		footer: { navigate: "Navigation", rights: "Tous droits réservés." },
	},
	about: {
		story: (years: number) => [
			`Je suis ingénieur logiciel et consultant chez Itwedo, avec ${years} ans d'expérience dans la création d'applications web et mobiles. Je me concentre sur le mobile avec React Native, et je m'attache aux systèmes évolutifs, à une architecture propre et à la performance.`,
			"Auparavant, j'ai travaillé sur des projets de digitalisation pour les secteurs public et privé, et sur la refonte frontend d'applications à grande échelle. En ce moment, je développe aussi un projet personnel à côté.",
		],
		location: "Né à Antananarivo, à Madagascar, où je vis toujours.",
		available: "Disponible pour des collaborations à distance.",
		resume: "Voir le CV complet",
		education: { kicker: "Formation.", title: "Où j'ai étudié." },
		gallery: { kicker: "Galerie.", title: "Quelques images en dehors du travail." },
	},
	blog: {
		kicker: "Blog.",
		title: "Des notes sur ce que j'essaie et ce que j'apprends.",
		draft: "Brouillon",
		empty: "Rien ici pour l'instant.",
		categories: {
			exploration: { kicker: "Exploration.", title: "Ce que j'essaie en ce moment." },
			retour: { kicker: "Retours.", title: "Ce que les projets m'ont appris." },
		},
	},
	projects: {
		role: "Rôle",
		description: "Description",
		highlights: "Points clés",
		technologies: "Technologies",
		viewOnGithub: "Voir sur GitHub",
		close: "Fermer",
	},
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
