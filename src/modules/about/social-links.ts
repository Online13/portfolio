import type { IconType } from "../../type";

export type SocialLink = { to: string; type: IconType; label: string; handle: string };

// Shared by the about section's icon row and the contact page.
export const SOCIAL_LINKS: SocialLink[] = [
	{ to: "https://github.com/Online13/", type: "github", label: "GitHub", handle: "Online13" },
	{
		to: "https://www.linkedin.com/in/nekena-rayane-ratiarivelo-2115751b9/",
		type: "linkedin",
		label: "LinkedIn",
		handle: "Nekena Rayane Ratiarivelo",
	},
	{ to: "https://wa.me/261384615094", type: "whatsapp", label: "WhatsApp", handle: "+261 38 46 150 94" },
	{ to: "https://web.facebook.com/Online.Nk13/", type: "facebook", label: "Facebook", handle: "Online.Nk13" },
	{ to: "mailto:rratiarivelo@gmail.com", type: "email", label: "Email", handle: "rratiarivelo@gmail.com" },
];
