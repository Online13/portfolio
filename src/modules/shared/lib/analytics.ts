declare global {
	interface Window {
		posthog?: { capture(event: string, properties?: Record<string, unknown>): void };
	}
}

// A no-op where PostHog isn't loaded (dev, or a build without PUBLIC_POSTHOG_KEY).
export const track = (event: string, properties?: Record<string, unknown>) => window.posthog?.capture(event, properties);
