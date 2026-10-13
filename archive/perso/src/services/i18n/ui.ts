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
	mode: {
		label: "Mode",
		names: { pro: "Pro", explore: "Explore", creatif: "Creative", perso: "Personal" },
	},
	pro: {
		nav: { services: "Services", work: "Work", contact: "Contact" },
		hero: {
			intro:
				"I'm Nekena Rayane, a software engineer based in Antananarivo, Madagascar. I take a product from the first idea to production.",
			cta: "Start a project",
			resume: "View resume",
		},
		services: {
			kicker: "Services.",
			title: "What I can build for you.",
			labels: { tools: "Tools", testing: "Testing", process: "Process" },
			items: [
				{
					title: "Mobile apps",
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
					title: "Automation",
					description: "Scripts and integrations that take over repetitive work and connect the tools you already use.",
					tags: ["Python", "Node.js"],
					tools: [
						{ name: "Python", text: "Scripts that process data and files: cleaning, matching, reports." },
						{ name: "Node.js", text: "Integrations between web services: APIs, webhooks and scheduled jobs." },
					],
					testing: [
						{ name: "Vitest", text: "Tests each step on sample data before it touches the real one." },
					],
					steps: [
						{ title: "Understand the task", text: "I look at how the work is done today, and where the time goes." },
						{ title: "Start small", text: "One task is automated and running before the next one starts." },
						{ title: "Handover", text: "You get notes on how it runs, and on what to do the day it stops." },
					],
				},
				{
					title: "SaaS",
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
			back: "All work",
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
	mode: {
		label: "Mode",
		names: { pro: "Pro", explore: "Explore", creatif: "Créatif", perso: "Perso" },
	},
	pro: {
		nav: { services: "Services", work: "Réalisations", contact: "Contact" },
		hero: {
			intro:
				"Je suis Nekena Rayane, ingénieur logiciel basé à Antananarivo, Madagascar. J'accompagne un produit de la première idée à la mise en production.",
			cta: "Démarrer un projet",
			resume: "Voir le CV",
		},
		services: {
			kicker: "Services.",
			title: "Ce que je peux construire pour vous.",
			labels: { tools: "Outils", testing: "Tests", process: "Process" },
			items: [
				{
					title: "Applications mobiles",
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
					title: "Automatisation",
					description: "Des scripts et des intégrations qui prennent en charge le travail répétitif et relient vos outils existants.",
					tags: ["Python", "Node.js"],
					tools: [
						{ name: "Python", text: "Des scripts qui traitent données et fichiers : nettoyage, rapprochement, rapports." },
						{ name: "Node.js", text: "Des intégrations entre services web : API, webhooks et tâches planifiées." },
					],
					testing: [
						{ name: "Vitest", text: "Teste chaque étape sur des données d'exemple avant qu'elle ne touche aux vraies." },
					],
					steps: [
						{ title: "Comprendre la tâche", text: "Je regarde comment le travail se fait aujourd'hui, et où passe le temps." },
						{ title: "Commencer petit", text: "Une tâche est automatisée et tourne avant de passer à la suivante." },
						{ title: "La passation", text: "Vous recevez des notes sur son fonctionnement, et sur quoi faire le jour où ça s'arrête." },
					],
				},
				{
					title: "SaaS",
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
			back: "Toutes les réalisations",
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
